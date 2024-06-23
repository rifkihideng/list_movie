// src/components/CameraCapture.js
import React, { useRef, useState } from 'react';

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setIsStreaming(true);
    } catch (err) {
      console.error("Error accessing the camera", err);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    onCapture(imageData);
    stopCamera();
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
    setIsStreaming(false);
  };

  return (
    <div>
      <div>
        {isStreaming ? (
          <div>
            <video ref={videoRef} width="300" height="200" />
            <button onClick={captureImage}>Capture</button>
            <button onClick={stopCamera}>Stop</button>
          </div>
        ) : (
          <button onClick={startCamera}>Start Camera</button>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
