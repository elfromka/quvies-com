import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import "normalize.css";
import "./scss/App.scss";

import Header from "./components/Header";
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";

function App() {
    const API_KEY = "api_key=33925aae900a791e5e7fc4df628771dc";
    const BASE_URL = "https://api.themoviedb.org/3/";

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [query, setQuery] = useState({
        searchByKeyword: "",
        sortByRating: "",
        filterByGenre: "",
    });

    const fetchMovies = async () => {
        try {
            const responseMovies = await axios.get(
                `${BASE_URL}movie/popular?${API_KEY}`
            );

            setMovies(responseMovies.data.results);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchGenres = async () => {
        try {
            const responseGenres = await axios.get(
                `${BASE_URL}genre/movie/list?${API_KEY}`
            );

            setGenres(responseGenres.data.genres);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSearchedMovie = async () => {
        try {
            const responseMovies = await axios.get(
                `${BASE_URL}search/movie?${API_KEY}&query=${query.searchByKeyword}`
            );

            setMovies(responseMovies.data.results);
            console.log(movies);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, []);

    function handleChange(event) {
        const { name, value, type } = event.target;

        setQuery((prevQuery) => {
            return {
                ...prevQuery,
                [name]: value,
            };
        });

        // empty value => call the api again
        if (!value) {
            fetchMovies();

            return movies;
        }

        if (type === "select-one") {
            // Genre filter
            if (name === "filterByGenre") {
                const filteredMovies = movies.filter((movie) =>
                    movie.genre_ids.includes(parseInt(value))
                );

                setMovies(() => filteredMovies);
            }

            // Rating sort
            if (name === "sortByRating") {
                const filteredMovies = movies.sort((a, b) => {
                    return value === "desc"
                        ? b.vote_average - a.vote_average
                        : a.vote_average - b.vote_average;
                });

                setMovies(() => filteredMovies);
            }
        }

        if (type === "text") {
            setQuery((prevQuery) => {
                return {
                    ...prevQuery,
                    [name]: value,
                };
            });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        handleClear();

        fetchSearchedMovie();
    }

    function handleClear() {
        setQuery((prevQuery) => {
            return {
                ...prevQuery,
                searchByKeyword: "",
            };
        });
    }

    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Movies
                                movies={movies}
                                genres={genres}
                                query={query}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            />
                        }
                    />
                    <Route path="movie/:id" element={<Movie />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
