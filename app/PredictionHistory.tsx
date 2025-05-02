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
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";

const PredictionHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [error, setError] = useState("");

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
        setError("No prediction history found");
      }
    } catch (error) {
      console.error("Error fetching prediction history:", error);
    }
  };

  return (
    <LinearGradient
      colors={["#e1ecf1", "#d2ebf7", "#d9eef9", "#e0f1f9", "#e6f2f8"]}
      locations={[0, 0.3, 0.6, 0.8, 0.88]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
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
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.cardTitle}>
                      {item.predictedDisease}
                    </Text>
                    <Text style={styles.cardSubtitle}>
                      {new Date(item.timestamp).toLocaleString()}
                    </Text>
                  </View>
                  <View style={{ height: 10 }} />

                  <View style={{ paddingLeft: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Text style={{ color: "black", fontWeight: "bold" }}>
                        {item.city}
                      </Text>
                      <LottieView
                        source={{
                          uri: "https://lottie.host/7025011a-4e71-4dd9-a761-75fd6f714cd2/uygGrEtl3h.json",
                        }}
                        autoPlay
                        loop
                        speed={0.5}
                        style={{ width: 25, height: 25 }}
                      />
                    </View>

                    <Text style={{ color: "black", fontWeight: "bold" }}>
                      Symptoms{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "black",
                        fontWeight: "condensedBold",
                        paddingLeft: 15,
                      }}
                    >
                      {item.selectedSymptoms.join(", ")}
                    </Text>
                    <View style={{ height: 6 }} />

                    <Text style={{ color: "black", fontWeight: "bold" }}>
                      Probabilities
                    </Text>
                    {Object.entries(item.probabilities).map(
                      ([disease, probability]) => (
                        <Text
                          key={disease}
                          style={{ fontSize: 14, color: "black", paddingLeft: 15}}
                        >
                          {disease}: {String(probability)}%
                        </Text>
                      )
                    )}
                  </View>
                </View>
              ))}
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContainer: {
    marginBottom: 20,
    backgroundColor: "transparent",
    paddingLeft: 10,
    paddingRight: 10,
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
    color: "red",
    padding: 20,
    fontSize: 18,
    alignSelf: "center",
  },
});

export default PredictionHistory;
