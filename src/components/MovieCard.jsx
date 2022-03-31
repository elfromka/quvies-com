import React from "react";

export default function MovieCard({ info }) {
    const { title, poster_path, vote_average } = info;

    return (
        <div className="card">
            <img
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={title}
            />
            <span className="rating-badge">{vote_average}</span>
            <div className="title">
                <h4>{title}</h4>
            </div>
        </div>
    );
}
