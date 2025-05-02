import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { get, ref, child } from "firebase/database";
import { FIREBASE_Database } from "../FirebaseConfig";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";

const PredictionHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("flu");

  const fluAnim = useRef(
    new Animated.Value(activeSection === "flu" ? 1 : 0)
  ).current;
  const coldAnim = useRef(
    new Animated.Value(activeSection === "cold" ? 1 : 0)
  ).current;
  const covidAnim = useRef(
    new Animated.Value(activeSection === "covid" ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(fluAnim, {
      toValue: activeSection === "flu" ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
    Animated.timing(coldAnim, {
      toValue: activeSection === "cold" ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
    Animated.timing(covidAnim, {
      toValue: activeSection === "covid" ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [activeSection]);

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

  const filteredHistory = history.filter(
    (item) => item.predictedDisease.toLowerCase() === activeSection
  );

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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 10,
              }}
            >
              <TouchableOpacity onPress={() => setActiveSection("flu")}>
                <Animated.View
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    backgroundColor: fluAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["transparent", "#2196F3"],
                    }),
                  }}
                >
                  <Animated.Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: fluAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["#2c3e50", "#fff"],
                      }),
                    }}
                  >
                    FLU
                  </Animated.Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveSection("cold")}>
                <Animated.View
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    backgroundColor: coldAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["transparent", "#2196F3"],
                    }),
                  }}
                >
                  <Animated.Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: coldAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["#2c3e50", "#fff"],
                      }),
                    }}
                  >
                    COLD
                  </Animated.Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveSection("covid")}>
                <Animated.View
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    backgroundColor: covidAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["transparent", "#2196F3"],
                    }),
                  }}
                >
                  <Animated.Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: covidAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["#2c3e50", "#fff"],
                      }),
                    }}
                  >
                    COVID
                  </Animated.Text>
                </Animated.View>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollContainer}>
              {filteredHistory.length === 0 ? (
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "20%",
                    justifyContent: "center",
                    padding: 20,
                  }}
                >
                  <LottieView
                    source={{
                      uri: "https://lottie.host/2ca57a47-5e9d-4b1b-8899-38eaee5c6170/xCUCQvSMVm.json",
                    }}
                    autoPlay
                    loop
                    speed={0.5}
                    style={{ width: 120, height: 120 }}
                  />
                  <View style={{ height: 30 }} />
                  <Text style={{ fontSize: 16, color: "#555" }}>
                    No data available for {activeSection.toUpperCase()}
                  </Text>
                </View>
              ) : (
                filteredHistory.map((item) => (
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
                            style={{
                              fontSize: 14,
                              color: "black",
                              paddingLeft: 15,
                            }}
                          >
                            {disease}: {String(probability)}%
                          </Text>
                        )
                      )}
                    </View>
                  </View>
                ))
              )}
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
