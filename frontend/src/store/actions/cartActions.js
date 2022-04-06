import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const addToCart = (id,qty) => async(dispatch,getState) => {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({
        type:actionTypes.CART_ADD_ITEM,
        payload:{
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id) => async(dispatch,getState) => {
    dispatch({
        type:actionTypes.CART_REMOVE_ITEM,
        payload:id
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}

export const shipping = (data) => async(dispatch) => {
    dispatch({
        type:actionTypes.CART_SHIPPING_SAVE_ADDRESS,
        payload:data
    })
    localStorage.setItem('shippingAddress',JSON.stringify(data));
}

export const savePaymentMethod = (paymentMethod) => async(dispatch) => {
    dispatch({
        type:actionTypes.CART_SAVE_PAYMENT_METHOD,
        payload:paymentMethod
    })
    localStorage.setItem('paymentMethod',JSON.stringify(paymentMethod));
}