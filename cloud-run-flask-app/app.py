from flask import Flask, request, jsonify
from predictor import predict_disease, load_models
import joblib
import firebase_admin
from firebase_admin import storage
import os

app = Flask(__name__)

# Initialize Firebase
if not firebase_admin._apps:
    firebase_admin.initialize_app()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        user_symptoms = data.get("symptoms")

        if not user_symptoms:
            return jsonify({"error": "Symptoms are required."}), 400

        # Download models from Firebase Storage
        def download_model(model_path, local_path):
            bucket = storage.bucket()
            blob = bucket.blob(model_path)
            blob.download_to_filename(local_path)

        download_model('models/hybrid_model.pkl', '/tmp/hybrid_model.pkl')
        download_model('models/svc_model.pkl', '/tmp/svc_model.pkl')
        download_model('models/nb_model.pkl', '/tmp/nb_model.pkl')
        download_model('models/rf_model.pkl', '/tmp/rf_model.pkl')
        download_model('models/feature_names.pkl', '/tmp/feature_names.pkl')

        models = load_models()
        predicted_disease, probabilities = predict_disease(user_symptoms, models)

        return jsonify({
            "predicted_disease": predicted_disease,
            "probabilities": probabilities
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Needed for Cloud Run
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
