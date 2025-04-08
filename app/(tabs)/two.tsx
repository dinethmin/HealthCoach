import React, { useState } from "react";
import { Button, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import { Text, View } from "@/components/Themed";
import Checkbox from "expo-checkbox";
import axios from "axios";
import { ColorPalette } from "@/constants/Colors";

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
  const [prediction, setPrediction] = useState<{
    predicted_disease: string;
    probabilities: Record<string, number>;
  } | null>(null);

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
  };

  const handleGetPrediction = async () => {
    if (selectedSymptoms.length === 0) {
      Alert.alert(
        "No symptoms selected",
        "Please select at least one symptom."
      );
      return;
    }

    try {
      const response = await axios.post("https://cloud-run-flask-app-126871223994.us-central1.run.app/predict",
        { symptoms: selectedSymptoms.map(s => s.toLowerCase().replace(/\s+/g, "")) }
      );
      
      setPrediction(response.data as { predicted_disease: string; probabilities: Record<string, number> });
    } catch (error) {
      console.error("Error getting prediction:", error);
      Alert.alert(
        "Error",
        "There was an issue fetching the prediction. Please try again later."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Symptoms</Text>
      <ScrollView style={styles.scrollContainer}>
        {symptomsList.map((symptom) => (
          <View key={symptom} style={styles.checkboxContainer}>
            <Checkbox
              value={selectedSymptoms.includes(symptom)}
              onValueChange={() => handleSelectSymptom(symptom)}
              color={selectedSymptoms.includes(symptom) ? "#4630EB" : undefined}
            />
            <Text style={styles.checkboxLabel}>{symptom}</Text>
          </View>
        ))}
      </ScrollView>

      <Button title="Clear All" onPress={handleClearSelection} />
      <Button title="Get Prediction" onPress={handleGetPrediction} />

      {prediction && (
        <View style={styles.predictionContainer}>
          <Text style={styles.predictionTitle}>Prediction Result</Text>
          <Text style={{color: "black",}}>Predicted Disease: {prediction.predicted_disease}</Text>
          <Text style={{color: "black",}}>Probabilities:</Text>
          {Object.entries(prediction.probabilities).map(
            ([disease, probability]) => (
              <Text style={{color: "black",}} key={disease}>
                {disease}: {probability}%
              </Text>
            )
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  scrollContainer: {
    marginBottom: 20,
    backgroundColor: ColorPalette.light,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: ColorPalette.light,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color:'black',
  },
  predictionContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    
  },
  predictionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
});
