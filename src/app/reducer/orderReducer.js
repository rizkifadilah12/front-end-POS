const intialstate = {
    items: [],
    orderData: null,
    openItems: {},
    invoice: []
};

const orderReducer = (state = intialstate, action) => {
    switch (action.type) {
        case 'GET_ORDER':
            return {
                ...state,
                items: [...action.payload]
            };
        case 'GET_NEW_ORDER':
            return {
                ...state,
                orderData: action.payload
            }
        case 'CREATE_ORDER':
            return {
                ...state,
                items: [action.payload]
            }
        case 'OPEN_ITEMS':
            return {
                ...state,
                openItems: {
                    ...state.openItems,
                    [action.payload]: !state.openItems[action.payload]
                }
            }
        case 'GET_INVOICE':
            return {
                items: [action.payload]
            }
        
        default:
            return state
    }
}

export default orderReducer;
