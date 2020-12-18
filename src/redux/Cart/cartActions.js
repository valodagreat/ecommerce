import instance from "../../axios/axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./cartTypes"


export const addToCart = (id,qty) => async (dispatch, getState) => {
    const {data} = await instance.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            price: data.price,
            image: data.image,
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id)=> async (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}