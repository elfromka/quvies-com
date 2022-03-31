import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import "normalize.css";
import "./scss/App.scss";

import Header from "./components/Header";
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

function App() {
    const API_KEY = "api_key=33925aae900a791e5e7fc4df628771dc";
    const BASE_URL = "https://api.themoviedb.org/3/";

    const [moviesData, setMoviesData] = useState({ movies: [], genres: [] });
    const [inputPanelData, setInputPanelData] = useState({
        searchByKeyword: "",
        sortByRating: "",
        filterByGenre: "",
    });

    const fetchMoviesData = async () => {
        try {
            const responseMovies = await axios.get(
                `${BASE_URL}movie/popular?${API_KEY}`
            );

            const responseGenres = await axios.get(
                `${BASE_URL}genre/movie/list?${API_KEY}`
            );

            axios.all([responseMovies, responseGenres]).then(
                axios.spread((...allData) => {
                    setMoviesData({
                        movies: allData[0].data.results,
                        genres: allData[1].data.genres,
                    });
                })
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMoviesData();
    }, []);

    function handleChange(event) {
        const { name, value, type } = event.target;

        setInputPanelData((prevInputPanelData) => {
            return {
                ...prevInputPanelData,
                [name]: value,
            };
        });

        // TODO: search needs to be fixed
        // if (type === "text") {
        //     setMoviesData((prevMoviesData) => {
        //         const filteredMovies = prevMoviesData.movies.filter(
        //             (movie) => movie.title === value
        //         );

        //         return {
        //             genres: [...prevMoviesData.genres],
        //             movies: filteredMovies,
        //         };
        //     });
        // }

        if (type === "select-one") {
            if (name === "sortByRating") {
                const filteredMovies = moviesData.movies.sort((a, b) => {
                    if (value === "asc") {
                        return a.vote_average - b.vote_average;
                    } else if (value === "desc") {
                        return b.vote_average - a.vote_average;
                    }

                    return moviesData;
                });

                setMoviesData((prevMoviesData) => {
                    return {
                        genres: [...prevMoviesData.genres],
                        movies: filteredMovies,
                    };
                });
            }

            if (name === "filterByGenre") {
                const filteredMovies = moviesData.movies.filter((movie) =>
                    movie.genre_ids.includes(parseInt(value))
                );

                setMoviesData((prevMoviesData) => {
                    return {
                        genres: [...prevMoviesData.genres],
                        movies: filteredMovies,
                    };
                });
            }
        }
    }

    function handleClear() {
        setInputPanelData((prevInputPanelData) => {
            return {
                ...prevInputPanelData,
                searchByKeyword: "",
            };
        });
    }

    return (
        <Router>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Movies
                            movies={moviesData.movies}
                            genres={moviesData.genres}
                            inputPanelData={inputPanelData}
                            handleChange={handleChange}
                            handleClear={handleClear}
                        />
                    }
                />
                <Route path="movie/:movieId" element={<Movie />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
