import React from "react";
import { Helmet } from 'react-helmet';
import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer.js";
import Card from "../../Components/Card.js";
// import {data} from "../../Data/starterData.js";

// import freeWilly from "../../Assets/free-willy.png";
// import frozen from "../../Assets/frozen.png";
// import moonlight from "../../Assets/moonlight.png";
// import pulpFiction from "../../Assets/pulp-fiction.png";
// import theNegotiator from "../../Assets/the-negotiator.png";
// import titanic from "../../Assets/titanic.png";
// import up from "../../Assets/up.png";

import "./Movies.css";



// import ProfilePicChange from "./Components/ProfilePicChanger";
// import { BrowserRouter as Router, Routes ,Route  } from 'react-router-dom';
// import Profile from "../src/Pages/Profile";


const Movies = (props) => {
    console.log("props from app:", props)

// api address: OMDb API: http://www.omdbapi.com/?t=${title}&apikey=96ae0748

//PUT API CALL IN HERE AND THEN I CAN PASS PROPS DOWN TO THE CARD COMPONENT - NO, IT GOES IN APP


    // allMovies.map((item, index) => {
    //     async function getMovies() {
    //         let response = await fetch('http://www.omdbapi.com/?t=${title}&apikey=96ae0748');
    //         let moviesInfo = await response.json();
    //         console.log(moviesInfo);
    // }});

    return (

        <div className="movies">
            <Helmet>
                <title>Movies</title>
            </Helmet>
            <Header title="Movies" />
                <div className="cardWrapper">
                    <div className="movieCard">
                    {props.movies.map((movie, key) => {
                        return <Card 
                            // imgSrc={index <= 6 ? movie[index] : movie[6]}
                            // title = {movie.title}
                            // plot = {movie.plot}
                            // releaseDate = {movie.releaseDate}
                            movie = {movie}
                            key = {key} />
                    })}
                    </div>
                </div>
            <Footer title="Footer" />
        </div>
        );
}

export default Movies;