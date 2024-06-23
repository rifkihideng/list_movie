import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MovieProvider } from './contexts/MovieContext';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';

const App = () => {
  return (
    <Router>
      <MovieProvider>
        <div className="App">
          <Routes>
            <Route path="/list_movie" element={
              <>
                <MovieList category="now_playing" />
                <MovieList category="popular" />
                <MovieList category="top_rated" />
                <MovieList category="upcoming" />
              </>
            } />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </div>
      </MovieProvider>
    </Router>
  );
};

export default App;
