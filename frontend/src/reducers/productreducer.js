import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constant/productconstant";

export const productreducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        product: [],
        loading: true,
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload.message,
        productscount: action.payload.count,
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,

        error: null,
      };
    default:
      return state;
  }
};
