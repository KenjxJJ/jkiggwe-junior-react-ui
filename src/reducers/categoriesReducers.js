import { GET_CATEGORY_BY_TITLE, ADD_TO_MY_BAG, VIEW_MY_BAG, GET_CURRENCIES, REMOVE_ITEM_FROM_BAG, GET_PRODUCT_BY_ID, CHANGE_CURRENCY_INDEX, GET_CATEGORY_NAMES } from "../actions/types";

const initialState = {
    category: null,
    currencyIndex: 0,
    names: [],
    currencies: [],
    product: [],
    myBag: []
}

export default function categoriesReducers(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORY_NAMES:
            return {
                ...state, names: action.payload
            }
        case GET_CATEGORY_BY_TITLE:
            return {
                ...state,
                category: [action.payload]
            }
        case CHANGE_CURRENCY_INDEX:
            return {
                ...state,
                currencyIndex: action.payload
            }
        case GET_CURRENCIES:
            return {
                ...state,
                currencies: [action.payload]
            }
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                product: action.payload
            }
        case ADD_TO_MY_BAG:
            return {
                ...state,
                myBag: [...state.myBag, action.payload]
            }
        case REMOVE_ITEM_FROM_BAG:
            // Remove item from the list
            const remainingItems = state.myBag.filter((bagItem) => (bagItem !== action.payload));

            return {
                ...state,
                myBag: [...remainingItems]
            }
        case VIEW_MY_BAG:
            return {
                ...state,
                myBag: [...state.myBag]
            }
        default:
            return state;
    }
}