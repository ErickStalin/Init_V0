document.getElementById("olvido-contraseña-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Obtener el valor del correo electrónico
    const email = document.getElementById("email").value;

    // Crear un objeto con el correo electrónico
    const datosOlvidoContraseña = {
        email: email
    };

    try {
        // Enviar los datos de olvido de contraseña al servidor
        const response = await fetch("/olvido-contraseña", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosOlvidoContraseña)
        });

        if (response.status === 200) {
            // Si la solicitud se procesa con éxito, mostrar un mensaje al usuario
            const data = await response.json();
            console.log(data.mensaje); // Mensaje del servidor
            // Puedes mostrar un mensaje al usuario informándole que se ha enviado un correo electrónico con instrucciones para restablecer la contraseña.
        } else {
            console.log("Error desconocido");
            // Puedes manejar otros códigos de estado de respuesta según sea necesario.
        }
    } catch (error) {
        console.error("Error al enviar la solicitud de olvido de contraseña al servidor: " + error.message);
    }
});
