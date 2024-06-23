// src/components/MovieDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FileUpload from './FileUpload'; // Ensure this matches the actual file name
import CameraCapture from './CameraCapture';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [userId, setUserId] = useState('');

  const baseUrl = 'https://api.themoviedb.org/3/';
  const apiKey = '05d7e8600654ed5a58d8be039d549de1';

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const url = `${baseUrl}movie/${id}?api_key=${apiKey}&language=en-US`;
        const response = await axios.get(url);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, baseUrl, apiKey]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleCapture = (imageData) => {
    setCapturedImage(imageData);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      if (capturedImage) {
        const blob = await (await fetch(capturedImage)).blob();
        formData.append('file', blob, 'captured_image.png');
      }
      formData.append('userId', userId);
      formData.append('movieId', id);

      const uploadUrl = 'http://localhost:5000/upload'; // Replace with your Flask backend URL

      const response = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);
      // Handle success message or redirect after successful upload
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error message
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movie-detail">
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
        <FileUpload onFileSelect={handleFileSelect} />
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <CameraCapture onCapture={handleCapture} />
        <button onClick={handleUpload}>Upload</button>
        {capturedImage && <img src={capturedImage} alt="Captured" />}
      </div>
    </div>
  );
};

export default MovieDetail;
