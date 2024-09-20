import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs"; // Import TensorFlow.js
import * as mobilenet from "@tensorflow-models/mobilenet";
import './ML.css'
function App() {
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [results, setResults] = useState([]);

  const imageRef = useRef();
  const textInputRef = useRef();
  const fileInputRef = useRef();

  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageUrl(url);
    } else {
      setImageUrl(null);
    }
  };

  const uploadTrigger = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
    setResults([]);
  };

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      // Set the backend explicitly
      await tf.setBackend('webgl'); // You can also try 'wasm' if 'webgl' fails
      await tf.ready(); // Ensure TensorFlow.js is fully ready

      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
    } catch (error) {
      console.error("Error loading model:", error);
    } finally {
      setIsModelLoading(false);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  const detectImage = async () => {
    if (!model) {
      console.error("Model is not loaded yet.");
      return;
    }

    if (!imageRef.current) {
      console.error("No image found.");
      return;
    }

    try {
      textInputRef.current.value = "";
      const detectionResults = await model.classify(imageRef.current);
      setResults(detectionResults);
    } catch (error) {
      console.error("Error during classification:", error);
    }
  };

  return (
    <div>
      <h1 className="header">Image Detection</h1>
      <div className="inputField">
        <input
          type="file"
          accept="image/*"
          capture="camera"
          className="uploadInput"
          onChange={uploadImage}
          ref={fileInputRef}
        />
        <button className="uploadImage" onClick={uploadTrigger}>
          Upload Image
        </button>
        <span className="or">OR</span>
        <input
          type="text"
          placeholder="Enter Image URL"
          ref={textInputRef}
          onChange={handleInputChange}
        />
      </div>
      <div className="imageWrapper">
        <div className="imageContent">
          <div className="imageArea">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Image Preview"
                crossOrigin="anonymous"
                ref={imageRef}
              />
            )}
          </div>
          {results.length > 0 && (
            <div className="imageResult">
              {results.map((result, index) => (
                <div className="result" key={result.className}>
                  <span className="name">{result.className}</span>
                  <span className="accuracy">
                    Accuracy Level: {(result.probability * 100).toFixed(2)}%
                    {index === 0 && <span className="bestGuess">Best Guess</span>}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {imageUrl && (
          <button
            className="button"
            onClick={detectImage}
            disabled={isModelLoading}
          >
            {isModelLoading ? "Loading Model..." : "Detect Image"}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
