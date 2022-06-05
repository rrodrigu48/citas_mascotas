import React from "react";
import PropTypes from "prop-types";

const Cita = ({ cita, eliminarCita }) => {
  return (
    <div className="cita">
      <img alt="perfil" src={cita.img}></img>
      <p>
        Mascota: <span>{cita.mascotaCliente}</span>
      </p>
      <p>
        Raza: <span>{cita.razaCliente}</span>
      </p>
      <p>
        Propietario: <span>{cita.propietarioCliente}</span>
      </p>
      <p>
        Fecha: <span>{cita.fechaCliente}</span>
      </p>
      <p>
        Hora: <span>{cita.horaCliente}</span>
      </p>
      <p>
        Sintomas: <span>{cita.sintomasCliente}</span>
      </p>

      <button
        className="button eliminar u-full-width"
        onClick={() => eliminarCita(cita.id)}
      >
        Eliminar
      </button>
    </div>
  );
  console.log(Cita.mascota);
};

Cita.propTypes = {
  cita: PropTypes.object.isRequired,
  eliminarCita: PropTypes.func.isRequired,
};

export default Cita;
