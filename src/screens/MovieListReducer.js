import React from "react";

export default function MovieListReducer(state, dispatch){
    switch(dispatch.type){
        case "updateMovies":
            return { ...state, movies:dispatch.payLoad};
        default:
            return state;
    }
}