import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './detection.css';  

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const canvasRef = useRef(null);

 
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
  };

  // Fonction pour envoyer l'image à l'API Flask
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Veuillez sélectionner une image');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Mettre à jour les prédictions
      setPredictions(response.data.predictions);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'image", error);
    }
  };

  // Fonction pour recadrer et redimensionner l'image avec le canevas
  const cropAndResizeImage = (box) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = preview;
    
    image.onload = () => {
      const [x1, y1, x2, y2] = box;  // Coordonées de la boîte englobante
      const cropWidth = x2 - x1;
      const cropHeight = y2 - y1;
      
      // Taille de l'image originale
      const originalWidth = image.width;
      const originalHeight = image.height;
      
      // Taille du canevas égale à l'image originale
      canvas.width = originalWidth;
      canvas.height = originalHeight;
      
      // Remplir le canevas avec la même taille d'image
      ctx.clearRect(0, 0, originalWidth, originalHeight);  // Effacer le canevas
      ctx.drawImage(
        image,  // Image originale
        x1, y1, cropWidth, cropHeight,  // Zone à recadrer (x1, y1, largeur, hauteur)
        0, 0, originalWidth, originalHeight  // Redimensionner et dessiner l'image sur tout le canevas
      );
    };
  };

  // Appliquer le recadrage une fois les prédictions reçues
  useEffect(() => {
    if (predictions.length > 0) {
      // Croper et redimensionner l'image avec la première prédiction
      cropAndResizeImage(predictions[0].box);
    }
  }, [predictions]);

  return (
    <div className="App">
      <h1>YOLOv8 - Détection de tiques</h1>
      
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Uploader et Prédire</button>
      </form>

      {/* Aperçu de l'image sélectionnée */}
      {preview && (
        <div className="image-preview">
          <h2>Aperçu de l'image :</h2>
          <img src={preview} alt="Aperçu de l'image téléchargée" />
        </div>
      )}

      {/* Canevas pour l'image recadrée */}
      <canvas ref={canvasRef}></canvas>

      <h2>Résultats de la Prédiction :</h2>
      {predictions.length > 0 && (
        <ul>
          {predictions.map((prediction, index) => (
            <li key={index}>
              <strong>Classe :</strong> {prediction.class} <br />
              <strong>Confiance :</strong> {prediction.confidence.toFixed(2)} <br />
              <strong>Boîte :</strong> {prediction.box.join(', ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
