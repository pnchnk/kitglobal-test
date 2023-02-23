export const GET_PRODUCTS = "GET_PRODUCTS";
export const SET_PRODUCTS = "SET_PRODUCTS";


export const getProducts = () => ({
    type: GET_PRODUCTS
})

export const setProducts = (products: any) => ({
    type: SET_PRODUCTS,
    products
})

const initialState = {
    products: []
}

export default (state = initialState, action: any) => {
    switch (action.type) {
        case SET_PRODUCTS:
            const {products} = action;
            return {...state, products}
        default:
            return state;
    }
}