import React from "react";

export default function Movie() {
    return (
        <div className="container">
            <a className="go-back" href="/">
                Go back
            </a>
            <div className="movie">
                <h1>Rambo</h1>
                <img
                    className="img-cover"
                    src="https://source.unsplash.com/WLxQvbMyfas"
                    alt=""
                />
                <div className="additional-information">
                    <div className="genres">
                        <span className="section-title">Genres:</span>
                        <ul>
                            <li>Thriller</li>
                            <li>Documentary</li>
                            <li>Horror</li>
                        </ul>
                    </div>

                    <div className="release-year">
                        <span className="section-title">Release year:</span>2022
                    </div>

                    <div className="duration">
                        <span className="section-title">Duration: </span>
                        1h 30m
                    </div>
                </div>
                <div className="description">
                    <h2>Description</h2>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Ratione fugit voluptatem totam maiores molestias
                        ducimus temporibus reiciendis minima minus et. Lorem
                        ipsum dolor sit, amet consectetur adipisicing elit.
                        Dicta esse reiciendis ratione iusto in modi mollitia.
                        Deleniti dolor, dignissimos, iusto laborum totam
                        repudiandae ab maxime adipisci non autem similique,
                        veniam blanditiis quaerat sapiente dolores aliquid!
                    </p>
                </div>
                <h2>Top 3 actors</h2>
                <div className="top-actors">
                    <div className="actor">
                        <img
                            src="https://source.unsplash.com/WLxQvbMyfas"
                            alt=""
                        />
                        <h4>John Wick</h4>
                    </div>
                    <div className="actor">
                        <img
                            src="https://source.unsplash.com/WLxQvbMyfas"
                            alt=""
                        />
                        <h4>John Wick</h4>
                    </div>
                    <div className="actor">
                        <img
                            src="https://source.unsplash.com/WLxQvbMyfas"
                            alt=""
                        />
                        <h4>John Wick</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
