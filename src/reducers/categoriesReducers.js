import { GET_CATEGORY_BY_TITLE, GET_CURRENCIES, CHANGE_CURRENCY_INDEX, GET_CATEGORY_NAMES } from "../actions/types";

const initialState = {
    category: null,
    currencyIndex: 0,
    names: [],
    currencies: []
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
        default:
            return state;
    }
}