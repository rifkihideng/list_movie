import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ category }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = '05d7e8600654ed5a58d8be039d549de1';
      const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=1`;
      const response = await axios.get(url);
      setMovies(response.data.results);
    };

    fetchMovies();
  }, [category]);

  return (
    <div className="movie-list">
      <h2>{category.replace('_', ' ')}</h2>
      <div className="movies">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
