import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Agregar, leerTodo } from "../utils/fun";

const Formulario = ({ crearCita }) => {
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
  const [citas, actualizarCita] = useState([{
    mascota: "",
    raza: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  }]);
  const [error, actualizarError] = useState(false);

  //Funcion que se ejecuta cada que el usuario escriba en un input
  const actualizarState = (e) => {
    actualizarCita({
      ...citas,
      [e.target.name]: e.target.value,
    });
  };
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
  const [cliente, setCliente] = useState({
    mascota: "",
    raza: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
    url_imagen: ""
  });

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
        mascotaCliente: cliente.mascota,
        razaCliente: cliente.raza,
        img:cliente.url_imagen,
        propietarioCliente: cliente.propietario,
        fechaCliente: cliente.fecha,
        horaCliente: cliente.hora,
        sintomasCliente: cliente.sintomas,
      });
   
      
    } catch (error) {
      console.log(error);
    }

    // setModoEdicion(false)
    // setError(null)
    

  

    //asignar foto a card
    await axios
      .get(`https://dog.ceo/api/breed/${cliente.raza}/images/random`)
      .then((response) => {
        if (response.status === 200) {
          cliente.url_imagen = response.data.message;
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
          onChange={(e) => setCliente({ ...cliente, mascota: e.target.value })}
          value={cliente.mascota}
        />
        <label>Raza Mascota</label>
        <select
          name="raza"
          className="u-full-width "
          onChange={(e) => setCliente({ ...cliente, raza: e.target.value })}
          value={cliente.raza}
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
            setCliente({ ...cliente, propietario: e.target.value })
          }
          value={cliente.propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={(e) => setCliente({ ...cliente, fecha: e.target.value })}
          value={cliente.fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={(e) => setCliente({ ...cliente, hora: e.target.value })}
          value={cliente.hora}
        />

        <label>Síntomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={(e) => setCliente({ ...cliente, sintomas: e.target.value })}
          value={cliente.sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar cita
        </button>
      </form>
    </Fragment>
  );
};

export default Formulario;
