import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MovieContext } from '../contexts/MovieContext';
import './MovieList.css';

const MovieList = ({ category }) => {
  const { movies, loading, baseUrl } = useContext(MovieContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredMovies = movies.filter(movie => {
    // Implement filtering logic based on category (now_playing, popular, etc.)
    // For demonstration, filtering is based on title containing 'man'
    return movie.title.toLowerCase().includes('man');
  });

  return (
    <div className="movie-list">
      <h2>{category.replace('_', ' ')}</h2>
      <div className="movies">
        {filteredMovies.map(movie => (
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
  );
};

export default MovieList;
