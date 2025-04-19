import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { get, ref, child } from "firebase/database";
import { FIREBASE_Database } from "../FirebaseConfig";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { ColorPalette } from "@/constants/Colors";

const PredictionHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      Alert.alert("No user logged in");
      return;
    }

    const userId = user.uid;
    const dbRef = ref(FIREBASE_Database);

    try {
      const snapshot = await get(child(dbRef, `predictions/${userId}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const predictionsArray = Object.entries(data).map(
          ([key, value]: any) => ({
            id: key,
            ...value,
          })
        );

        // Sort by newest
        predictionsArray.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setHistory(predictionsArray);
      } else {
        setError('No prediction history found');
      }
    } catch (error) {
      console.error("Error fetching prediction history:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={1}
      >
        <View style={{ flex: 1, padding: 15 }}>
          <Text style={styles.topTitle}>Prediction History</Text>
          <ScrollView style={styles.scrollContainer}>
            {history.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardTitle}>{item.predictedDisease}</Text>
                <Text style={styles.cardSubtitle}>
                  {new Date(item.timestamp).toLocaleString()}
                </Text>
                <Text style={{ color: "black" }}>City: {item.city}</Text>
                <Text style={{ color: "black" }}>
                  Symptoms: {item.selectedSymptoms.join(", ")}
                </Text>
                <Text style={{ color: "black" }}>Probabilities:</Text>
                {Object.entries(item.probabilities).map(
                  ([disease, probability]) => (
                    <Text key={disease} style={{ color: "black" }}>
                      • {disease}: {String(probability)}%
                    </Text>
                  )
                )}
              </View>
            ))}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    marginBottom: 20,
    backgroundColor: ColorPalette.light,
  },
  topTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    padding: 20,
    fontSize: 18,
    alignSelf: "center",
  },
});

export default PredictionHistory;
