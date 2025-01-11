import pickle
import numpy as np
import pandas as pd
import warnings
warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")


# Load the model once during module import
with open("./models/heart_disease_rf_model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

def predict_heart_disease(input_data):
    """
    Predict if a patient has heart disease based on input parameters.

    Args:
    input_data (list): A list of patient parameters in the following order:
                       [age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal]

    Returns:
    str: Prediction result
    """
    # Convert input to DataFrame
    columns = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg',
               'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']
    input_df = pd.DataFrame([input_data], columns=columns)
    
    # Make prediction
    prediction = model.predict(input_df)
    return "The patient likely has heart disease." if prediction[0] == 1 else "The patient likely does not have heart disease."

