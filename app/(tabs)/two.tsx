import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "@/components/Themed";
import Checkbox from "expo-checkbox";
import axios from "axios";
import { ColorPalette } from "@/constants/Colors";
import { ref, push, get, child } from "firebase/database";
import { FIREBASE_Database } from "../../FirebaseConfig";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import LottieView from "lottie-react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const symptomsList = [
  "Vomiting",
  "Diarrhea",
  "Nausea",
  "Runnynose",
  "Stuffynose",
  "Difficultybreathing",
  "Shortnessofbreath",
  "Fever",
  "Chills",
  "Lossofsmell",
  "Lossoftaste",
  "Headache",
  "Muscleaches",
  "Cough",
  "Sourethroat",
  "Sneezing",
  "Tiredness",
];

export default function TabTwoScreen() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true); //This is to control the visibility of the 'Get Prediction' button
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<{
    predicted_disease: string;
    probabilities: Record<string, number>;
  } | null>(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (!user) {
        console.warn("No user logged in");
        return;
      }

      const userId = FIREBASE_AUTH.currentUser?.uid;
      const dbRef = ref(FIREBASE_Database);

      const snapshot1 = await get(child(dbRef, `users/${userId}`));
      const snapshot2 = await get(child(dbRef, `doctor/${userId}`));
      if (snapshot1.exists()) {
        const userData = snapshot1.val();

        setCity(userData.city || "");
      } else if (snapshot2.exists()) {
        const doctorData = snapshot2.val();

        setCity(doctorData.city || "");
      } else {
        setCity("Unknown");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSelectSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) => {
      if (prev.includes(symptom)) {
        return prev.filter((item) => item !== symptom);
      } else {
        return [...prev, symptom];
      }
    });
  };

  const handleClearSelection = () => {
    setSelectedSymptoms([]);
    setPrediction(null);
    setIsVisible(true);
  };

  const handleGetPrediction = async () => {
    if (selectedSymptoms.length === 0) {
      Alert.alert(
        "No symptoms selected",
        "Please select at least 4 symptom."
      );
      return;
    }

    if (selectedSymptoms.length < 4) {
      Alert.alert(
        "Please select at least 4 symptom.",
        "You need to select at least 4 symptoms to get a prediction."
      );
      return;
    }
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.post(
        "https://predict-639459962024.us-central1.run.app/predict",
        {
          symptoms: selectedSymptoms.map((s) =>
            s.toLowerCase().replace(/\s+/g, "")
          ),
        }
      );

      const predictionData = response.data as {
        predicted_disease: string;
        probabilities: Record<string, number>;
      };

      setPrediction(predictionData);
      setIsVisible(false);

      const user = FIREBASE_AUTH.currentUser;
      if (!user) return;

      // Get user's city from Firebase Database
      const userId = FIREBASE_AUTH.currentUser?.uid;

      // Save prediction data to Firebase Database
      const predictionRef = ref(FIREBASE_Database, `predictions/${userId}`);
      await push(predictionRef, {
        timestamp: new Date().toISOString(),
        selectedSymptoms,
        predictedDisease: predictionData.predicted_disease,
        probabilities: predictionData.probabilities,
        city,
      });

      console.log("Prediction stored successfully.");
    } catch (error) {
      console.error("Error getting prediction:", error);
      Alert.alert(
        "Error",
        "There was an issue fetching the prediction. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  //Test function to simulate prediction data. For testing purposes only.
  const test = () => {
    interface PredictionData {
      predicted_disease: string;
      probabilities: Record<string, number>;
    }

    const predictionData: PredictionData = {
      predicted_disease: "COLD",
      probabilities: {
        FLU: 78.5,
        COLD: 15.2,
        COVID: 6.3,
      },
    };

    setPrediction(predictionData);
    setIsVisible(false);
  };

  return (
    <LinearGradient
      colors={["#e6f2f8", "#d2ebf7", "#d9eef9", "#e0f1f9", "#f3f9fc"]}
      locations={[0, 0.3, 0.6, 0.8, 0.88]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "transparent",
            padding: 5,
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <Text style={styles.title}>Select Symptoms</Text>
        </View>
        <View style={{ height: 20, backgroundColor: "transparent" }} />
        <ScrollView style={styles.scrollContainer}>
          {symptomsList.map((symptom) => (
            <View key={symptom} style={styles.checkboxContainer}>
              <Checkbox
                value={selectedSymptoms.includes(symptom)}
                onValueChange={() => handleSelectSymptom(symptom)}
                color={
                  selectedSymptoms.includes(symptom) ? "#4630EB" : undefined
                }
              />
              <Text style={styles.checkboxLabel}>{symptom}</Text>
            </View>
          ))}
        </ScrollView>

        <Button title="Cear All" onPress={handleClearSelection} />
        <View style={styles.br} />
        {isVisible && (
          <Button
            title={loading ? "Loading..." : "Get Prediction"}
            onPress={handleGetPrediction}
            disabled={loading}
          />
        )}

        {prediction && (
          <View style={styles.predictionContainer}>
            <Text style={styles.predictionTitle}>Prediction Result</Text>
            <Text style={{ color: "black", paddingLeft: 10 }}>
              Predicted Disease:{" "}
              <Text style={{ color: "black", fontWeight: "bold" }}>
                {prediction.predicted_disease}
              </Text>
            </Text>
            <View style={{ height: 5, backgroundColor: "transparent" }} />
            <Text style={{ color: "black", paddingLeft: 10 }}>
              Probabilities
            </Text>
            <View
              style={{
                backgroundColor: "transparent",
                paddingTop: 6,
                paddingBottom: 10,
                paddingLeft: "30%",
              }}
            >
              {Object.entries(prediction.probabilities)
                .sort((a, b) => b[1] - a[1])
                .map(([disease, probability]) => (
                  <Text
                    style={{ color: "black", fontWeight: 500 }}
                    key={disease}
                  >
                    {disease}: {probability}%
                  </Text>
                ))}
            </View>
            <View style={{ height: 15, backgroundColor: "transparent" }} />
            <Link
              href={{
                pathname: "/MoreDetails",
                params: {
                  disease: prediction.predicted_disease,
                },
              }}
              asChild
            >
              <TouchableOpacity style={styles.itemContainer}>
                <LottieView
                  source={{
                    uri: "https://lottie.host/430405b9-5254-4002-a915-bb23bf7db3d3/ftffN9lVSV.json",
                  }}
                  autoPlay
                  loop
                  speed={0.5}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={styles.profileSubTitle}>Get More Details</Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  scrollContainer: {
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: "black",
  },
  predictionContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  predictionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
    alignSelf: "center",
  },
  br: {
    height: 4,
    backgroundColor: "transparent",
  },
  itemContainer: {
    backgroundColor: ColorPalette.blue2,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    margin: 0,
    borderRadius: 40,
    width: "80%",
  },
  profileSubTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
});
