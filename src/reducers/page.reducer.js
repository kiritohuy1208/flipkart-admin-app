import { pageConstants } from "../actions/constants"
const initialState = {
    loading: false,
    error: null,
    page: {}
}
const pageReducer = (state= initialState, action ) =>{
    switch(action.type){
        case pageConstants.ADD_NEW_PAGE_REQUEST:{
            state={ 
                ...state,
                loading: true
             }
             break
         }
        case pageConstants.ADD_NEW_PAGE_SUCCESS:{
           state={ 
               ...state,
               loading: false,
               page: action.payload.page
            }
            break
        }
        case pageConstants.ADD_NEW_PAGE_FAILURE:{
            state={ 
                ...state,
                loading: false,
                error: action.payload.error
             }
             break
         }
        default: return state
    }
    return state
}
export default pageReducer