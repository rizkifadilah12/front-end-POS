import axiosDriver from "../../utils/axios";

export const addToCart = (product) => async (dispatch, getState) => {
    try {
        const state = getState();
        let cartItems = [...state.cart.cart];
        const findCartItem = cartItems.find(item => item.product._id === product._id);
        if(findCartItem){
            findCartItem.qty += 1
        } else {
            cartItems.push({
                qty: 1,
                product
            })
        }
        const response = await axiosDriver.put('http://localhost:3000/api/carts', { items: cartItems });
        dispatch({ type: 'ADD_TO_CART', payload: response.data });
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
};

export const getCart = () => async (dispatch) => {
    try {
        const response = await axiosDriver.get('http://localhost:3000/api/carts');
        dispatch({ type: 'GET_CART', payload: response.data });
    } catch (error) {
        console.log('Error get Cart: ',error)
    }
}



export const incQuantity = (productId) => async(dispatch, getState) => {
    try {
        const state = getState();
        let cartItems = [...state.cart.cart];
        const updateCart = cartItems.map(item => {
            if(item.product._id === productId) {
                item.qty += 1;
            }
            return item;
        });
        const response = await axiosDriver.put('http://localhost:3000/api/carts', { items: updateCart });
        dispatch({ type: 'INC_QUANTITY', payload: response.data });
    } catch (error) {
        console.log('Error get Cart: ',error)
    }
}

export const decQuantity = (productId) => async(dispatch, getState) => {
    try {
        const state = getState();
        let cartItems = [...state.cart.cart];
        const updateCart = cartItems.map(item => {
            if(item.product._id === productId) {
                item.qty -= 1;
            }
            return item;
        });
        const response = await axiosDriver.put('http://localhost:3000/api/carts', { items: updateCart });
        dispatch({ type: 'INC_QUANTITY', payload: response.data });
    } catch (error) {
        console.log('Error get Cart: ',error)
    }
}

export const deleteProductCart = (productId) => async(dispatch, getState) => {
    try {
        const state = getState();
        let cartItems = [...state.cart.cart];
        const updateCart = cartItems.filter(item => item.product._id !== productId);
        const response = await axiosDriver.put('http://localhost:3000/api/carts', { items: updateCart });
        dispatch({ type: 'REMOVE_FROM_CART', payload: response.data });
    } catch (error) {
        console.log('Error remove from cart: ', error);
    }
}