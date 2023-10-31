document.getElementById("registro-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const contraseña = document.getElementById("contraseña").value;

    // Crear un objeto con los datos del registro
    const datosRegistro = {
        nombre: nombre,
        email: email,
        contraseña: contraseña
    };

    try {
        // Enviar los datos del registro al servidor
        const response = await fetch("./registrar-usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosRegistro)
        });

        if (response.status === 201) {
            // Si el registro es exitoso, redirigir o mostrar un mensaje de éxito
            const data = await response.json();
            console.log(data.mensaje); // Mensaje del servidor
            // Puedes redirigir al usuario a la página de inicio de sesión u otras acciones necesarias aquí.
        } else {
            console.log("Error desconocido");
            // Puedes manejar otros códigos de estado de respuesta según sea necesario.
        }
    } catch (error) {
        console.error("Error al enviar los datos de registro al servidor: " + error.message);
    }
});
