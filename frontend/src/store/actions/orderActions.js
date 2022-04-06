import * as actionTypes from './actionTypes';
import axios from 'axios';


export const createOrder = (order) => async(dispatch,getState) => {
    try{
        dispatch({
            type:actionTypes.ORDER_CREATE_REQUEST
        })

        const {userLogin:{userInfo}} =  getState();
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log(order)
        const { data } = await axios.post('/api/orders',order,config);
        dispatch({
            type:actionTypes.ORDER_CREATE_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:actionTypes.ORDER_CREATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}




export const getOrderDetails = (id) => async(dispatch,getState) => {
    try{
        dispatch({
            type:actionTypes.ORDER_DETAILS_REQUEST
        })

        const {userLogin:{userInfo}} =  getState();
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${id}`,config);
        dispatch({
            type:actionTypes.ORDER_DETAILS_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:actionTypes.ORDER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const payOrder = (orderId, paymentResult) => async(dispatch,getState) => {
    try{
        dispatch({
            type:actionTypes.ORDER_PAY_REQUEST
        })

        const {userLogin:{userInfo}} =  getState();
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${orderId}/pay`,paymentResult,config);
        dispatch({
            type:actionTypes.ORDER_PAY_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:actionTypes.ORDER_PAY_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listMyOrders = () => async(dispatch,getState) => {
    try{
        dispatch({
            type:actionTypes.ORDER_MYORDERS_REQUEST
        })

        const {userLogin:{userInfo}} =  getState();
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/myorders`,config);
        console.log(data);
        dispatch({
            type:actionTypes.ORDER_MYORDERS_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:actionTypes.ORDER_MYORDERS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getOrderList = () => async(dispatch,getState) => {
    try{
        dispatch({
            type:actionTypes.ORDER_LIST_REQUEST
        })

        const {userLogin:{userInfo}} =  getState();
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders`,config);
        console.log(data);
        dispatch({
            type:actionTypes.ORDER_LIST_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:actionTypes.ORDER_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.ORDER_DELIVER_REQUEST,
      })  
      const {userLogin: { userInfo }} = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.put(`/api/orders/${order._id}/deliver`,{},config)
  
      dispatch({
        type: actionTypes.ORDER_DELIVER_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: actionTypes.ORDER_DELIVER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }