import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Agregar, editar } from "../utils/fun";

const Formulario = ({ citas, guardarCitas, setEditCita, editCita }) => {
  const [cita, setCita] = useState({
    mascota: "",
    raza: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
    url_imagen: "",
  });
  const [error] = useState(false);
  const resetForm = () => {
    setCita({
      mascota: "",
      raza: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  //Consumiendo API
  const [selectMascotas, setMascotas] = useState([]);
  const getNewsList = async () => {
    await axios.get("https://dog.ceo/api/breeds/list/all").then((response) => {
      if (response.status === 200) {
        const entryMascota = [];
        Object.entries(response.data.message).forEach((message) => {
          /* if (message[1].length > 0) {} */
          /* message[1].forEach(raza => { */

          entryMascota.push(message[0]);

          /* }) */
        });
        setMascotas(entryMascota);
      }
    });
  };

  useEffect(() => {
    getNewsList();
  }, []);

  useEffect(() => {
    if (editCita.id) {
      setCita(editCita);
    }
  }, [editCita]);

  //Crear State de citas

  //Cuando el usuario presiona el boton
  const submitCita = async (e) => {
    e.preventDefault();
    //asignar foto a card
    await axios
      .get(`https://dog.ceo/api/breed/${cita.raza}/images/random`)
      .then((response) => {
        if (response.status === 200) {
          cita.url_imagen = response.data.message;
        }
      });

    if (editCita.id) {
      cita.id = editCita.id;
      const actualizarpaciente = citas.map((actualizar) =>
        actualizar.id === cita.id ? cita : actualizar
      );
    editar(editCita.id,actualizarpaciente)
    } else {
      try {
        Agregar({
          mascota: cita.mascota,
          raza: cita.raza,
          img: cita.url_imagen,
          propietario: cita.propietario,
          fecha: cita.fecha,
          hora: cita.hora,
          sintomas: cita.sintomas,
        });
        resetForm();
      } catch (error) {
        console.log(error);
      }
    }

    // setModoEdicion(false)
    // setError(null)
  };

  return (
    <Fragment>
      <h2>{editCita.id ? "Editar Paciente" : "Crear Paciente"}</h2>

      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={(e) => setCita({ ...cita, mascota: e.target.value })}
          value={cita.mascota}
        />
        <label>Raza Mascota</label>
        <select
          name="raza"
          className="u-full-width "
          onChange={(e) => setCita({ ...cita, raza: e.target.value })}
          value={cita.raza}
        >
          <option>Seleccione la Raza</option>
          {selectMascotas.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la mascota"
          onChange={(e) => setCita({ ...cita, propietario: e.target.value })}
          value={cita.propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={(e) => setCita({ ...cita, fecha: e.target.value })}
          value={cita.fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={(e) => setCita({ ...cita, hora: e.target.value })}
          value={cita.hora}
        />

        <label>Síntomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={(e) => setCita({ ...cita, sintomas: e.target.value })}
          value={cita.sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          {editCita.id ? "Editar Paciente" : "Agregar Paciente"}
        </button>
      </form>
    </Fragment>
  );
};

export default Formulario;
