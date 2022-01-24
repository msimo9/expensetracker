import { db } from "./firebase";
import uuid from 'uuid';
import { collection, addDoc, doc, setDoc, getDocs, query } from "firebase/firestore";

import { useSelector } from "react-redux";

export const addDataToFirestore = async (value, value_price, type, date, month, uid) => {
  console.log("firestore uid: ", uid)
  await addDoc(collection(db, uid), {
      name: value,
      price: value_price,
      type: type,
      date: date,
      month: month,
    });
}

/*
export const getDataFromFirestore = async (uid) => {
  const q = query(collection(db, uid));
  let arr = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arr.push(doc.data());
    console.log(doc.data())
  });
}*/