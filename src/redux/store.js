import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productListReducer } from './Product/productReducers';
import { cartReducer } from './Cart/cartReducers';
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './User/userReducers';

const rootReducer = combineReducers({productList: productListReducer, productDetails: productDetailsReducer, cart: cartReducer, userLogin: userLoginReducer, userRegister: userRegisterReducer, userDetails: userDetailsReducer, userUpdateProfile: userUpdateProfileReducer  });
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const initialState = {
    cart: {cartItems : cartItemsFromStorage},
    userLogin: {userInfo : userInfoFromStorage}
}

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)) )

export default store