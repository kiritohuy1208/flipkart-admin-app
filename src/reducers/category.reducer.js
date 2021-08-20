import { categoryConstants } from "../actions/constants"

const initialState  = {
   categories: [],
   error: null,
   loading: false
}
const buildNewCategories = (categories,category,id) =>{
    let categoryList = []
    if(id === undefined){
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: []
            }
        ];
    }
    for(let cat of categories){
       
        if( cat._id === id){ // check nếu parentId của category mới thêm vào bằng với id của cate đang duyện
            // tức cate đang duyệt là cha của new category 
            const newCategory ={
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: []
            }
            categoryList.push(
                {
                    ...cat, // copy all thuộc tính đang có của cate ngoại trừ thk children
                    children: cat.children.length>0 ? // nếu thk cha có 
                     // tao lai children của thk cha, sao đo push category hien tai vao children of thk cha
                     buildNewCategories([...cat.children,newCategory],category,id)  : [newCategory]
                }
            )
        }else{
            categoryList.push(
                {
                    ...cat,
                    children: cat.children ? buildNewCategories(cat.children,category,id) : []
                }
            )
        }
       
        
    }
    return categoryList
}

var categoryReducer = (state = initialState , action) => {

    switch(action.type){
        
        // ------------- Get All Category--------------
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:{
            state={
                ...state,
                loading: true
            }
            break
        }
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:{

            
            state={
                ...state,
                categories: action.payload.categories,
               loading: false
            }
            break
        }
        case categoryConstants.GET_ALL_CATEGORIES_FAILURE:{
            state={
                ...state,
               error: action.payload.error,
               loading: false
            }
            break
        }
        //-----------Add new Category------------------------
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:{
            state={
                ...state,
                loading: true
            }
            break
        }
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:{
            const category = action.payload.category
            const updatedCategories = buildNewCategories(state.categories,category,category.parentId)

            state={
                ...state,
                categories: updatedCategories,
               loading: false
            }
            break
        }
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:{
            state={
                ...initialState,
                loading: false,
                error: action.payload.error
            }
            break
        }
        //------------Update category--------------------
        case categoryConstants.UPDATE_CATEGORIES_REQUEST:{
            state={
                ...state,
                loading: true
            }
            break
        }
        case categoryConstants.UPDATE_CATEGORIES_SUCCESS:{
            state={
                ...state,
                loading: false
            }
            break
        }
        case categoryConstants.UPDATE_CATEGORIES_FAILURE:{
            state={
                ...state,
                loading: false,
                error: action.payload.error
            }
            break
        }
        //----------------Delete category:---------------------
        case categoryConstants.DELETE_CATEGORIES_REQUEST:{
            state={
                ...state,
                loading: true
            }
            break
        }
        case categoryConstants.DELETE_CATEGORIES_SUCCESS:{
            state={
                ...state,
                loading: false
            }
            break
        }
        case categoryConstants.DELETE_CATEGORIES_FAILURE:{
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
export default categoryReducer