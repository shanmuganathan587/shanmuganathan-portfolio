CREATE DATABASE IF NOT EXISTS shan_portfolio;

USE shan_portfolio;

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

USE shan_portfolio;

SHOW TABLES;

DESCRIBE contacts;


USE shan_portfolio;

SELECT * FROM contacts
ORDER BY id DESC;

USE shan_portfolio;

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(150) NOT NULL,
    description TEXT,
    technologies VARCHAR(255)
);

INSERT INTO projects
(project_name, description, technologies)
VALUES
(
    'AI Path Finder',
    'An AI-based pathfinding application using the A* algorithm.',
    'Python, A* Algorithm'
),
(
    'Student Course Registration App',
    'An application for managing student course registrations.',
    'Java, MySQL'
),
(
    'Travel Agency Booking System',
    'A web application for managing travel bookings.',
    'PHP, MySQL'
);