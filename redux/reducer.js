import { addDataToFirestore } from '../firestore';

export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const SET_FILTER = 'SET_FILTER'

const initialState = {
    itemList: [],
    sumByMonth: [0,0,0,0,0,0,0,0,0,0,0,500,600],
    total: 0,
    filter: "all",
}

export const addItem = (item, price, type, date, month) => ({
    type: ADD_ITEM,
    payload: {item, price, type, date, month}
})

export const removeItem = (id, price) => ({
    type: REMOVE_ITEM,
    payload: {id, price}
})

export const setFilter = (filterType) => ({
    type: SET_FILTER,
    payload: {filterType}
})


const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_ITEM:
            let newTotal = state.total + parseInt(action.payload.price);
            let currentMonth = parseInt(action.payload.month);
            let name = action.payload.item;
            let price = action.payload.price;
            addDataToFirestore(name, price);
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