import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export const Agregar =async(data)=>{
    try {
        const dataRef = await addDoc(collection(db, "mascotas"), data );
        console.log(dataRef)
        
    } catch (error) {
        console.log(error)
    }
}