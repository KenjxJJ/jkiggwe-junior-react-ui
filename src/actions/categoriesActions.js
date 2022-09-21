import { GET_CATEGORY_BY_TITLE, VIEW_MY_BAG, GET_PRODUCT_BY_ID, ADD_TO_MY_BAG, REMOVE_ITEM_FROM_BAG, GET_CURRENCIES, CHANGE_CURRENCY_INDEX, LOAD_CATEGORY, GET_CATEGORY_NAMES } from './types'
import { getCategories } from "../queries/CategoriesQuery";
import { getCategory } from "../queries/CategoryQuery";
import { getCurrencies } from "../queries/CurrencySwitcherQuery";
import { getProduct } from "../queries/ProductQuery";


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
            return {
                title:
                    name
            };
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

// Fetch product by id
export const getProductById = (id) => {
    //    obtain product  
    return async (dispatch) => {
        const { product } = await getProduct(id);
        dispatch({
            type: GET_PRODUCT_BY_ID,
            payload: product
        })
    }
}

// Add to Cart(Bag)
export const addToMyBag = (_item) => ({
    type: ADD_TO_MY_BAG,
    payload: _item
}
)
// View Cart(Bag)
export const viewMyBag = () => ({
    type: VIEW_MY_BAG,
})

// Remove item from Cart(Bag)
export const removeCartItemFromBag = (_item) => ({
    type: REMOVE_ITEM_FROM_BAG,
    payload: _item
})