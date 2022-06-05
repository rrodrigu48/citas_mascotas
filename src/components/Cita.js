import React from "react";
import PropTypes from "prop-types";

const Cita = ({ cita, eliminarCita,setEditCita }) => {
   
  return (
    <div className="cita">
      <img alt="perfil" src={cita.img}></img>
      <p>
        Mascota: <span>{cita.mascota}</span>
      </p>
      <p>
        Raza: <span>{cita.raza}</span>
      </p>
      <p>
        Propietario: <span>{cita.propietario}</span>
      </p>
      <p>
        Fecha: <span>{cita.fecha}</span>
      </p>
      <p>
        Hora: <span>{cita.hora}</span>
      </p>
      <p>
        Sintomas: <span>{cita.sintomas}</span>
      </p>
      <button
        className="button eliminar u-full-width"
        onClick={() => setEditCita(cita)}
      >
        Editar
      </button>

      <button
        className="button eliminar u-full-width"
        onClick={() => eliminarCita(cita.id)}
      >
        Eliminar
      </button>
      
    </div>
  );

};

Cita.propTypes = {
  cita: PropTypes.object.isRequired,
  eliminarCita: PropTypes.func.isRequired,
};

export default Cita;
