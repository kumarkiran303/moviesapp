import React, { Fragment , useContext, useEffect, useState} from "react";
import {GridList, GridListTile , GridListTileBar} from "@material-ui/core";

import Header from "../../common/header/Header";
import "./Home.css";
import MovieFilter from "./Filter/MovieFilter";
import MovieListContext from "../MovieListContext";
import { FilterTiltShiftSharp } from "@material-ui/icons";

export default function Home(props){    
    const movies = useContext(MovieListContext);        

    const movieSelectHandler = (id) => {                
        props.history.push({pathname: "/movie/" + id});
    }

    function filterHandler(){
      // setImages([
      //   {
      //     thumbnail: {
      //       uri: "https://th.bing.com/th/id/OIP.BESpuhIbOyBmbxIO3NkfAQHaEK?pid=ImgDet&rs=1/",
      //       name: "Spiderman",
      //     },
      //   }]);
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
                            {movies.map(movie => {
                              if(movie.status === "RELEASED"){
                                return (<GridListTile className="grid-list-tile" key={movie.id} onClick={() => movieSelectHandler(movie.id)}>
                                    <img src={movie.poster_url} />
                                    <GridListTileBar
                                        title={movie.title}
                                        subtitle={<span>Release Date {movie.release_date}</span>}
                                    />
                                </GridListTile>
                                )
                              }
                            })}
                        </GridList>
                    </div>
                    <div className="filter-container">
                        <MovieFilter filterHandler={filterHandler}/>
                    </div>
                </div>
                <p>Home Component</p>
            </div>
        </Fragment>
    );
}