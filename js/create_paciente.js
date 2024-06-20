window.addEventListener('load',function(){
    const agregarPaciente = document.querySelector("#agregarPacienteModal");
    const agregarNombrePaciente= document.querySelector("#nombrePacienteAgregar");
    const agregarApellidoPaciente = document.querySelector("#apellidoPacienteAgregar");
    const agregarDniPaciente = document.querySelector("#dniPacienteAgregar");
    const agregarFechaDeIngresoPaciente = document.querySelector("#fechaDeIngresoPacienteAgregar");
    const agregarCallePaciente = document.querySelector("#callePacienteAgregar");
    const agregarNumeroPaciente = document.querySelector("#numeroPacienteAgregar");
    const agregarLocalidadPaciente = document.querySelector("#localidadPacienteAgregar");
    const agregarProvinciaPaciente = document.querySelector("#provinciaPacienteAgregar");

    agregarNombrePaciente.addEventListener ("input", e => validarTexto(e));
    agregarApellidoPaciente.addEventListener("input", e => validarTexto(e));
    agregarDniPaciente.addEventListener("input", e => validarDni(e));
    agregarFechaDeIngresoPaciente.addEventListener("input" , e=> validarFechaDeNacimiento(e));
    agregarCallePaciente.addEventListener("input", e => validarCalle (e));
    agregarNumeroPaciente.addEventListener("input" , e => validarNumeroDeCalle(e));
    agregarLocalidadPaciente.addEventListener("input", e => validarTexto(e));
    agregarProvinciaPaciente.addEventListener("input", e => validarTexto(e));

    const urlApi = "http://localhost:8080";

    agregarPaciente.addEventListener("submit", function(event){
        event.preventDefault();

        const payload = {
            apellido: agregarApellidoPaciente.value,
            nombre: agregarNombrePaciente.value,
            dni: agregarDniPaciente.value,
            fechaIngreso: agregarFechaDeIngresoPaciente.value,
            domicilio:{
                calle: agregarCallePaciente.value,
                numero:agregarNumeroPaciente.value,
                localidad: agregarLocalidadPaciente.value,
                provincia:agregarProvinciaPaciente.value
            }
        }
        const settings = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        }
        agregarPacienteRealizado(settings);
        agregarPaciente.reset();
    })
    const agregarPacienteRealizado = (settings) => {
        fetch(`${urlApi}/paciente`,settings)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            Swal.fire({
                icon: "success",
                title: "¡Exito!",
                text: `Paciente agregado`,
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
                text: "No se pudo agregar el paciente",
                confirmButtonColor: "#456584",
                confirmButtonBorderColor: "#3e5975",
                textColor: "#000",
                background: "#eaeef4",
            });
        })
    }
})