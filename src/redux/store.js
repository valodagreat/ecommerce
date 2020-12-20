import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productListReducer } from './Product/productReducers';
import { cartReducer } from './Cart/cartReducers';
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './User/userReducers';
import { createOrderReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from './Order/orderReducers';

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer, userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: createOrderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {};

const initialState = {
    cart: {
        cartItems : cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage},
        userLogin: {userInfo : userInfoFromStorage},
    
}

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)) )

export default store