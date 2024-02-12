// FileUpload.js

// import "../../../css/DragAndDrop.css";
// FileUpload.js
import { Navigate } from "react-router-dom";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const FileUpload = () => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    // Create a FormData object and append the file to it
    const formData = new FormData();
    formData.append("file", file);

    // Make a POST request to your backend endpoint
    (async () => {
      const response = await axios.post(
        `http://localhost:8000/upload/${localStorage.getItem("id")}`,
        formData
      );
      const message = response.data.message;
      if (message) {
        //redirect
        window.location.href = "/dashboard/submit/summarize";
      } else alert("Error Processing in file");
    })();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "pdf/*", // Specify the file types you want to accept
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "active" : ""}`}
    >
      <input {...getInputProps()} />
      <p>Drag & drop an image here, or click to select an image</p>
    </div>
  );
};

export default FileUpload;
