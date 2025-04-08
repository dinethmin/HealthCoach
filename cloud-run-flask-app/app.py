from flask import Flask, request, jsonify
from predictor import predict_disease, load_models, download_model
import os

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        user_symptoms = request.json.get("symptoms")
        if not user_symptoms:
            return jsonify({"error": "Symptoms are required."}), 400

        # Download model files from Firebase Storage (optional if models are built into container)
        model_paths = {
            "hybrid_model": "models/hybrid_model.pkl",
            "svc_model": "models/svc_model.pkl",
            "nb_model": "models/nb_model.pkl",
            "rf_model": "models/rf_model.pkl",
            "feature_names": "models/feature_names.pkl"
        }
        local_paths = {
            name: f"/tmp/{name}.pkl" for name in model_paths
        }
        for name, gcs_path in model_paths.items():
            download_model(gcs_path, local_paths[name])

        models = load_models()
        predicted_disease, probabilities = predict_disease(user_symptoms, models)

        return jsonify({
            "predicted_disease": predicted_disease,
            "probabilities": probabilities
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
