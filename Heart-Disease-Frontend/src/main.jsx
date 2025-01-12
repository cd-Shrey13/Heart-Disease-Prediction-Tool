import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HeartDiseasePredictionForm from "./HeartDiseasePredictionForm";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeartDiseasePredictionForm />
  </StrictMode>
);
