import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

export const Agregar = async (data) => {
  try {
    const dataRef = await addDoc(collection(db, "mascotas"), data);
  } catch (error) {
    console.log(error);
  }
};

export const leerTodo = async () => {
  const data = [];
  const querySnapshot = await getDocs(collection(db, "mascotas"));
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

export const eliminar = async (id, guardarCitas, citas) => {
  try {
    const newdata = await deleteDoc(doc(db, "mascotas", id));
    //await db.collection(db, "mascotas").doc(id).delete();
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  } catch (error) {
    console.log(error);
  }
};

export const editar = async (id, data) => {
  try {
    const dataRef = doc(db, "mascotas", id);
   

    // Set the "capital" field of the city 'DC'
    await updateDoc(dataRef, data);
  } catch (error) {
    console.log(error);
  }
};
