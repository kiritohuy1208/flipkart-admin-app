import { authConstants } from "../actions/constants"

const initialState  = {
   token: null,
   user:{
       firstName: '',
       lastName: '',
       email: '',
       picture: '',
   },
   authenticate: false,// to verify user has logged in or yet
   authenticating: false ,
   error: null,
   loading: false,
   message: ''
}
var authReducers = (state = initialState , action) => {

    switch(action.type){
        
        //---------------Login-----------------
        case authConstants.LOGIN_REQUEST:{
                state = {
                    ...state,
                    authenticating: true
                }
               break  
        }
        case authConstants.LOGIN_SUCCESS:{
                state = {
                    ...state,
                    user: action.payload.user,
                    token: action.payload.token,
                    authenticate: true,
                    authenticating: false
                }
               break
        }
        // case authConstants.LOGIN_FAILURE:{
        //     state = {
        //         ...state,
        //         authenticating: false ,
        //         authenticate: true,
        //         error: action.payload.error
        //     }
        //     break
        // }

        // ------------Logout-------------
        case authConstants.LOGOUT_REQUEST:{
            state={
                ...state,
                loading: true
            }
            break
        }
        case authConstants.LOGOUT_SUCCESS:{
            state={
                ...initialState,
             
            }
            break
        }
        case authConstants.LOGOUT_FAILURE:{
            state={
                ...state,
                loading: false,
                error: action.payload.error
            }
            break
        }
        default:
             return state;
    }
    return state
   
}
export default authReducers