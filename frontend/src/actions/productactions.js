import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constant/productconstant";
import axios from "axios";
export const getProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const { data } = await axios.get("http://localhost:5000/api/v1/product");
    console.log(data)
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: e.response.data.message,
    });
  }
};

//clearing the erros
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
