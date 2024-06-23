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
            <Route path="/list_movie" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/" element={<MovieList />} /> {/* Redirect to list_movie */}
          </Routes>
        </div>
      </MovieProvider>
    </Router>
  );
};

export default App;
