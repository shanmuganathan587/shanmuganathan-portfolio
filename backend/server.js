// Load environment variables
require("dotenv").config();

// Import packages
const express = require("express");
const cors = require("cors");
const pool = require("./db");

// Create Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Shanmuganathan's Portfolio Backend is running!");
});

// About route
app.get("/about", (req, res) => {
    res.send("Welcome to my portfolio About API!");
});

// Get projects from MySQL database
app.get("/projects", async (req, res) => {
    try {
        const [projects] = await pool.execute(
            "SELECT * FROM projects ORDER BY id ASC"
        );

        res.json({
            success: true,
            projects: projects
        });

    } catch (error) {
        console.error("Projects database error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to retrieve projects."
        });
    }
});
// Contact route
app.get("/contact", (req, res) => {
    res.send("Contact API is working!");
});

// POST API - Save contact form messages
app.post("/api/contact", async (req, res) => {

    const { name, email, message } = req.body;

    // Validate input
    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof message !== "string" ||
        !name.trim() ||
        !email.trim() ||
        !message.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all fields."
        });
    }

    try {

        // SQL query
        const sql = `
            INSERT INTO contacts (name, email, message)
            VALUES (?, ?, ?)
        `;

        // Execute query
        const [result] = await pool.execute(sql, [
            name.trim(),
            email.trim(),
            message.trim()
        ]);

        // Send success response
        res.status(201).json({
            success: true,
            message: "Your message has been saved successfully!",
            contactId: result.insertId
        });

    } catch (error) {

        console.error("Database error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to save your message."
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});