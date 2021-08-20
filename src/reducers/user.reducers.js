import { userConstants } from "../actions/constants"

const initialState  = {
   message: '',
   error: null,
   loading: false
}
var userReducers = (state = initialState , action) => {

    switch(action.type){
        
        // ------------- Register--------------
        case userConstants.REGISTER_REQUEST:{
            state={
                ...state,
                loading: true
            }
            break
        }
        case userConstants.REGISTER_SUCCESS:{
            state={
                ...state,
               message: action.payload.message,
               loading: false
            }
            break
        }
        case userConstants.REGISTER_FAILURE:{
            state={
                ...state,
               error: action.payload.error,
               loading: false
            }
            break
        }

        default:
             return state;
    }
    return state
   
}
export default userReducers