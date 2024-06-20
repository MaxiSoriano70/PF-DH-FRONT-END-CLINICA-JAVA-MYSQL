const capturarDatosPacienteUpdate =(id, idDomicilio)=>{
const formulario = document.querySelector(`#form-editar-paciente-${id}`);
const dniUpdate = document.querySelector(`#dniPacienteEditar${id}`);
const nombrePacienteUpdate = document.querySelector(`#NombrePacienteEditar${id}`);
const apellidoPacienteUpdate = document.querySelector(`#apellidoPacienteEditar${id}`);
const fechaPacienteEditar = document.querySelector(`#fechaPacienteEditar${id}`);
const callePacienteEditar= document.querySelector(`#callePacienteEditar${id}`);
const numeroPacienteEditar = document.querySelector(`#numeroPacienteEditar${id}`);
const localidadPacienteEditar = document.querySelector(`#localidadPacienteEditar${id}`);
const provinciaPacienteEditar = document.querySelector(`#provinciaPacienteEditar${id}`);
const urlApi = "https://carefree-truth-production.up.railway.app";

dniUpdate.addEventListener("input", e => validarDni(e));
nombrePacienteUpdate.addEventListener("input", e => validarTexto(e));
apellidoPacienteUpdate.addEventListener("input", e => validarTexto(e));
fechaPacienteEditar.addEventListener("input", e => validarFechaDeNacimiento (e));
callePacienteEditar.addEventListener("input", e=> validarCalle(e));
numeroPacienteEditar.addEventListener("input", e=> validarNumeroDeCalle(e));
localidadPacienteEditar.addEventListener("input", e=> validarTexto(e));
provinciaPacienteEditar.addEventListener("input", e=> validarTexto(e));

dniUpdate.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${dniUpdate.name}`,e));
nombrePacienteUpdate.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${nombrePacienteUpdate.name}`,e));
apellidoPacienteUpdate.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${apellidoPacienteUpdate.name}`,e));
fechaPacienteEditar.addEventListener("blur", e =>isEmpty (`Se requiere que ingrese su ${fechaPacienteEditar.name}`,e));
callePacienteEditar.addEventListener("blur", e=> isEmpty(`Se requiere que ingrese su ${callePacienteEditar.name}`,e));
numeroPacienteEditar.addEventListener("blur", e=> isEmpty(`Se requiere que ingrese su ${numeroPacienteEditar.name}`,e));
localidadPacienteEditar.addEventListener("blur", e=> isEmpty(`Se requiere que ingrese su ${localidadPacienteEditar.name}`,e));
provinciaPacienteEditar.addEventListener("blur", e=> isEmpty(`Se requiere que ingrese su ${provinciaPacienteEditar.name}`,e));


formulario.addEventListener('submit', function(event){
    event.preventDefault();
    const payload ={
        id: id,
        apellido: apellidoPacienteUpdate.value,
        nombre : nombrePacienteUpdate.value,
        dni : dniUpdate.value,
        fechaIngreso: fechaPacienteEditar.value,
        domicilio: {
            id: idDomicilio,
            calle: callePacienteEditar.value,
            numero: numeroPacienteEditar.value,
            localidad: localidadPacienteEditar.value,
            provincia: provinciaPacienteEditar.value
        }
    }
    const settings = {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    }

    realizarUpdatePaciente(settings);
    formulario.reset();
});

const realizarUpdatePaciente = (settings) => {
    fetch(`${urlApi}/paciente`, settings)
    .then((response) => {
        if (!response.ok) {
            throw new Error('No se pudo actualizar el paciente');
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
            location.replace("../pages/pacientes.html");
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
const eliminarPaciente = (id) => {
    const urlApi = "https://carefree-truth-production.up.railway.app";

    Swal.fire({
        title: "Eliminar Paciente",
        text: "¿Estás seguro de que deseas eliminar este Paciente?",
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

            fetch(`${urlApi}/paciente/${id}`, settings)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo eliminar el paciente');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                Swal.fire({
                    title: "¡Eliminado con éxito!",
                    text: "El paciente ha sido eliminado.",
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
                    text: "No se pudo eliminar el paciente.",
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