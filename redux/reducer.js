import { addDataToFirestore } from '../firestore';

export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const SET_FILTER = 'SET_FILTER'
export const SAVE_LOGIN = 'SAVE_LOGIN'

const initialState = {
    itemList: [],
    sumByMonth: [0,0,0,0,0,0,0,0,0,0,0,500,600],
    total: 0,
    filter: "all",
    uid: null,
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
            addDataToFirestore(name, price, type, date, month, uid);
            let tempArr = state.sumByMonth;
            tempArr[currentMonth] += parseInt(action.payload.price)
            return{
                ...state,
                itemList: state.itemList.concat({
                    id: Math.random(),
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


            
            newTotal = state.total - parseInt(action.payload.price);
            return{
                ...state,
                itemList: state.itemList.filter(item => item.id !== action.payload.id),
                total: newTotal
            }
        case SAVE_LOGIN:
            console.log("UID in SAVE_LOGIN", action.payload.uid)
            return{
                ...state,
                uid: action.payload.uid,
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
        default:
            return state
    }
}

export default rootReducer