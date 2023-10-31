CREATE DATABASE tienda;
USE tienda;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

INSERT INTO usuarios (nombre, email, contraseña) VALUES 
('Erick', 'erick@gmail.com', '12345');

select * from usuarios;