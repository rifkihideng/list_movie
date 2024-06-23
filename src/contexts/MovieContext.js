import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);

  const baseUrl = 'https://api.themoviedb.org/3/';
  const apiKey = '05d7e8600654ed5a58d8be039d549de1';

  const fetchMovies = async (categories) => {
    try {
      setLoading(true);
      const fetchedMovies = {};
      for (const category of categories) {
        const url = `${baseUrl}movie/${category}?api_key=${apiKey}&language=en-US&page=1`;
        const response = await axios.get(url);
        fetchedMovies[category] = response.data.results.slice(0, 5);
      }
      setMovies(fetchedMovies);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(['now_playing', 'popular', 'top_rated', 'upcoming']);
  }, [baseUrl, apiKey]);

  return (
    <MovieContext.Provider value={{ movies, loading, fetchMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext };
