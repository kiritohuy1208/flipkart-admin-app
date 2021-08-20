import { orderConstants } from "../actions/constants";

const initialState = {
  orders: [],
};
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderConstants.GET_CUSTOMER_ORDER_SUCCESS: {
      state = {
        ...state,
        orders: action.payload.orders,
      };
      break;
      //--------Get orders-------------
    }
    default:
      return state;
  }
  return state;
};
export default orderReducer;
