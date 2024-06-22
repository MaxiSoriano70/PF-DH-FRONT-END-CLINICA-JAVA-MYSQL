const capturarDatosTurnoUpdate =(id, idPaciente, idOdontologo)=>{
    const formularioEditarTurno = document.querySelector(`#form-editar-turno${id}`);
    const fechaDeTurnoPacienteAgregar = document.querySelector(`#fechaDeTurnoPacienteAgregar${id}`);

    const urlApi = "https://carefree-truth-production.up.railway.app";

    fechaDeTurnoPacienteAgregar.addEventListener("input", e => validarFechaDeTurno(e));

    fechaDeTurnoPacienteAgregar.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${fechaDeTurnoAgregar.name}`, e));

    console.log(id, idPaciente, idOdontologo, fechaDeTurnoPacienteAgregar.value);
    formularioEditarTurno.addEventListener('submit', function(event){
        event.preventDefault();
        const payload ={
            id: id,
            paciente_id: idPaciente,
            odontologo_id: idOdontologo,
            fecha: fechaDeTurnoPacienteAgregar.value
        }
        const settings = {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        }

        realizarUpdateTurno(settings, id);
        formularioEditarTurno.reset();
    });

    const realizarUpdateTurno = (settings, idTurno) => {
        fetch(`${urlApi}/turno/${idTurno}`, settings)
        .then((response) => {
            if (!response.ok) {
                throw new Error('No se pudo actualizar el turno');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: "Cambios guardados",
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
                text: "No se pudo guardar los cambios",
                confirmButtonColor: "#456584",
                confirmButtonBorderColor: "#3e5975",
                textColor: "#000",
                background: "#eaeef4",
            });
        });
    };
    }
    const eliminarTurno = (id) => {
        const urlApi = "https://carefree-truth-production.up.railway.app";

        Swal.fire({
            title: "Eliminar Paciente",
            text: "¿Estás seguro de que deseas eliminar este turno?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#456584",
            confirmButtonBorderColor: "#3e5975",
            cancelButtonColor: "#dc3545",
            textColor: "#000",
            background: "#eaeef4",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                const settings = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                };
                fetch(`${urlApi}/turno/${id}`, settings)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No se pudo eliminar el turno');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    Swal.fire({
                        title: "¡Eliminado con éxito!",
                        text: "El turno ha sido eliminado.",
                        icon: "success",
                        confirmButtonColor: "#456584",
                        confirmButtonBorderColor: "#3e5975",
                        textColor: "#000",
                        background: "#eaeef4",
                    }).then(() => {
                        location.reload();
                    });
                })
                .catch(error => {
                    console.error('Error al eliminar:', error);
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo eliminar el turno.",
                        icon: "error",
                        confirmButtonColor: "#456584",
                        confirmButtonBorderColor: "#3e5975",
                        textColor: "#000",
                        background: "#eaeef4",
                    });
                });
            }
        });
    };