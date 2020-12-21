import instance from "../../axios/axios";
import { PRODUCT_CREATE_FAILURE, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAILURE, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAILURE, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAILURE, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "./productTypes";

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {data} = await instance.get(`/api/products`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data} = await instance.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteProduct = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })
        const { userLogin: {userInfo} } = getState()

        const config ={
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await instance.delete(`/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })
        
        
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createProduct = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })
        const { userLogin: {userInfo} } = getState()

        const config ={
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} =await instance.post(`/api/products/`, {}, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
        
        
        
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}