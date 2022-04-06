import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productCreateReviewReducer } from './reducers/productListReducer';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileReducer, userListReducer, deleteUserReducer, updateUserReducer } from './reducers/userReducers';
import { myOrdersReducer, orderCreateReducer,orderDeliverReducer,orderDetailsReducer,orderListReducer,orderPayReducer } from './reducers/orderReducers';

const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    myOrders:myOrdersReducer,
    userList:userListReducer,
    userDelete:deleteUserReducer,
    userUpdate:updateUserReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer,
    productReview:productCreateReviewReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[];
const userInfoFromStorage = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):null;
const paymentMethodFromStorage = localStorage.getItem('paymentMethod')?JSON.parse(localStorage.getItem('paymentMethod')):null;

const initialState = {
    cart:{cartItems:cartItemsFromStorage,
          shippingAddress:shippingAddressFromStorage,
          paymentMethod:paymentMethodFromStorage
         },
    userLogin:{userInfo:userInfoFromStorage}
};
const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;