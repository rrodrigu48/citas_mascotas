import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
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
