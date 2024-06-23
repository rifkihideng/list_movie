import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context object
const MovieContext = createContext();

// Create a provider component
export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define API base URL and API key
  const baseUrl = 'https://api.themoviedb.org/3/';
  const apiKey = '05d7e8600654ed5a58d8be039d549de1';

  // Fetch movies when component mounts
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = `${baseUrl}movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
        const response = await axios.get(url);
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [baseUrl, apiKey]);

  return (
    <MovieContext.Provider value={{ movies, loading, baseUrl }}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext };
