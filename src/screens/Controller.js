import React,{Fragment, useEffect, useReducer, useState} from "react";
import { Router, Route } from "react-router-dom";

import Home from "../screens/home/Home";
import Details from "./details/Details.js";
import Header from "../common/header/Header";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";
import history from "../common/history";
import MovieListContext from "./MovieListContext";
import MovieListReducer from "./MovieListReducer";

const Controller = () => {
  const baseUrl = "/api/v1/";

  const [movies, setMovies] = useState([]);
  const [state, dispatch] = useReducer(MovieListReducer, {movies:[]});

  async function loadMovies(){
    const rawResponse = await fetch(`${baseUrl}movies`,{
      method:"GET"
    });

    const input = await rawResponse.json();
    setMovies(input.movies);
    dispatch({"type":"updateMovies", payLoad:input.movies})
  }  

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <Fragment>     
      <MovieListContext.Provider value={state.movies}>
        <Router history={history}>        
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
      </MovieListContext.Provider>
    </Fragment>
  );
};

export default Controller;
