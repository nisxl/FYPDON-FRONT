import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { shippingReducer } from "./reducers/cartReducers";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducer";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducer";
import { configureStore } from "@reduxjs/toolkit";
import { orderCreateReducer } from "./reducers/orderReducers";
//redux ma state banxa
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  shippingDetails: shippingReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initailState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: {
    shippingAddress: shippingAddressFromStorage,
  },
};

const middleware = [thunk];

const store = configureStore({
  reducer,
  preloadedState: initailState,
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [applyMiddleware(...middleware)],
});

export default store;
