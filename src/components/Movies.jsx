import React from "react";
import Hero from "./Hero";
import InputPanel from "./InputPanel";
import MovieCard from "./MovieCard";

export default function Movies({
    movies,
    genres,
    handleChange,
    handleClear,
    inputPanelData,
}) {
    return (
        <div className="container">
            <Hero />
            <InputPanel
                genres={genres}
                handleClear={handleClear}
                handleChange={handleChange}
                inputPanelData={inputPanelData}
            />
            <div className="movies">
                {movies &&
                    movies.map((movie) => {
                        return <MovieCard key={movie.id} info={movie} />;
                    })}
            </div>
        </div>
    );
}
