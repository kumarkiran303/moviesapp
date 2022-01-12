import React, { Fragment , useContext, useEffect, useState} from "react";
import {GridList, GridListTile , GridListTileBar} from "@material-ui/core";

import Header from "../../common/header/Header";
import "./Home.css";
import MovieFilter from "./Filter/MovieFilter";
import MovieListContext from "../authContext";
import { FilterTiltShiftSharp } from "@material-ui/icons";

export default function Home(props){         
    const [movies, setMovies] = useState([]);
    const [filterMovies, setFilterMovies] = useState([]);
    const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'};

    async function loadMovies(){
        const rawResponse = await fetch(`${props.baseUrl}movies`,{
          method:"GET"
        });
    
        const input = await rawResponse.json();
        setMovies(input.movies);         
        setFilterMovies(input.movies);        
    }  
    
    useEffect(() => {
        loadMovies();        
    }, []);

    const movieSelectHandler = (id) => {                
        props.history.push({pathname: "/movie/" + id});
    }

    function filterHandler(filter){             
        let newMovieList = movies;
        if(filter.movie_name !== '')
            newMovieList = newMovieList.filter((movie) => (movie.title.includes(filter.movie_name)));                        
        
        if(filter.release_start_date !== '')
            newMovieList = newMovieList.filter((movie) => (new Date(movie.release_date) >= new Date(filter.release_start_date)));        
        
        if(filter.release_end_date  !== '')
            newMovieList = newMovieList.filter((movie) => (new Date(movie.release_date) <= new Date(filter.release_end_date)));        

        if(filter.selectedArtistList.length  > 0){
            newMovieList = newMovieList.filter((movie) => 
                (movie.artists && movie.artists.some((artist) => (filter.selectedArtistList.indexOf(`${artist.first_name} ${artist.last_name}`) > -1)))               
            );            
        }

        if(filter.selectedGenresList.length > 0){
            newMovieList = newMovieList.filter((movie) => 
                (movie.genres && movie.genres.some((genre) => (filter.selectedGenresList.indexOf(genre) > -1)))                    
            );
        }

        setFilterMovies(newMovieList);                
    }

    return(
        <Fragment>
            <Header baseUrl={props.baseUrl}/>
            <div className="body-container">
                <div className="secondary-header">Upcoming Movies</div>
                <div className="gridlist-container gridlist-upcoming">
                    <GridList className="upcominglist" cellHeight={250} cols={6}>
                        {movies.map((movie) => {
                          if(movie.status === "PUBLISHED"){
                            return (<GridListTile className="grid-list-tile" key={movie.id} onClick={() => movieSelectHandler(movie.id)}>
                                <img src={movie.poster_url} />
                                <GridListTileBar
                                    title={movie.title}                                    
                                />
                            </GridListTile>
                            )
                          }
                        })}
                    </GridList>
                </div> 
                <div className="gridlist-filter-container">
                    <div className="gridlist-container gridlist-released">
                        <GridList className="releasedlist" cellHeight={350} cols={4}>
                            {filterMovies.map(movie => {
                              if(movie.status === "RELEASED"){
                                return (<GridListTile className="grid-list-tile" key={movie.id} onClick={() => movieSelectHandler(movie.id)}>
                                    <img src={movie.poster_url} />
                                    <GridListTileBar
                                        title={movie.title}
                                        subtitle={<span>Release Date {new Date(movie.release_date).toLocaleDateString('en-IN', dateOptions)}</span>}
                                    />
                                </GridListTile>
                                )
                              }
                            })}
                        </GridList>
                    </div>
                    <div className="filter-container">
                        <MovieFilter filterHandler={filterHandler} baseUrl={props.baseUrl}/>
                    </div>
                </div>        
            </div>
        </Fragment>
    );
}