import { GET_CATEGORY_BY_TITLE, GET_CATEGORY_NAMES } from "../actions/types";

const initialState = {
    category : null,
    names: []
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
        default:
            return state;
    }
}