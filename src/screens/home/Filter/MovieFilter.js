import { Button, Card, CardActions, CardContent, CardHeader, Checkbox, FormControl, Input, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

import "./MovieFilter.css";
import { yellow } from "@material-ui/core/colors";


export default function MovieFilter(props) {

    const [genresList, setGenresList] = useState([]);
    const [artistList, setArtistList] = useState([]);
    const [formContext, setFormContext] = useState({
        movie_name: '',
        // genres: [],
        selectedGenresList: [],
        selectedArtistList: [],
        release_start_date: '',
        release_end_date: ''
    });


    const theme = createMuiTheme({
        palette: {
            primary: {
                main: yellow[500],
                light: '#757de8'
            },
        }
    });

    const filterHandler = (event) => {
        event.preventDefault();
        props.filterHandler(formContext);
    }

    function inputChangeHandler(e) {
        const newFormContext = formContext;
        newFormContext[e.target.name] = e.target.value;
        setFormContext({ ...newFormContext });
    }

    // const selectionChageHandler = (index) => {
    //     const newFormContext = formContext
    //     const selectedGenresList = newFormContext.selectedGenresList;
    //     const isChecked = selectedGenresList[index]

    //     if (!isChecked)
    //         selectedGenresList[index] = true;
    //     else
    //         selectedGenresList[index] = false;

    //     newFormContext["selectedGenresList"] = selectedGenresList;
    //     setFormContext({ ...newFormContext });
    // }

    async function loadArtists() {
        const rawResponse = await fetch(`${props.baseUrl}artists`, {
            method: 'GET'
        });

        const input = await rawResponse.json();

        if (rawResponse.ok) {
            setArtistList(input.artists);
        }
    }

    async function loadGenres() {
        const rawResponse = await fetch(`${props.baseUrl}genres`, {
            method: 'GET'
        });

        const input = await rawResponse.json();

        if (rawResponse.ok) {
            setGenresList(input.genres);

            const newFormContext = formContext;
            // newFormContext["selectedGenresList"] = new Array(input.genres.length).fill(false);
            setFormContext({ ...newFormContext });
        }
    }

    useEffect(() => {
        //fetching artists
        loadArtists();
        //fetching genres
        loadGenres();
    }, []);

    return (
        <Fragment>
            <Card className="filter-card">
                <MuiThemeProvider theme={theme}>
                    <CardHeader title="FIND MOVIES BY:">
                    </CardHeader>
                </MuiThemeProvider>
                <CardContent>
                    <form id="filter-form" onSubmit={filterHandler}>
                        <FormControl className="formControl">
                            <InputLabel htmlFor="moviename">Movie Name</InputLabel>
                            <Input type="text" id="moviename" name="movie_name" value={formContext.movie_name} onChange={inputChangeHandler}></Input>
                        </FormControl><br /><br />
                        <FormControl className="formControl">
                            <InputLabel id="label-genres">Genres</InputLabel>
                            <Select
                                labelId="label-genres"
                                id="genres"
                                value={formContext.selectedGenresList}
                                multiple
                                onChange={inputChangeHandler}
                                name="selectedGenresList"
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {genresList.map((genreItem, index) => {
                                    return (<MenuItem key={index} value={genreItem.description}>
                                        <Checkbox checked={formContext.selectedGenresList.indexOf(genreItem.description) > -1} />
                                        {genreItem.description}
                                    </MenuItem>)
                                })
                                }
                            </Select>
                        </FormControl><br /><br />
                        <FormControl className="formControl">
                            <InputLabel id="label-artist">Artist</InputLabel>
                            <Select
                                labelId="label-artist"
                                id="artist"
                                value={formContext.selectedArtistList}
                                multiple
                                onChange={inputChangeHandler}
                                name="selectedArtistList"
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {artistList.map((artist) => {
                                    return (<MenuItem key={artist.id} value={`${artist.first_name} ${artist.last_name}`}>
                                        <Checkbox checked={formContext.selectedArtistList.indexOf(`${artist.first_name} ${artist.last_name}`) > -1} />
                                        {`${artist.first_name} ${artist.last_name}`}
                                    </MenuItem>)
                                })
                                }
                            </Select>
                        </FormControl><br /><br />
                        <FormControl className="formControl">
                            <TextField id="release-start-date-picker"
                                label="Release Date Start"
                                color="secondary"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                name="release_start_date"
                                value={formContext.release_start_date}
                                onChange={inputChangeHandler}
                            >
                            </TextField>
                        </FormControl><br /><br />
                        <FormControl className="formControl">
                            <TextField id="release-end-date-picker"
                                label="Release Date End"
                                color="secondary"
                                type="date"
                                defaultValue="dd-mm-yyyy"
                                InputLabelProps={{ shrink: true }}
                                name="release_end_date"
                                value={formContext.release_end_date}
                                onChange={inputChangeHandler}
                            >
                            </TextField>
                        </FormControl><br /><br />
                        <Button type="submit" form="filter-form" variant="contained" className="custom-btn filter-btn" color="primary">APPLY</Button>
                    </form>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </Fragment>
    );
}