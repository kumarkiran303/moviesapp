import React from "react";

export default function AuthReducer(state, dispatch){
    switch(dispatch.type){
        case "loggedIn":
            return { ...state, isLoggedIn:dispatch.payLoad};

        case "loggedOut" :
            return { ...state, isLoggedIn:dispatch.payLoad};
        default:
            return state;
    }
}