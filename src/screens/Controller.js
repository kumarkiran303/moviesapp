import React,{Fragment, useEffect, useReducer, useState} from "react";
import { Router, Route } from "react-router-dom";

import Home from "../screens/home/Home";
import Details from "./details/Details.js";
import Header from "../common/header/Header";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";
import history from "../common/history";
import authContext from "./authContext";
import AuthReducer from "./AuthReducer";

const Controller = () => {
  const baseUrl = "/api/v1/";
  
  const [authenticated, setAuthenticated] = useState(false); 
  // const [state, dispatch] = useReducer(AuthReducer, {isLoggedIn:false}); 

  return (
    <Fragment>     
      <authContext.Provider value={{authenticated, setAuthenticated}}>
        <Router 
           history={history}
          >        
          <div className="main-container">          
            <Route
              exact path="/"
              render={(props) => <Home {...props} baseUrl={baseUrl}/>}
            />
            <Route
              path="/movie/:id"
              render={(props) => <Details {...props} baseUrl={baseUrl} />}
            />
            <Route
              path="/bookshow/:id"
              render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
            />
            <Route
              path="/confirm/:id"
              render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
            />
          </div>          
        </Router>      
      </authContext.Provider>
    </Fragment>
  );
};

export default Controller;
