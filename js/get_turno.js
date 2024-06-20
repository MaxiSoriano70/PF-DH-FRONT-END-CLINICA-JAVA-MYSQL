window.addEventListener('load', function(){
    const tablaTurnos = document.querySelector("#cuerpo-tabla-turnos");
    const selectPaciente = document.querySelector(".selectPaciente");
    const selectOdontologo = document.querySelector(".selectOdontologo");

    const get_turnos =()=>{
        fetch("https://carefree-truth-production.up.railway.app/turno")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            tablaTurnos.innerHTML = "";
            data.forEach((turno, index) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                <td>${turno.id}</td>
                <td>${turno.paciente.nombre} ${turno.paciente.apellido}</td>
                <td>${turno.odontologo.nombre} ${turno.odontologo.apellido}</td>
                <td>${turno.fecha}</td>
                <td>
                    <div class="d-flex align-items-center justify-content-center">
                        <button type="button" class="btn btn-primary mx-1 fw-bold" data-bs-toggle="modal" data-bs-target="#editarTurnoModal${turno.id}" onclick="capturarDatosPacienteUpdate(${turno.id}, ${turno.paciente.id}, ${turno.odontologo.id})""><i class="fa-solid fa-pen-to-square"></i> Editar</button>
                        <!-- Modal Editar Turno-->
                        <section class="modal fade" id="editarTurnoModal${turno.id}" tabindex="-1" aria-labelledby="editarTurnoModal${turno.id}" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header bg-color-principal">
                                        <h5 class="modal-title text-white" id="editarTurnoModal${turno.id}">Editar Turno</h5>
                                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body bg-color-fondo">
                                        <form id="form-editar-turno${turno.id}">
                                            <div class="mb-3">
                                                <label for="fechaDeTurnoPacienteAgregar${turno.id}" class="form-label fw-bolder">Fecha de Turno</label>
                                                <input type="date" class="form-control bg-input" id="fechaDeTurnoPacienteAgregar${turno.id}" placeholder="Ingrese su Fecha de turno" min="1900-01-01" value="${turno.fecha}" name="Fecha de turno" required>
                                                <div id="fechaDeTurnoPacienteAgregarError"></div>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-center">
                                                <button type="submit" id="botonAgregarTurno" class="btn btn-personalized-2 mx-1 fw-bold" aria-label="Registrarse">Guardar cambios</button>
                                                <button type="button" id="botonCancelarUpdate${turno.id}" class="btn btn-personalized-1 mx-1 fw-bold" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <button type="button" class="btn btn-danger fw-bold mx-1" onclick="eliminarTurno(${turno.id})"><i class="fa-solid fa-trash"></i> Eliminar</button>
                    </div>
                </td>
                `;
            tablaTurnos.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error fetching data: ",error)
        });
    }
    get_turnos();

    const get_pacientes_turnos =()=>{
        fetch("http://localhost:8080/paciente")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.forEach((paciente, index) => {
                const option = document.createElement("option");
                option.value = paciente.id;
                option.textContent = `${paciente.nombre} ${paciente.apellido}`;
                selectPaciente.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error fetching data: ",error)
        });
    }
    get_pacientes_turnos();

    const get_odontologos_turnos = () =>{
        fetch("http://localhost:8080/odontologo")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.forEach((odontologo, index) => {
                const option = document.createElement("option");
                option.value = odontologo.id;
                option.textContent = `${odontologo.nombre} ${odontologo.apellido}`;
                selectOdontologo.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error fetching data: ",error)
        });
    }
    get_odontologos_turnos();
});