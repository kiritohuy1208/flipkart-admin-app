import { productConstant } from "../actions/constants"

const initialState  = {
    products: [],
   error: null,
   loading: false
}
var productReducer = (state = initialState , action) => {

    switch(action.type){
        
        // ------------- Get all product--------------
        case productConstant.GET_ALL_PRODUCTS_REQUEST:{
            state={
                ...state,
                loading: true
            }
            break
        }
        case productConstant.GET_ALL_PRODUCTS_SUCCESS:{
            state={
                ...state,
               products: action.payload.products,
               loading: false
            }
            break
        }
        // case productConstant.GET_ALL_PRODUCTS_FAILURE:{
        //     state={
        //         ...state,
        //        error: action.payload.error,
        //        loading: false
        //     }
        //     break
        // }

        default:
             return state;
    }
    return state
   
}
export default productReducer