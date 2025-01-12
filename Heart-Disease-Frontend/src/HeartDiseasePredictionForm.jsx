import React, { useState } from "react";
import axios from "axios";

const HeartDiseasePredictionForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://heart-disease-prediction-tool.onrender.com/predict", formData);
      alert(`Prediction: ${response.data.prediction}`);
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred while making the prediction.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Heart Disease Prediction Tool</h2>
      {Object.keys(formData).map((field) => (
        <div key={field}>
          <label htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
          </label>
          <input
            type="number"
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default HeartDiseasePredictionForm;

