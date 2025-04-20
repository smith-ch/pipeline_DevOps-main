-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

-- Crear tabla Users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
