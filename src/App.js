import React,{useEffect} from 'react'
import { Route, Switch} from 'react-router-dom'
import PrivateRoute from './components/HOC/PrivateRoute';

import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import { useDispatch, useSelector } from 'react-redux'
import {getInitialData, isUserLoggedIn} from './actions'
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import Page from './containers/Pages';

import './App.css';


function App() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  //compponentDidMount get called only once 
  useEffect(() => {

      if(!auth.authenticate){
        dispatch(isUserLoggedIn())
      }
      if(auth.authenticate){
      dispatch(getInitialData())
      }
  },[auth.authenticate]) // when authenticate change will call use effect
  return (
    <div className="App">
    
        <Switch>
          {/* Home admin is PrivateRoute */}
          <PrivateRoute path = "/" exact component={Home}/> 
          <PrivateRoute path = "/page"  component={Page} /> 
          <PrivateRoute path = "/products"  component={Products} /> 
          <PrivateRoute path = "/orders"  component={Orders }/> 
          <PrivateRoute path = "/category"  component={Category }/> 


          <Route path = "/signin" component={Signin}/>
          <Route path = "/signup" component={Signup}/>
        </Switch>
   
    </div>
  );
}

export default App;
