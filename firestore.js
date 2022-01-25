import { db } from "./firebase";
import uuid from 'uuid';
import { collection, addDoc, doc, setDoc, getDocs, query } from "firebase/firestore";

import { useSelector } from "react-redux";

export const addDataToFirestore = async (itemID, value, value_price, type, date, month, uid) => {
  console.log("firestore uid: ", uid)
  await addDoc(collection(db, uid), {
      id: itemID,
      name: value,
      price: value_price,
      type: type,
      date: date,
      month: month,
    });
}


export const getDataFromFirestore = async uid => {
  let arr = [];

  const querySnapshot = await getDocs(collection(db, uid));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arr.push(doc.data());
    console.log(arr[arr.length-1]);
  });
  for(let i=0; i<arr.length; i++){
    console.log("firestore print of arr items ",arr[i])
  }

  return arr;
}