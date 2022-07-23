import { GET_CATEGORY_BY_TITLE, LOAD_CATEGORY, GET_CATEGORY_NAMES } from './types'
import { getCategories } from "../queries/CategoriesQuery";
import { getCategory } from "../queries/CategoryQuery";

export const getCategoryByTitle = (categoryTitle) => {
    return async (dispatch) => {
        const { category } = await getCategory({ categoryTitle });
        dispatch({
            type: GET_CATEGORY_BY_TITLE,
            payload: category
        });
        loadCategoryDetails();
    };
};

export const getCategoryNames = () => {
    return async (dispatch) => {
        const { categories } = await getCategories();
        const categoriesListNames = await categories.map(({ name }) => {
            return { title: name };
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
