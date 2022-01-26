import { addDataToFirestore } from '../firestore';

import { deleteDataFromFirestore } from '../firestore';

export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const SET_FILTER = 'SET_FILTER'
export const SAVE_LOGIN = 'SAVE_LOGIN'
export const POPULATE_ITEMS = 'POPULATE_ITEMS'
export const UPDATE_SUM_FETCHED = 'UPDATE_SUM_FETCHED'

const initialState = {
    itemList: [],
    sumByMonth: [0,0,0,0,0,0,0,0,0,0,0,500,600],
    total: 0,
    filter: "all",
    uid: null,
    executed: false,
}

export const addItem = (item, price, type, date, month, uid) => ({
    type: ADD_ITEM,
    payload: {item, price, type, date, month, uid}
})

export const removeItem = (id, price) => ({
    type: REMOVE_ITEM,
    payload: {id, price}
})

export const setFilter = (filterType) => ({
    type: SET_FILTER,
    payload: {filterType}
})
export const saveLogin = (uid) => ({
    type: SAVE_LOGIN,
    payload: {uid}
})

export const populateStateItems = (arr) => ({
    type: POPULATE_ITEMS,
    payload: {arr},
})

export const updateTotalSum = (totalSum) => ({
    type: UPDATE_SUM_FETCHED,
    payload: {totalSum},
})


const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_ITEM:
            let newTotal = state.total + parseInt(action.payload.price);
            let currentMonth = parseInt(action.payload.month);
            let name = action.payload.item;
            let price = action.payload.price;
            let type = action.payload.type;
            let date = action.payload.date;
            let month = action.payload.month;
            let uid = state.uid;
            let itemID = Math.random()
            addDataToFirestore(itemID, name, price, type, date, month, uid);
            let tempArr = state.sumByMonth;
            tempArr[currentMonth] += parseInt(action.payload.price)
            return{
                ...state,
                itemList: state.itemList.concat({
                    id: itemID,
                    name: action.payload.item,
                    price: action.payload.price,
                    type: action.payload.type,
                    date: action.payload.date,
                    month: action.payload.month,
                    uid: action.payload.uid,
                }).reverse(),
                total: newTotal,
                sumByMonth: tempArr,
            }
        case REMOVE_ITEM:
            //add logic for removing sum from SumByMonth


            deleteDataFromFirestore(state.uid, action.payload.id)

            newTotal = state.total - parseInt(action.payload.price);
            return{
                ...state,
                itemList: state.itemList.filter(item => item.id !== action.payload.id),
                total: newTotal
            }
        case SAVE_LOGIN:
            return{
                ...state,
                uid: action.payload.uid,
            }
        case POPULATE_ITEMS:
            if(!state.executed){
                console.log("POPULATE ITEMS IN REDUCER REACHED")
                console.log("dela? ",action.payload.arr)
                const fetchedArr = action.payload.arr;
                console.log("fetched array length: ",fetchedArr.length)
                let stateArr = state.itemList;
                let concatenatedArr = state.itemList.concat(action.payload.arr);
                console.log("concatenated array length: ",concatenatedArr.length)
                return{
                    ...state,
                    itemList: concatenatedArr,
                    executed: true,
                }
            }else{
                return{
                    ...state,
                }
            }
        case SET_FILTER:
            let currentFilter = action.payload.filterType;
            if (state.filter == action.payload.filterType){
                return {
                    ...state,
                    filter: "all"
                }
            }else {
                return{
                    ...state,
                    filter: action.payload.filterType,
                }
            }

        case UPDATE_SUM_FETCHED:
            let totalSum = parseInt(action.payload.totalSum);
            return{
                ...state,
                total: totalSum,
            }
        default:
            return state
    }
}

export default rootReducer