import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Agregar, leerTodo } from "../utils/fun";

const Formulario = ({citas,guardarCitas,setEditCita,editCita }) => {
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
  //Crear State de citas
  
    const [cita, setCita] = useState({
    mascota: "",
    raza: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
    url_imagen: ""
  });
  const [error, actualizarError] = useState(false);
  const resetForm = ()=>{
    setCita({ 
    mascota: "",
    raza: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  })
  }

  //Funcion que se ejecuta cada que el usuario escriba en un input
  
  //////
 /*  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = app.firestore();
        //const data = await db.collection('frutas').get()
        const data = await db.collection("mascotas").get();
        const array = data.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setMascotas(array);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }); */


  //Extraer los valores
  //const { mascota, raza, propietario, fecha, hora, sintomas,url_imagen } = citas;

  //Cuando el usuario presiona el boton
  const submitCita = async (e) => {
    e.preventDefault();

    //Validar
  /*   if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      raza.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      console.log("subri un error");
    } */
    try {
      Agregar({
        mascotaCliente: cita.mascota,
        razaCliente: cita.raza,
        img:cita.url_imagen,
        propietarioCliente: cita.propietario,
        fechaCliente: cita.fecha,
        horaCliente: cita.hora,
        sintomasCliente: cita.sintomas,
      });
      resetForm()
      
    } catch (error) {
      console.log(error);
    }

    // setModoEdicion(false)
    // setError(null)
    

  

    //asignar foto a card
    await axios
      .get(`https://dog.ceo/api/breed/${cita.raza}/images/random`)
      .then((response) => {
        if (response.status === 200) {
          cita.url_imagen = response.data.message;
        }
      }); 

   

  
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>

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
          onChange={(e) =>
            setCita({ ...cita, propietario: e.target.value })
          }
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
          Agregar cita
        </button>
      </form>
    </Fragment>
  );
};

export default Formulario;
