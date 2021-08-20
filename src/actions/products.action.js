import { productConstant } from "./constants";
import axios from "../helpers/axios";

const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstant.GET_ALL_PRODUCTS_REQUEST });
      const res = await axios.get("product/getProducts");
      if (res.status === 200) {
        dispatch({
          type: productConstant.GET_ALL_PRODUCTS_SUCCESS,
          payload: {
            products: res.data.products,
          },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstant.GET_ALL_PRODUCTS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProduct = (form) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstant.ADD_NEW_PRODUCT_REQUEST,
      });

      const res = await axios.post("product/create", form);
      if (res.status === 201) {
        dispatch({
          type: productConstant.ADD_NEW_PRODUCT_SUCCESS,
          payload: {
            product: res.data.product,
          },
        });
        dispatch(getProducts());
      } else {
        dispatch({
          type: productConstant.ADD_NEW_PRODUCT_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteProductById = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstant.DELETE_PRODUCT_BY_ID_REQUEST });

      const res = await axios.delete("/product/deleteProductById", {
        data: payload,
      });
      if (res.status === 202) {
        dispatch({ type: productConstant.DELETE_PRODUCT_BY_ID_SUCCESS });
        dispatch(getProducts());
      } else {
        dispatch({
          type: productConstant.DELETE_PRODUCT_BY_ID_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
