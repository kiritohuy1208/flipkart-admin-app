import axios from "../helpers/axios"
import { categoryConstants } from "./constants"

const getAllCategory = () =>{
    return async dispatch =>{
        const res = await axios.get('/category/getcategory')
        
        if(res.status === 201){
            const { categoryList } = res.data
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload:{
                    categories: categoryList
                }
            })
        }else{
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload:{
                    error: res.data.error
                }
            })
        }
    }
}
export const addCategory = (form) =>{
    return async dispatch =>{
        try{
            dispatch({
                type:categoryConstants.ADD_NEW_CATEGORY_REQUEST
            })
            const res= await axios.post('/category/create',form)
        
            if(res.status === 201){
                const {category} = res.data
                dispatch({
                    type:categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                    payload:{
                        category
                    }
                })
            }else{
                dispatch({
                    type:categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                    payload:{
                        error: res.data.error
                    }
                })
            }
        }catch(error){
            
        }
       
    }
}
export const updatedCategories = (form) =>{
    return async dispatch =>{
        dispatch({
            type: categoryConstants.UPDATE_CATEGORIES_REQUEST
        })
        const res= await axios.post('/category/update',form)
      
        if(res.status === 201){
            dispatch({
                    type: categoryConstants.UPDATE_CATEGORIES_SUCCESS
                  
                })
            dispatch(getAllCategory())
        }else{
           
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                payload:{
                    error : res.data.error
                }
            })
          
        }
    }
}
export const deleteCategoriesAction = (ids) =>{
    return async dispatch =>{
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_REQUEST
            })
        const res= await axios.post('/category/delete',{
                payload:{
                    ids
                }
            })
        if(res.status === 201){
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_SUCCESS
            })
            dispatch(getAllCategory())
        }else{
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_FAILURE,
                payload:{
                    error : res.data.error
                }
            })
        }
    }
}
export {
    getAllCategory
}