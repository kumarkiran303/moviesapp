import { GridList, GridListTile, GridListTileBar, TextField, Typography } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import StarBorderIcon from '@material-ui/icons/StarBorder';

import Header from "../../common/header/Header";
import "./Details.css";
import { yellow } from "@material-ui/core/colors";

export default function Details(props){
    const id = props.match.params.id;
    const [context, setContext] = useState(
        {},
        0,
        false
    );
    
    const [movie, userRating, canBookShow] = [context.movie, context.userRating, context.canBookShow];

    const getMovie = async (id) => {
        const rawResponse = await fetch(`${props.baseUrl}/movies/${id}`,{
            method : "GET"
        });

        const input = await rawResponse.json();
        if(rawResponse.ok){
            const contextState = context;
            contextState["movie"] = input
            if(input.status === "RELEASED"){
                contextState["canBookShow"] = true;
            }
            setContext({ ...context});
        }
    }

    useEffect(() => {
        getMovie(id);
    },[]);    

    function startClickHandler(value){     
        const contextState = context;
        contextState["userRating"] = value;
        setContext({ ...context});        
    }

    
    return(
        <Fragment>
            <Header baseUrl={props.baseUrl} canBookShow={canBookShow} movieId={id} history={props.history}></Header>
            <div className="body-container">
                <Link to='/'><Typography className="navigate-back"><ArrowBackIosIcon fontSize="small"/>Back to Home</Typography></Link>
                <div className="detail-container">
                    <div className="poster-container">
                        <img src={movie && movie.poster_url}></img>                                            
                    </div>
                    <div className="trailer-container">
                        <Typography variant="h2">{movie && movie.title}</Typography>   
                        <Typography>                    
                            <Typography variant="subtitle2" inline>Genres:</Typography>
                            <Typography variant="body1" inline>{
                                movie && movie.genres && movie.genres.join(", ")                        
                             }
                            </Typography>   
                        </Typography>
                        <Typography>
                            <Typography variant="subtitle2" inline>Duration:</Typography>  
                            <Typography variant="body1" inline>{movie && movie.duration}</Typography> 
                        </Typography>
                        <Typography>
                            <Typography variant="subtitle2" inline>Release Date:</Typography>  
                            <Typography variant="body1" inline>{movie && movie.release_date}</Typography>                            
                        </Typography>
                        <Typography>
                            <Typography variant="subtitle2" inline>Rating:</Typography>  
                            <Typography variant="body1" inline>{movie && movie.rating}</Typography>                            
                        </Typography><br/>
                        <Typography>
                            <Typography variant="subtitle2" inline>Plot:</Typography>  
                            <Typography variant="body1" component="a" target="_blank" href={movie && movie.wiki_url} inline>(Wiki Link)</Typography>                            
                            <Typography variant="body1" inline>{movie && movie.storyline}</Typography>                            
                        </Typography><br/>
                        <Typography>
                            <Typography variant="subtitle2">Trailer:</Typography>   
                            <YouTube className="movie-trailer" videoId={movie && movie.trailer_url && movie.trailer_url.split("v=")[1].split("&")[0]}></YouTube>                           
                        </Typography>
                    </div>
                    <div className="artist-container">
                        <Typography variant="h5">Rate this movie:</Typography>
                        {
                            [...Array(5).keys()].map( (key, index) => {
                                return <StarBorderIcon style={userRating > index ? {color: yellow[500]}:{}} value={index + 1} onClick={() => startClickHandler(index+1)}></StarBorderIcon>
                            })
                        }      
                        <TextField type="text" value="Artists:" style={{"margin": "16px 0px"}}></TextField>
                        <div className="gridlist-container gridlist-artists">
                            <GridList className="releasedlist" cols={2}>
                                {movie && movie.artists && movie.artists.map(artist => {
                                    return (<GridListTile className="grid-list-tile" key={artist.id}>
                                        <img src={artist.profile_url} />
                                        <GridListTileBar
                                            title={artist.first_name + " " + artist.last_name}                                            
                                        />
                                    </GridListTile>
                                    )
                                })}
                            </GridList>
                        </div>                    
                    </div>
                                    
                </div>
            </div>
        </Fragment>
    );
}