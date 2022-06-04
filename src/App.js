import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";
import Footer from "./components/Footer";
import PropTypes from "prop-types";
import { leerTodo } from "./utils/fun";

function App() {
  //Arreglo de las citas
  const [citas, guardarCitas] = useState([]);

useEffect (()=>{
  (async () => {  
    const data = await leerTodo();
    console.log(data);
    guardarCitas(data)
  })();
},[])

  //Mensaje condicional
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  //Obtener la fecha actualizada.
  const fecha = new Date().getFullYear();
  console.log(citas);
  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            <div className="scrollView">
              {citas.map((cita) => (
                <Cita key={cita.id} cita={cita} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer fecha={fecha} />
    </Fragment>
  );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};

export default App;
