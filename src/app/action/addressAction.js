import { deliveryFee } from "../../components/addressData/deliveryFee";
import axiosDriver from "../../utils/axios"

export const getAddress = () => async(dispatch) => {
    try {
        const response = await axiosDriver.get('http://localhost:3000/api/delivery-address');
        dispatch({type: 'GET_ADDRESS', payload: response.data});

    } catch (error) {
        console.log('Error get address: ',error);
    }
}

export const selectAddress = (address) => {
    return { type: 'SELECTED_ADDRESS', payload: address}
};

export const calculateShippingFee = (destinationKecamatan) => (dispatch) => {
    const origin = 'Loa Janan Ilir';
    const key = `${origin}-${destinationKecamatan}`;

    if (deliveryFee.hasOwnProperty(key)) {
        const fee = deliveryFee[key];
        dispatch({ type: 'CALCULATE_DELIVERY_FEE', payload: fee });
        console.log(fee);
    } else {
        console.log('gagal');
    }
};

