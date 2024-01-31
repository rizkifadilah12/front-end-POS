const initialState = {
    address: [],
    selectedAddress: null,
    deliveryFee: 0
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ADDRESS':
            return {
                ...state,
                address: action.payload,
            };
        case 'SELECTED_ADDRESS':
            return {
                ...state,
                selectedAddress: action.payload
            }
        case 'CALCULATE_DELIVERY_FEE':
            return {
                ...state,
                deliveryFee: action.payload
            };
        default:
            return state;
    }
}

export default addressReducer;