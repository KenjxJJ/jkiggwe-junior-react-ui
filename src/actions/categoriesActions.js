import { GET_CATEGORY_BY_TITLE, GET_CURRENCIES, CHANGE_CURRENCY_INDEX, LOAD_CATEGORY, GET_CATEGORY_NAMES } from './types'
import { getCategories } from "../queries/CategoriesQuery";
import { getCategory } from "../queries/CategoryQuery";
import { getCurrencies } from "../queries/CurrencySwitcherQuery";


export const getCategoryByTitle = (categoryTitle) => {
    return async (dispatch) => {
        const title = { title: categoryTitle };
        let { category } = await getCategory(title);
        dispatch({
            type: GET_CATEGORY_BY_TITLE,
            payload: category
        });
    };
};

export const getCategoryNames = () => {
    return async (dispatch) => {
        const { categories } = await getCategories();
        const categoriesListNames = await categories.map(({ name }) => {
            return { title:
                 name };
        });
        
        dispatch({
            type: GET_CATEGORY_NAMES, payload: categoriesListNames
        });
    }
}

export const loadCategoryDetails = () =>
({
    type: LOAD_CATEGORY
})


// Change currency 
export const changeCurrency = (_label) => {
    return {
        type: CHANGE_CURRENCY_INDEX,
        payload: _label
    }
}
// Fetch currencies
export const getAllCurrencies = () => {
    //    obtain currencies list  
    return async (dispatch) => {
        const { currencies } = await getCurrencies();
        
        dispatch({
            type: GET_CURRENCIES,
            payload: currencies
        })
    }
}