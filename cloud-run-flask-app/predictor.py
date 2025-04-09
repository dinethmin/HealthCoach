import joblib
import pandas as pd
from collections import Counter
import firebase_admin
from firebase_admin import storage
import os
import sys
import json
import firebase_admin
from firebase_admin import credentials, storage

# Initialize Firebase Admin SDK with your credentials and specify the storage bucket
if not firebase_admin._apps:
    cred = credentials.ApplicationDefault() 
    firebase_admin.initialize_app(cred, {
        'storageBucket': 'healthcoach-64321.firebasestorage.app' 
    })

# Download model from Firebase Storage
def download_model(model_path, local_path):
    bucket = storage.bucket()
    blob = bucket.blob(model_path)
    blob.download_to_filename(local_path)

# Load models from the local path
def load_models():
    hybrid_model = joblib.load('/tmp/hybrid_model.pkl')
    svc_model = joblib.load('/tmp/svc_model.pkl')
    nb_model = joblib.load('/tmp/nb_model.pkl')
    rf_model = joblib.load('/tmp/rf_model.pkl')
    feature_names = joblib.load('/tmp/feature_names.pkl')
    return hybrid_model, svc_model, nb_model, rf_model, feature_names

SYMPTOMS = ['runnynose', 'vomiting', 'stuffynose', 'diarrhea', 'nausea',
            'difficultybreathing', 'shortnessofbreath', 'fever', 'chills',
            'lossofsmell', 'lossoftaste', 'headache', 'muscleaches', 'Cough',
            'sourethroat', 'sneezing', 'tiredness']

def predict_disease(user_symptoms, models):
    hybrid_model, svc_model, nb_model, rf_model, feature_names = models

    input_vector = pd.DataFrame([[1 if symptom in user_symptoms else 0 for symptom in SYMPTOMS]], columns=SYMPTOMS)
    input_vector = input_vector[feature_names]

    prediction1 = hybrid_model.predict(input_vector)[0]
    prediction2 = svc_model.predict(input_vector)[0]
    prediction3 = nb_model.predict(input_vector)[0]
    prediction4 = rf_model.predict(input_vector)[0]

    predictions = [prediction1, prediction2, prediction3, prediction4]
    most_common_prediction = Counter(predictions).most_common(1)[0][0]

    hybrid_probs = hybrid_model.predict_proba(input_vector)
    prob_dict = {disease: round(prob * 100, 2) for disease, prob in zip(hybrid_model.classes_, hybrid_probs[0])}

    return most_common_prediction, prob_dict

if __name__ == "__main__":
    try:
        # Get the input symptoms from command line
        symptoms_input = sys.argv[1]
        user_symptoms = json.loads(symptoms_input)

        # Download models from Firebase Storage
        download_model('models/hybrid_model.pkl', '/tmp/hybrid_model.pkl')
        download_model('models/svc_model.pkl', '/tmp/svc_model.pkl')
        download_model('models/nb_model.pkl', '/tmp/nb_model.pkl')
        download_model('models/rf_model.pkl', '/tmp/rf_model.pkl')
        download_model('models/feature_names.pkl', '/tmp/feature_names.pkl')

        models = load_models()
        predicted_disease, probabilities = predict_disease(user_symptoms, models)

        result = {
            "predicted_disease": predicted_disease,
            "probabilities": probabilities
        }

        print(json.dumps(result))  # stdout for Node.js to parse

    except Exception as e:
        print(json.dumps({"error": str(e)}))
