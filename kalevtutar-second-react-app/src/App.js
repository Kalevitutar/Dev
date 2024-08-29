import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Movies from "./Pages/Movies/Movies";
import Profile from "./Pages/Profile/Profile"

function App() {
  const [movieTitles, setMovieTitles] = useState(["Free Willy", "Frozen", "Titanic", "Moonlight", "Up", "Pulp Fiction", "The Negotiator"]);

  const [movies, setMovies]= useState([]);

  const getMovieObj = async (title) => {
    const url = `http://www.omdbapi.com/?i=tt3896198&t=${title}&apikey=96ae0748`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("responseJson", data);
    return data;
    };

  const getMovies = async (titlesArr) => {
    const storeReturn = await Promise.all(titlesArr.map(title => {
      let obj = getMovieObj(title);
      console.log(obj, "obj");
      return obj;
      }))
      console.log(storeReturn, "storeReturn");
      setMovies(storeReturn);
      return storeReturn;
    };

  useEffect(() => {
    getMovies(movieTitles);
    }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Movies movies={movies} />} />
        <Route path="Profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
