const initialState = {
    cart: [],
    subTotalPrice: 0
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
        case 'GET_CART':
        case 'INC_QUANTITY':
        case 'DEC_QUANTITY':
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: action.payload, 
                subTotalPrice: subTotal(action.payload)
            };
        default:
            return state;
    }
};

const subTotal = (cartItems) => {
    if (!Array.isArray(cartItems)) {
        console.error('cartItems is not an array:', cartItems);
        return 0;
    }

    return cartItems.reduce((total, item) => total + item.product.price * item.qty, 0);
};
export default cartReducer;
