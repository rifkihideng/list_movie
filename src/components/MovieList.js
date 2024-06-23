import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MovieContext } from '../contexts/MovieContext';
import './MovieList.css';

const MovieList = () => {
  const { movies, loading } = useContext(MovieContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (Object.keys(movies).length === 0) {
    return <div>No movies found.</div>;
  }

  return (
    <div className="movie-list">
      {Object.keys(movies).map(category => (
        <div key={category}>
          <h2>{category.replace('_', ' ')}</h2>
          <div className="movies">
            {movies[category].map(movie => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <div className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>Release Date: {movie.release_date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
