const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mysql = require("mysql");
const cors = require("cors"); // Importa el módulo cors
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors()); // Agrega el middleware cors
app.use(express.static(__dirname + "/public"));
app.get('/favicon.ico', (req, res) => res.status(204));

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "Erick",
    password: "0986167219",
    database: "tienda",
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos: " + err.message);
    } else {
        console.log("Conexión a la base de datos establecida");
    }
});

app.get("/inicio.html", (req, res) => {
    res.sendFile(__dirname + "/public/inicio.html");
});

// Función para verificar las credenciales
function verificarCredenciales(email, contraseña, callback) {
    // Consultar la base de datos
    const query = "SELECT * FROM usuarios WHERE email = ? AND contraseña = ?";
    db.query(query, [email, contraseña], (error, resultados) => {
        if (error) {
            console.error("Error en la consulta: " + error.message);
            callback(false);
        } else {
            // Verificar si se encontraron resultados en la consulta
            if (resultados.length > 0) {
                callback(true); // Credenciales válidas
            } else {
                callback(false); // Credenciales inválidas
            }
        }
    });
}

// Definir la ruta para verificar las credenciales
app.post("/verificar-credenciales", (req, res) => {
    // Obtener las credenciales del cuerpo de la solicitud
    const { email, contraseña } = req.body;

    // Llamar a la función verificarCredenciales de manera asincrónica
    verificarCredenciales(email, contraseña, (autenticado) => {
        if (autenticado) {
            res.status(200).json({ mensaje: "Inicio de sesión exitoso" });
        } else {
            res.status(401).json({ mensaje: "Credenciales incorrectas" });
        }
    });
});

// Definir la ruta para registrar usuarios
app.post("/registrar-usuario", (req, res) => {
    // Obtener los datos de registro del cuerpo de la solicitud
    const { nombre, email, contraseña } = req.body;

    // Realizar la inserción en la base de datos
    const query = "INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)";
    db.query(query, [nombre, email, contraseña], (error) => {
        if (error) {
            console.error("Error al registrar el usuario: " + error.message);
            res.status(500).json({ mensaje: "Error al registrar el usuario" });
        } else {
            console.log("Usuario registrado con éxito");
            res.status(201).json({ mensaje: "Registro exitoso" });
        }
    });
});

// Definir la ruta para solicitudes de olvido de contraseña
app.post("/olvido-contraseña", (req, res) => {
    // Obtener el correo electrónico del cuerpo de la solicitud
    const { email } = req.body;
    // Lógica para generar un token de restablecimiento de contraseña

    // Respondemos con un mensaje de éxito
    res.status(200).json({ mensaje: "Correo electrónico de restablecimiento de contraseña enviado" });
});


app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
