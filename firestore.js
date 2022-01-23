import { db } from "./firebase";
import uuid from 'uuid';
import { collection, addDoc } from "firebase/firestore"; 

export const addDataToFirestore = async (value, value_price) => {
const docRef = await addDoc(collection(db, "expenses"), {
    name: value,
    price: value_price,
  });
}