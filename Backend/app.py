from flask import Flask, request, jsonify
from flask_cors import CORS
from test import predict_heart_disease

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return 'Heart Disease Prediction API'

@app.route('/predict', methods=['POST'])

def predict():
    # Get JSON data from the request
    data = request.json
    
    # Ensure all required parameters are present
    required_fields = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg',
                       'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing one or more required fields'}), 400
    
    # Extract input data and predict
    input_data = [data[field] for field in required_fields]
    result = predict_heart_disease(input_data)
    
    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run()