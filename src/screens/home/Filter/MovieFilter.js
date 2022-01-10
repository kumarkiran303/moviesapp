import { Button, Card, CardActions, CardContent, CardHeader, Checkbox, FormControl, Input, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import primary from '@material-ui/core/colors/green';

import "./MovieFilter";
import { indigo, yellow } from "@material-ui/core/colors";
import { light } from "@material-ui/core/styles/createPalette";


export default function MovieFilter(props){   

    const [genresList, setGenresList] = useState([]);
    const [artistList, setArtistList] = useState([]);


    const theme = createMuiTheme({
        palette:{
            primary:{
                main : yellow[500],
                light : '#757de8'                        
            },           
        }
    });

    const genresChangeHandler = (event) => {
        const { checkboxs} = event.target;
        const value = [];
        // for(let index = 0, l= checkboxs.length; index < l; index++){
        //     if(checkboxs[index].checked){
        //         value.push(checkboxs[index].value);
        //     }
        // }
        setGenresList(value);
    }

    const filterHandler = (event) => {
        event.preventDefault();
        props.filterHandler();
    }

    const artistChangeHandler = () => {

    }

    return(
        <Fragment>
            <Card className="filter-card">
                <MuiThemeProvider theme={theme}>                    
                    <CardHeader title="FIND MOVIES BY:">                     
                    </CardHeader>                    
                </MuiThemeProvider>
                <CardContent>
                    <form id="filter-form" onSubmit={filterHandler}>
                        <FormControl>
                            <InputLabel htmlFor="moviename">Movie Name</InputLabel>
                            <Input type="text" id="moviename" ></Input>
                        </FormControl><br/><br/>
                        <FormControl>
                            <InputLabel id="label-genres">Genres</InputLabel>
                            <Select  
                                labelId = "label-genres"
                                id="genres"
                                value={genresList}
                                multiple       
                                onChange={genresChangeHandler}                           
                                >
                                <MenuItem value={genresList[0]}>
                                    <Checkbox checked={genresList[0]} name="drama"/>
                                    Drama
                                </MenuItem>
                                <MenuItem value={genresList[1]}>
                                    <Checkbox checked={genresList[1]} name="romance"/>
                                    Romance
                                </MenuItem>
                            </Select>
                        </FormControl><br/><br/>
                        <FormControl>
                            <InputLabel id="label-artist">Artist</InputLabel>
                                <Select  
                                    labelId = "label-artist"
                                    id="artist"
                                    value={artistList}
                                    multiple       
                                    onChange={artistChangeHandler}                           
                                    >
                                    <MenuItem value={artistList[0]}>
                                        <Checkbox checked={artistList[0]} name="Manish"/>
                                        Manish
                                    </MenuItem>
                                    <MenuItem value={artistList[1]}>
                                        <Checkbox checked={artistList[1]} name="Rajkumar"/>
                                        Rajkumar
                                    </MenuItem>
                                </Select>
                        </FormControl><br/><br/>
                        <FormControl>
                            <TextField id="release-start-date-picker" 
                                label="Release Date Start" 
                                color="secondary"
                                type="date"
                                InputLabelProps={{shrink: true}}
                                >
                            </TextField>
                        </FormControl><br/><br/>
                        <FormControl>
                            <TextField id="release-end-date-picker" 
                                label="Release Date End" 
                                color="secondary"
                                type="date"     
                                defaultValue="dd-mm-yyyy"   
                                InputLabelProps={{shrink: true}}                           
                                >
                            </TextField>
                        </FormControl>
                    </form>
                </CardContent>
                <CardActions>
                    <Button type="submit" form="filter-form" variant="contained" className="custom-btn" color="primary">APPLY</Button>
                </CardActions>
            </Card>
        </Fragment>
    );
}