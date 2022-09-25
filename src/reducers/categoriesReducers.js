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
            // Checking if an item already exists in store
            let isExistingItems = state.myBag.filter((item) => item.name === action.payload.name);
            let found = false;

            function sortFn(a, b) {
                let x = a._id.toLowerCase();
                let y = b._id.toLowerCase();
                if (x < y) { return -1; }
                if (x > y) { return 1; }
                return 0;
            }

            if (isExistingItems.length > 0) {
                isExistingItems.forEach((singleItem, index) => {
                    // Check if the existing item has new or same attributes(for stacking purposes)
                    // Obtain array of attributes from the incoming object
                    let { attribSelected } = singleItem;                
                    if (JSON.stringify(attribSelected.sort(sortFn)) === JSON.stringify(action.payload.attribSelected.sort(sortFn))) {
                        isExistingItems[index].quantity += 1;
                        found = true;
                    }
                })
            }

            // Add first item, or non-existent new item or similar item with new attributes
            if (state.myBag.length === 0 || !isExistingItems || found === false) {
                return {
                    ...state,
                    myBag: [...state.myBag, action.payload]
                }
            }
            else {
                const otherItems = state.myBag.filter((item) => (item.name !== action.payload.name));
                return {
                    ...state,
                    myBag: [...otherItems, ...isExistingItems]
                }
            };

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