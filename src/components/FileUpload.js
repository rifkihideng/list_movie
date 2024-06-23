// src/components/FileUpload.js
import React from 'react';

const FileUpload = ({ onFileSelect }) => {
  const handleFileInput = (e) => {
    onFileSelect(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileInput} />
    </div>
  );
};

export default FileUpload;
