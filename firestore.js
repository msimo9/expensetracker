import { db } from "./firebase";
import uuid from 'uuid';
import { collection, addDoc, doc, setDoc, getDocs, query, deleteDoc } from "firebase/firestore";

import { useDispatch } from 'react-redux'
import { updateTotalSum } from "./redux/reducer";

export const addDataToFirestore = async (itemID, value, value_price, type, date, month, uid) => {
  console.log("firestore uid: ", uid)
  const data= {
      id: itemID,
      name: value,
      price: value_price,
      type: type,
      date: date,
      month: month,
    };

    const docID = String(itemID);

    await setDoc(doc(db, uid, docID), data);
}


export const getDataFromFirestore = async uid => {
  let arr = [];
  let totalSum = 0;
  const querySnapshot = await getDocs(collection(db, uid));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arr.push(doc.data());
    totalSum += parseInt(doc.data().price);
    console.log(arr[arr.length-1]);
  });
  for(let i=0; i<arr.length; i++){
    console.log("firestore print of arr items ",arr[i])
  }
  //console.log("price total of all items in fetched data: ", totalSum)
  //updateSum(totalSum);
  return arr;
}

export const deleteDataFromFirestore = async (itemID, uid) => {
  
  const docID = String(itemID);
  const collectionID = String(uid)
  console.log("console log firestore js : ", docID, "    ", collectionID)
  await deleteDoc(doc(db, docID, collectionID));

}