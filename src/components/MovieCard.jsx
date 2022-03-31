import React from "react";

export default function MovieCard({ info }) {
    const { title, poster_path, vote_average } = info;
    const poster = poster_path
        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
        : `http://via.placeholder.com/800x500`;

    return (
        <div className="card">
            <img src={poster} alt={title} />
            <span className="rating-badge">{vote_average}</span>
            <div className="title">
                <h4>{title}</h4>
            </div>
        </div>
    );
}
