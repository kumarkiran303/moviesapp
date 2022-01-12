import React, {Fragment, useContext, useState} from "react";
import { Button } from '@material-ui/core';

import "./Header.css";
import logoSVG from "../../assets/logo.svg";
import LoginRegister from "../Auth/LoginRegister";
import authContext from "../../screens/authContext";

export default function Header(props){
    // const [context, setcontext] = useState({
    //     isLoggedIn : false,                
    // });    

    const {authenticated, setAuthenticated} = useContext(authContext);
    
    const [modalState, setModalState] = useState(false);

    function bookShowhandler (id){
        if(!authenticated){
            return setModalState(true);
        }        
        
        props.history.push({pathname : `/bookshow/${props.movieId}`});
    }

    function logInhandler(){              
        setModalState(true);
    }

    function logOuthandler (){
        // const contextState = context;
        // contextState["isLoggedIn"] = false;
        // setcontext({...contextState});
        setAuthenticated(false);
    }

    function modalHandler(modalState, isLoggedIn){        
        setModalState(modalState);
           // const contextState = context;
            // contextState["isLoggedIn"] = true;
            // setcontext({...contextState});
            setAuthenticated(isLoggedIn);            
        
    }

    console.log(props.canBookShow);

    return(      
        <Fragment>
            <div className="header-container">
                <img src={logoSVG} alt="logo" className="logo"/>
                <div className="button-container">              
                    {(props.canBookShow) ?
                        <Button variant="contained" className="custom-btn" color="primary" onClick={() => bookShowhandler()}>Book Show</Button> :
                        ""
                    }
                    
                    {(authenticated) ?                         
                        <Button variant="contained" className="custom-btn" onClick={() => logOuthandler()}>Logout</Button>:
                        <Button variant="contained" className="custom-btn" onClick={() => logInhandler()}>Login</Button> 
                    }                
                </div>
            </div>   
            <LoginRegister baseUrl={props.baseUrl} modalState={modalState} modalHandler={modalHandler}></LoginRegister>
        </Fragment>   
    );
}