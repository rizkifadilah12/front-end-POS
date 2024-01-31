import axiosDriver from "../../utils/axios"

export const getOrder = () => async(dispatch) => {
    try {
        const response = await axiosDriver.get('http://localhost:3000/api/orders');
        dispatch({
            type: 'GET_ORDER',
            payload: response.data.data
        });
    } catch (error) {
        console.log('Error get Order: ', error)
    }
}

export const getNewOrder = (orderId) => async(dispatch) => {
    try {
        const response = await axiosDriver.get('http://localhost:3000/api/order');
        const order = response.data.find(order => order._id === orderId);
        dispatch({
            type: 'GET_NEW_ORDER',
            payload: order
        })
    } catch (error) {
        console.log('Error get new order: ', error);
    }
}

export const createOrder = (orderData) => async(dispatch) => {
    try {
        const response = await axiosDriver.post('http://localhost:3000/api/orders', orderData);
        dispatch({
            type: 'CREATE_ORDER',
            payload: response.data
        })
        return response.data;
    } catch (error) {
        console.log('Error post order: ', error)
    }
}

export const toggleOpenItems = (orderId) => {
    return {
        type: 'OPEN_ITEMS',
        payload: orderId
    };
};

export const getInvoiceOrder = (orderId) => async(dispatch) => {

    try {
        const response = await axiosDriver.get(`http://localhost:3000/api/invoice/${orderId}`);
        dispatch({
            type: 'GET_INVOICE',
            payload: response.data
        })
        console.log("data =>",response.data);
        return response.data
    } catch (error) {
        console.log("Error get Invoice: ",error)
    }
}