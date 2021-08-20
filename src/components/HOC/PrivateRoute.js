import React from 'react'
import { Redirect, Route } from 'react-router-dom'

/**
* @author
* @function 
**/
// Create private route for admin
const PrivateRoute = ({component: Component, ...rest}) => {
//    console.log(...rest)
   return(
    <Route {...rest} component={(props)=>{
        const token = window.localStorage.getItem('token')
        if(token){
            return <Component {...props} />
        }else{
            return <Redirect to={`/signin`}/>
        }
    }} />
   )

}

export default PrivateRoute