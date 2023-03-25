import {
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const shippingReducer = (state = { shippingAddress: {} }, action) => {
  switch (action.type) {
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload }; //payload is the form data

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
