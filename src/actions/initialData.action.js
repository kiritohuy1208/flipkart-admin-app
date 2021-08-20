import axiosIntance from "../helpers/axios";
import {
  categoryConstants,
  orderConstants,
  productConstant,
} from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    // dispatch({
    //     type:initialDataConstants.GET_ALL_INITIAL_DATA_REQUEST
    // })
    const res = await axiosIntance.post("/initialData");
    if (res.status === 200) {
      const { categories, products, orders } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: {
          categories,
        },
      });
      dispatch({
        type: productConstant.GET_ALL_PRODUCTS_SUCCESS,
        payload: {
          products,
        },
      });
      dispatch({
        type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
    } else {
      console.log(res.data.error);
    }
    // else{
    //     dispatch({
    //         type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
    //         payload:{
    //             error :res.data.error
    //         }
    //     })
    //     dispatch({
    //         type: productConstant.GET_ALL_PRODUCTS_FAILURE,
    //         payload:{
    //             error :res.data.error
    //         }
    //     })
    // }
  };
};
