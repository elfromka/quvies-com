import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import ApiDb from "./util/api-db";

import "normalize.css";
import "./scss/App.scss";

import Header from "./components/Header";
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";

function App() {
    const { BASE_URL, API_KEY } = ApiDb;

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [query, setQuery] = useState({
        searchByKeyword: "",
        sortByRating: "",
        filterByGenre: "",
    });

    /**
     * Retrieves movies from the movie db API.
     *
     * @param none
     */
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

    /**
     * Retrieves all genres from the movie db API.
     *
     * @param none
     */
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

    /**
     * Retrieves movies from the movie db API based on the keyword
     * entered in the search form.
     *
     * @param none
     */
    const fetchSearchedMovie = async () => {
        const { searchByKeyword } = query;

        if (searchByKeyword) {
            try {
                const responseMovies = await axios.get(
                    `${BASE_URL}search/movie?${API_KEY}&query=${searchByKeyword}`
                );

                setMovies(responseMovies.data.results);
            } catch (error) {
                console.error(error);
            }
        } else {
            fetchMovies();
        }
    };

    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, []);

    /**
     * Checks changes in select/dropdowns and input as well on from the
     * InputPanel component(search, filter/sort).
     *
     * @param event
     */
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

    /**
     * Function fired on form submit when a keyword is entered in the search input
     * and the 'Search' button is pressed(form submitted). Clears the previous
     * value/clears the input on submit.
     *
     * @param event
     */
    function handleSubmit(event) {
        event.preventDefault();

        // clear previous value of input
        handleClear();

        // retrieve data based on the prev entered keyword
        fetchSearchedMovie();
    }

    /**
     * Called from handleSubmit method to clear input value.
     *
     * @param event
     */
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
