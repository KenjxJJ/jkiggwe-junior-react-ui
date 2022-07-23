import { combineReducers } from "redux";
import categoriesReducers from "./categoriesReducers";


const allReducers = combineReducers({
    category: categoriesReducers,
})

export default allReducers