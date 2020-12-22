import instance from "../../axios/axios"
import { ORDER_CREATE_FAILURE, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAILURE, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAILURE, ORDER_LIST_MY_FAILURE, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAILURE, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "./orderTypes"

export const createOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        const { userLogin: {userInfo} } = getState()

        const config ={
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        

        const {data} = await instance.post(`/api/orders`, order,  config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
        
        
        
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getOrderDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
        const { userLogin: {userInfo} } = getState()

        const config ={
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        

        const {data} = await instance.get(`/api/orders/${id}`,  config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
        
        
        
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const payOrder = (id, paymentResult) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })
        const { userLogin: {userInfo} } = getState()

        const config ={
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        

        const {data} = await instance.put(`/api/orders/${id}/pay`, paymentResult,  config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
        
        
        
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listMyOrders = (id, paymentResult) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })
        const { userLogin: {userInfo} } = getState()

        const config ={
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        

        const {data} = await instance.get(`/api/orders/myorders`,  config)

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })
        
        
        
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listOrders = (id, paymentResult) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })
        const { userLogin: {userInfo} } = getState()

        const config ={
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        

        const {data} = await instance.get(`/api/orders`,  config)

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })
        
        
        
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}