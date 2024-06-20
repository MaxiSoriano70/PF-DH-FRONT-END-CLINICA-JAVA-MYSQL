window.addEventListener('load', function(){
const tablaPacientes = document.querySelector("#cuerpo-tabla-pacientes");

const get_pacientes =()=>{
    fetch("http://localhost:8080/paciente")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        tablaPacientes.innerHTML = "";
        data.forEach((paciente, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${paciente.id}</td>
            <td>${paciente.nombre}</td>
            <td>${paciente.apellido}</td>
            <td>${paciente.dni}</td>
            <td>${paciente.fechaIngreso}</td>
            <td>${paciente.domicilio.calle} ${paciente.domicilio.numero} ${paciente.domicilio.localidad} ${paciente.domicilio.provincia}</td>
            <td>
                <div class="d-flex align-items-center justify-content-center">
                    <button type="button" class="btn btn-primary mx-1 fw-bold" data-bs-toggle="modal" data-bs-target="#editarPacienteModal${paciente.id}" onclick="capturarDatosPacienteUpdate(${paciente.id}, ${paciente.domicilio.id})"><i class="fa-solid fa-pen-to-square"></i> Editar
                    </button>
                    <!-- Editar Paciente-->
                    <section class="modal fade" id="editarPacienteModal${paciente.id}" tabindex="-1" aria-labelledby="editarPacienteModal${paciente.id}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header bg-color-principal">
                                    <h5 class="modal-title text-white" id="editarPacienteModal${paciente.id}">Editar Paciente</h5>
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body bg-color-fondo">
                                    <form id="form-editar-paciente-${paciente.id}">
                                        <div class="mb-3">
                                            <label for="NombrePacienteEditar${paciente.id}" class="form-label fw-bolder">Nombre </label>
                                            <input type="text" class="form-control bg-input" id="NombrePacienteEditar${paciente.id}" placeholder="Ingrese su nombre" min="100" value="${paciente.nombre}" name="Nombre" required>
                                            <div id="nombrePacienteEditarError${paciente.id}">
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="apellidopacienteEditar${paciente.id}" class="form-label fw-bolder">Apellido</label>
                                            <input type="text" class="form-control bg-input" id="apellidoPacienteEditar${paciente.id}" placeholder="Ingrese su apellido"
                                            minlength="3" maxlength="25" value="${paciente.apellido}" name="Apellido" required>
                                            <div id="nombreOdontologoEditarError${paciente.id}">
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="dniPacienteEditar${paciente.id}" class="form-label fw-bolder">Dni</label>
                                            <input type="text" class="form-control bg-input" id="dniPacienteEditar${paciente.id}" placeholder="Ingrese su DNI"
                                            minlength="3" maxlength="25" value="${paciente.dni}" name="Dni" required>
                                            <div id="dniPacienteEditarError${paciente.id}">
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="fechaDeIngresoPacienteEditar${paciente.id}" class="form-label fw-bolder">Fecha de Ingreso</label>
                                            <input type="date" class="form-control bg-input" id="fechaDeIngresoPacienteEditar${paciente.id}" placeholder="Ingrese su Fecha de Ingreso" min="1900-01-01" value="${paciente.fechaIngreso}" name="FechaIngreso" required>
                                            <div id="fechaDeIngresoPacienteEditarError${paciente.id}"></div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="callePacienteEditar${paciente.id}" class="form-label fw-bolder">Calle</label>
                                            <input type="text" class="form-control bg-input" id="callePacienteEditar${paciente.id}" placeholder="Ingrese su calle"
                                            minlength="3" maxlength="25" value="${paciente.domicilio.calle}" name="Calle" required>
                                            <div id="callePacienteEditarError${paciente.id}">
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="numeroPacienteEditar${paciente.id}" class="form-label fw-bolder">Numero</label>
                                            <input type="text" class="form-control bg-input" id="numeroPacienteEditar${paciente.id}" placeholder="Ingrese su numero de casa/departamento"
                                            minlength="3" maxlength="25" value="${paciente.domicilio.numero}" name="Numero" required>
                                            <div id="numeroPacienteEditarError${paciente.id}">
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="localidadPacienteEditar${paciente.id}" class="form-label fw-bolder">Localidad</label>
                                            <input type="text" class="form-control bg-input" id="localidadPacienteEditar${paciente.id}" placeholder="Ingrese su localidad"
                                            minlength="3" maxlength="25" value="${paciente.domicilio.localidad}" name="Localidad" required>
                                            <div id="localidadPacienteEditarError${paciente.id}">
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="provinciaPacienteEditar${paciente.id}" class="form-label fw-bolder">Provincia</label>
                                            <input type="text" class="form-control bg-input" id="provinciaPacienteEditar${paciente.id}" placeholder="Ingrese su provincia"
                                            minlength="3" maxlength="25" value="${paciente.domicilio.provincia}" name="Provincia" required>
                                            <div id="provinciaPacienteEditarError${paciente.id}">
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-center">
                                            <button type="submit" id="botonGuardarCambiosPaciente${paciente.id}" class="btn btn-personalized-2 mx-1 fw-bold" aria-label="Guardar cambios">Guardar cambios</button>
                                            <button type="button" id="botonGuardarEliminarPaciente${paciente.id}" class="btn btn-personalized-1 mx-1 fw-bold" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                    <button type="button" class="btn btn-danger fw-bold mx-1" onclick="eliminarPaciente(${paciente.id})"><i class="fa-solid fa-trash"></i> Eliminar
                    </button>
                </div>
            </td>
            `;
        tablaPacientes.appendChild(row);
        });
    })
    .catch((error) => {
        console.error("Error fetching data: ",error)
    });
}
get_pacientes();
});