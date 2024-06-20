window.addEventListener('load', function () {
    const formularioAgregarTurno = document.querySelector("#form-registro-turno");
    const fechaDeTurnoAgregar = document.querySelector("#fechaDeTurnoAgregar");
    const selectPaciente = document.querySelector("#turnoPacienteAgregar");
    const selectOdontologo = document.querySelector("#turnoOdontologoAgregar");

    fechaDeTurnoAgregar.addEventListener("input", e => validarFechaDeTurno(e));

    fechaDeTurnoAgregar.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${fechaDeTurnoAgregar.name}`, e));

    const urlApi = "https://carefree-truth-production.up.railway.app";

    formularioAgregarTurno.addEventListener('submit', function(event){
        event.preventDefault();

        const payload = {
            paciente_id: selectPaciente.value,
            odontologo_id: selectOdontologo.value,
            fecha: "2024-06-12"
        }

        const settings = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        }

        realizarAgregarTurno(settings);
        formularioAgregarTurno.reset();
    });

    const realizarAgregarTurno = (settings) => {
        fetch(`${urlApi}/turno`,settings)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            Swal.fire({
                icon: "success",
                title: "¡Exito!",
                text: `Turno agregado`,
                showConfirmButton: false,
                textColor: "#000",
                background: "#eaeef4",
                timer: 1500
            });
            setTimeout(() => {
                location.replace("../pages/turnos.html");
            }, 1500);
        })
        .catch((error) => {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo agregar el turno",
                confirmButtonColor: "#456584",
                confirmButtonBorderColor: "#3e5975",
                textColor: "#000",
                background: "#eaeef4",
            });
        })
    }
});