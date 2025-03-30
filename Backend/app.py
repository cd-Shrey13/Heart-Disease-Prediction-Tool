from flask import  Flask, request, jsonify, make_response, send_file
from werkzeug.utils import secure_filename
import os
import numpy as np
import joblib
import pandas as pd
from fpdf import FPDF
from datetime import datetime

from flask_cors import CORS
app = Flask(__name__)

CORS(app)

# Load the trained model
model_path = os.path.join(os.path.dirname(__file__), "./model/heart_disease_model.pkl")
rf_model = joblib.load(model_path)


#checking
@app.route('/',methods=["GET"])
def printHello():
    result = {
        "success": True
    }
    return jsonify(result)


# Prediction endpoint
@app.route("/predict", methods=["POST"])
def predict():
    try:
        print(request)
        data = request.json

        # Convert input data to float where applicable, else assign 0.0
        for key in data.keys():
            data[key] = float(data[key]) if data[key] != "" else 0.0

        input_data = pd.DataFrame([data])

        # Make prediction
        prediction = rf_model.predict(input_data)[0]
        probability = rf_model.predict_proba(input_data)[0][1]

        # Get top 5 most important features (critical parameters)
        critical_params = get_critical_parameters(data)

        # Generate patient-specific graphs
        # graph_paths = generate_patient_graphs(data)

        # Generate personalized PDF report with critical params
        report_path = generate_pdf_report(data)

        # Construct result with critical params and report URL
        result = {
            "prediction": int(prediction),
            "probability": float(probability),
            "critical_params": critical_params,  
            # "graph_urls": graph_paths,
            "report_url": request.url_root + "pdf/" + os.path.basename(report_path),
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)})
    



PDF_FOLDER = './static/reports'

@app.route("/pdf/<string:filename>", methods=['GET'])
def return_pdf(filename):
    try:
        print(request)
        filename = secure_filename(filename)  # Sanitize the filename
        file_path = os.path.join(PDF_FOLDER, filename)
        if os.path.isfile(file_path):
            return send_file(file_path, as_attachment=True)
        else:
            return make_response(f"File '{filename}' not found.", 404)
    except Exception as e:
        return make_response(f"Error: {str(e)}", 500)




#function to find critical params
def get_critical_parameters(data):
    critical_params = {}

    # Define critical ranges 
    CRITICAL_RANGES = {
        "trestbps": (140, 200),  # High blood pressure
        "chol": (240, 600),      # High cholesterol
        "thalach": (50, 100),    # Low maximum heart rate
        "oldpeak": (2, 10),      # ST depression indicating risk
    }

    for key, value in data.items():
        # Check if parameter value is critical
        if key in CRITICAL_RANGES:
            lower, upper = CRITICAL_RANGES[key]
            if lower <= float(value) <= upper:
                critical_params[key] = value

    return critical_params



# Path to save generated PDFs
output_dir = os.path.join(os.path.dirname(__file__), "./static/reports")
os.makedirs(output_dir, exist_ok=True)


# Generate PDF Report with Patient Data
def generate_pdf_report(data):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=14)

    pdf.cell(200, 10, txt="Heart Disease Prediction Report", ln=True, align="C")
    pdf.ln(10)

    for key, value in data.items():
        pdf.cell(200, 10, txt=f"{key}: {value}", ln=True, align="L")
        

    # convert datetime obj to string
    str_current_datetime = str(datetime.now().strftime("%Y-%m-%d_%H-%M-%S"))
    file_name = "Heart_Disease_Report_" + str_current_datetime + ".pdf"

    # Save PDF with unique name
    pdf_path = os.path.join(output_dir, file_name)
    pdf.output(pdf_path)
    return pdf_path


if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)