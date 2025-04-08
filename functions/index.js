/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");
const path = require("path");
const { exec } = require("child_process");

admin.initializeApp();

// Function to download the model from Firebase Storage
const downloadModel = async (modelPath) => {
    const bucket = admin.storage().bucket();
    const tempFilePath = path.join('/tmp', 'hybrid_model.pkl'); // Temp path in Firebase environment

    // Download the model file
    await bucket.file(modelPath).download({ destination: tempFilePath });
    return tempFilePath;
};

// Firebase function to handle prediction
const fetch = require("node-fetch");

exports.predict = onRequest(async (req, res) => {
  try {
    const userSymptoms = req.body.symptoms;

    const pythonResponse = await fetch("https://predict-3emmmygoyq-uc.a.run.app/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms: userSymptoms }),
    });

    const data = await pythonResponse.json();

    res.status(200).send(data);
  } catch (error) {
    console.error("Error forwarding request:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

  
