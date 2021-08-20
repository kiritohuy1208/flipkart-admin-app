import {userConstants } from "./constants"
import axios from '../helpers/axios'

export const register = (user) =>{
    return async (dispatch) =>{

        dispatch({
            type:userConstants.REGISTER_REQUEST,
        })
        //call api api/admin/signup
        const res = await axios.post(`/admin/signup`,{
            ...user
        })

        if( res.status === 201 ){
            const {message} = res.data
      
            //dispatch aciont login_success: save token and user in state redux
            dispatch({
                type:userConstants.REGISTER_SUCCESS,
                payload:{
                   message
                }
            })

        }else{
            if(res.status === 400){
                dispatch({
                    type:userConstants.REGISTER_FAILURE,
                    payload:{ error: res.data.error}
                })
            }
        }
    }
}





