# 🩺 Health Coach – Intelligent Mobile Health Assistant

Health Coach is a cross-platform mobile application built with **React Native (Expo)** that empowers users to monitor their health, get smart disease predictions, and receive personal health advice based on their vitals and symptoms.


## 🚀 Features

- ✅ **Symptom-Based Disease Prediction**
  - Hybrid ML model using SVC, Random Forest & Naive Bayes
  - Deployed with Firebase and Google Cloud Functions

- 🧠 **Personal Suggestions**
  - Analyze blood pressure, sugar, BMI, heart rate, sleep, and more
  - Give real-time, actionable health tips

- 🧾 **Prediction History**
  - View past prediction results filtered by date, disease, or city

- 🧾 **Health Analysis**
  - Analyze past prediction results and provide health analysis
  - Give Summary, City-based Insights

- 💬 **Doctor Chatroom (Prototype)**
  - Browse doctor conversations (basic chat UI using GiftedChat)

- 👤 **User Profile**
  - Add profile image, city, and medical history


## 🧰 Tech Stack

| Tech                  | Description                                  |
| --------------------- | -------------------------------------------- |
| Expo / React Native   | Cross-platform mobile app development        |
| Firebase              | Auth, Firestore DB, Cloud Functions, Storage |
| Python (Scikit-learn) | Disease prediction model (.pkl)              |
| Flask + Cloud Run     | ML API for symptom predictions               |
| Gifted Chat           | Simple, elegant chat UI                      |


## 🛠 Installation

1. **Clone the repository**

bash
git clone https://github.com/your-username/health-coach-app.git
cd health-coach-app

2. **Install dependencies**

npm install

3. **Install Expo App**

Go to Play Store (For Android) / Go to App Store (For iOS)
Install Expo Go

4. **Start the app**

Run "npx expo start" in the VS Code Terminal.
Using Expo Go app in your mobile, scan the provided QR code that is generated from
the Expo development server or enter the Expo project URL that appears in your
terminal.

5. **Configure Firebase**

Add your firebaseConfig in firebaseConfig.ts
Setup Firestore, Authentication, Storage


## 🧠 ML Model

- The disease prediction model is trained using a hybrid approach combining:

    - Support Vector Classifier (SVC)
    - Naive Bayes Classifier
    - Random Forest Classifier
  - The final result is based on a weighted consensus of predictions.

## 🌍 Future Features

- Real-time chat with doctors via Firebase
- Reminder notifications
- Integration with wearable devices (Fitbit, Apple Watch)
- Localization and language support
- Telemedicine and Doctor Integration
- Offline Mode Support
