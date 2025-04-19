import { Alert, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { FIREBASE_AUTH, FIREBASE_Database } from "@/FirebaseConfig";
import { child, get, ref } from "firebase/database";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useFocusEffect } from "expo-router";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ColorPalette } from "@/constants/Colors";

const HealthAnalysis = () => {
  const [error, setError] = useState("");
  const [userHistory, setUserHistory] = useState<any[]>([]);
  const [globalHistory, setGlobalHistory] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    diseases: {},
    cities: {},
  });
  const [activeSection, setActiveSection] = useState("summary");
  const [viewMode, setViewMode] = useState<"personal" | "global">("personal");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      Alert.alert("No user logged in");
      return;
    }

    const currentUserId = user.uid;
    const dbRef = ref(FIREBASE_Database);

    try {
      const snapshot = await get(child(dbRef, "predictions"));
      if (snapshot.exists()) {
        const data = snapshot.val();

        const allPredictions: any[] = [];
        const currentUserPredictions: any[] = [];

        Object.entries(data).forEach(([userId, userPredictions]: any) => {
          Object.entries(userPredictions).forEach(([key, value]: any) => {
            const prediction = {
              id: key,
              userId,
              ...value,
            };

            allPredictions.push(prediction);
            if (userId === currentUserId) {
              currentUserPredictions.push(prediction);
            }
          });
        });

        // Sort newest first
        allPredictions.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        currentUserPredictions.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        setGlobalHistory(allPredictions);
        setUserHistory(currentUserPredictions);

        // Calculate stats from global history
        const diseaseCounts: { [key: string]: number } = {};
        const cityCounts: { [key: string]: number } = {};

        allPredictions.forEach((item) => {
          const disease = item.predictedDisease;
          const city = item.city;

          if (disease)
            diseaseCounts[disease] = (diseaseCounts[disease] || 0) + 1;
          if (city) cityCounts[city] = (cityCounts[city] || 0) + 1;
        });

        setStats({
          total: allPredictions.length,
          diseases: diseaseCounts,
          cities: cityCounts,
        });
      } else {
        setError("No prediction data found");
      }
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  const selectedHistory = viewMode === "personal" ? userHistory : globalHistory;

  const diseaseCityStats = selectedHistory.reduce(
    (
      acc: { [x: string]: { [x: string]: any } },
      item: {
        city: string;
        predictedDisease: string;
        userCity: string;
      }
    ) => {
      const disease = item.predictedDisease || "Unknown";
      const city = item.city || item.userCity || "Unknown";

      if (!acc[disease]) {
        acc[disease] = {};
      }

      acc[disease][city] = (acc[disease][city] || 0) + 1;

      return acc;
    },
    {} as Record<string, Record<string, number>>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "left", "right"]}
    >
      <View style={styles.itemCardContainer}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => setActiveSection("summary")}
        >
          <Text style={styles.profileSubTitle}>Summary Statistics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => setActiveSection("city")}
        >
          <Text style={styles.profileSubTitle}>City-based Insights</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <View style={styles.itemCardContainer}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => setActiveSection("suggestions")}
        >
          <Text style={styles.profileSubTitle}>Personal Suggestions</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />
      <View style={{ backgroundColor: ColorPalette.greyLight2 }}>
        {activeSection === "summary" && (
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{ padding: 10 }}
          >
            <View
              style={{
                backgroundColor: "transparent",
                alignSelf: "center",
                padding: 10,
              }}
            >
              <Text style={styles.subTitle}>
                {viewMode === "personal"
                  ? "My Statistics"
                  : "Community Statistics"}
              </Text>
            </View>
            <View style={styles.itemCardContainer}>
              <TouchableOpacity
                style={styles.itemContainer2}
                onPress={() => setViewMode("personal")}
              >
                <Text style={styles.profileSubTitle}>My Stats</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.itemContainer2}
                onPress={() => setViewMode("global")}
              >
                <Text style={styles.profileSubTitle}>Community Stats</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "transparent",
                alignSelf: "center",
                paddingTop: 20,
              }}
            >
              {viewMode === "personal" ? (
                <Text style={{ fontSize: 18, color: "black", paddingTop: 20 }}>
                  My Total Predictions Count:{" "}
                  <Text
                    style={{
                      fontSize: 18,
                      color: "black",
                      paddingTop: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {userHistory.length}
                  </Text>
                </Text>
              ) : (
                <Text style={{ fontSize: 18, color: "black", paddingTop: 20 }}>
                  Total Users Predictions count:{" "}
                  <Text
                    style={{
                      fontSize: 18,
                      color: "black",
                      paddingTop: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {stats.total}
                  </Text>
                </Text>
              )}
              <Text style={{ fontSize: 18, color: "black", paddingTop: 20 }}>
                Disease Breakdown
              </Text>
              {Object.entries(
                viewMode === "personal"
                  ? userHistory.reduce((acc, item) => {
                      acc[item.predictedDisease] =
                        (acc[item.predictedDisease] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  : stats.diseases
              ).map(([disease, count]) => (
                <Text style={styles.topTitle} key={disease}>
                  {disease}: {count as number}
                </Text>
              ))}
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
          </ScrollView>
        )}

        {activeSection === "city" && (
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{ padding: 10 }}
          >
            <View
              style={{
                backgroundColor: "transparent",
                alignSelf: "center",
                padding: 10,
              }}
            >
              <Text style={styles.subTitle}>
                {viewMode === "personal"
                  ? "My Statistics"
                  : "Community Statistics"}
              </Text>
            </View>
            <View style={styles.itemCardContainer}>
              <TouchableOpacity
                style={styles.itemContainer2}
                onPress={() => setViewMode("personal")}
              >
                <Text style={styles.profileSubTitle}>My Stats</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.itemContainer2}
                onPress={() => setViewMode("global")}
              >
                <Text style={styles.profileSubTitle}>Community Stats</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "transparent",
                alignSelf: "center",
                paddingTop: 20,
              }}
            >
              <Text style={{ fontSize: 25, color: "black" }}>
                City-based Insights
              </Text>
              {Object.entries(diseaseCityStats).map(([disease, cities]) => (
                <View
                  style={{
                    backgroundColor: "transparent",
                    alignSelf: "center",
                    paddingTop: 20,
                  }}
                  key={disease}
                >
                  <Text style={[styles.topTitle, { marginTop: 10 }]}>
                    {disease}
                  </Text>
                  {Object.entries(cities as Record<string, number>)
                    .sort(([, aCount], [, bCount]) => bCount - aCount)
                    .map(([city, count]) => (
                      <Text style={styles.topTitle} key={city}>
                        - {city}: {count}
                      </Text>
                    ))}
                </View>
              ))}
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
          </ScrollView>
        )}

        {activeSection === "suggestions" && (
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{ padding: 10 }}
          >
            <Text style={styles.topTitle}>📋 Personal Suggestions</Text>
            {stats.total > 10 ? (
              <Text style={styles.topTitle}>
                Consider visiting a medical professional. You’ve had{" "}
                {stats.total} predictions.
              </Text>
            ) : (
              <Text style={styles.topTitle}>
                You're doing great! Stay hydrated and maintain good hygiene. 👍
              </Text>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 6,
    backgroundColor: "transparent",
  },
  container: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "column",
    width: "80%",
  },
  scrollContainer: {
    marginBottom: 20,
    backgroundColor: "transparent",
    height: "100%",
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  topTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  profileSubTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  itemCardContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 6,
    margin: 0,
  },
  itemContainer: {
    backgroundColor: ColorPalette.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 18,
    paddingTop: 18,
    margin: 0,
    borderRadius: 10,
    width: "45%",
  },
  itemContainer2: {
    backgroundColor: ColorPalette.lightBlue,
    width: "40%",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 8,
    margin: 0,
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    padding: 20,
    fontSize: 18,
    alignSelf: "center",
  },
});

export default HealthAnalysis;
