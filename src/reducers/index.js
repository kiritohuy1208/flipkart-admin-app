import authReducers from "./auth.reducers";
import userReducers from "./user.reducers";
import categoryReducer from './category.reducer'
import orderReducer from './orders.reducer'
import productReducer from './products.reducer'
import pageReducer from "./page.reducer";

import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    auth: authReducers,
    user: userReducers,
    category: categoryReducer,
    order:orderReducer,
    product:productReducer,
    page: pageReducer

})
export default rootReducer
