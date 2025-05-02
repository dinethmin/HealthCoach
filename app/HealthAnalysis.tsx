import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { FIREBASE_AUTH, FIREBASE_Database } from "@/FirebaseConfig";
import { child, get, ref } from "firebase/database";
import { useEffect, useState, useRef } from "react";
import { ColorPalette } from "@/constants/Colors";
import { BarChart } from "react-native-chart-kit";
import { PieChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";

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
  const [diseaseSection, setDiseaseSection] = useState("FLU");
  const screenWidth = Dimensions.get("window").width;

  // Animations for Main Selection Sections
  const summaryAnim = useRef(
    new Animated.Value(activeSection === "summary" ? 1 : 0)
  ).current;
  const cityAnim = useRef(
    new Animated.Value(activeSection === "city" ? 1 : 0)
  ).current;
  const suggestionsAnim = useRef(
    new Animated.Value(activeSection === "suggestions" ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(summaryAnim, {
      toValue: activeSection === "summary" ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
    Animated.timing(cityAnim, {
      toValue: activeSection === "city" ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
    Animated.timing(suggestionsAnim, {
      toValue: activeSection === "suggestions" ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [activeSection]);

  // Animations for Disease Selection Sections (City-based Insights)
  const fluAnim = useRef(
    new Animated.Value(diseaseSection === "FLU" ? 1 : 0)
  ).current;
  const coldAnim = useRef(
    new Animated.Value(diseaseSection === "COLD" ? 1 : 0)
  ).current;
  const covidAnim = useRef(
    new Animated.Value(diseaseSection === "COVID" ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(fluAnim, {
      toValue: diseaseSection === "FLU" ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
    Animated.timing(coldAnim, {
      toValue: diseaseSection === "COLD" ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
    Animated.timing(covidAnim, {
      toValue: diseaseSection === "COVID" ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [diseaseSection]);

  // Fetch History Data
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

  const diseaseData = Object.entries(
    viewMode === "personal"
      ? userHistory.reduce((acc, item) => {
          acc[item.predictedDisease] = (acc[item.predictedDisease] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      : stats.diseases
  ).map(([disease, count], index) => ({
    name: disease,
    population: count,
    color: getRandomColor(index),
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  function getRandomColor(index: number) {
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#8BC34A", "#FF9800"];
    return colors[index % colors.length];
  }

  return (
    <LinearGradient
      colors={["#8dc7ef", "#76c0f1", "#b3ddf1", "#cdecf9", "#def0fa"]}
      locations={[0, 0.3, 0.6, 0.85, 1]}
      start={{ x: 1.2, y: 0.8 }}
      end={{ x: 0.5, y: 1.02 }}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "transparent" }}
        edges={["top", "left", "right"]}
      >
        <View style={styles.itemCardContainer}>
          <TouchableOpacity
            onPress={() => {
              setActiveSection("summary");
              setViewMode("personal");
            }}
          >
            <Animated.View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: summaryAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["transparent", "#2196F3"],
                }),
              }}
            >
              <Animated.Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: summaryAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["#2c3e50", "#fff"],
                  }),
                }}
              >
                Summary
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setActiveSection("city");
              setViewMode("global");
            }}
          >
            <Animated.View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: cityAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["transparent", "#2196F3"],
                }),
              }}
            >
              <Animated.Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: cityAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["#2c3e50", "#fff"],
                  }),
                }}
              >
                City-based Insights
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <View style={styles.itemCardContainer}>
          <TouchableOpacity onPress={() => setActiveSection("suggestions")}>
            <Animated.View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: suggestionsAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["transparent", "#2196F3"],
                }),
              }}
            >
              <Animated.Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: suggestionsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["#2c3e50", "#fff"],
                  }),
                }}
              >
                Personal Suggestions
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />
        <View style={{ backgroundColor: "transparent" }}>
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.40)",
              borderRadius: 20,
              margin: 10,
            }}
          >
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
                  <Text style={styles.topTitle}>
                    {viewMode === "personal"
                      ? "My Statistics"
                      : "Community Statistics"}
                  </Text>
                </View>
                <View style={styles.itemCardContainer}>
                  <TouchableOpacity
                    style={[
                      styles.itemContainer2,
                      {
                        backgroundColor:
                          viewMode === "personal"
                            ? "#2196F3"
                            : ColorPalette.lightBlue,
                      },
                    ]}
                    onPress={() => setViewMode("personal")}
                  >
                    <Text
                      style={{
                        color: viewMode === "personal" ? "#fff" : "#000",
                      }}
                    >
                      My Stats
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.itemContainer2,
                      {
                        backgroundColor:
                          viewMode === "global"
                            ? "#2196F3"
                            : ColorPalette.lightBlue,
                      },
                    ]}
                    onPress={() => setViewMode("global")}
                  >
                    <Text
                      style={{ color: viewMode === "global" ? "#fff" : "#000" }}
                    >
                      Community Stats
                    </Text>
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
                    <View style={{ backgroundColor: "transparent" }}>
                      <View
                        style={{
                          backgroundColor: "transparent",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            color: "black",
                            paddingTop: 20,
                          }}
                        >
                          My Total Predictions Count
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            color: "black",
                            paddingTop: 10,
                            paddingBottom: 20,
                            fontWeight: "bold",
                          }}
                        >
                          {userHistory.length}
                        </Text>
                      </View>

                      <PieChart
                        data={diseaseData}
                        width={screenWidth}
                        height={220}
                        chartConfig={{
                          backgroundColor: "transparent",
                          backgroundGradientFrom: "#fff",
                          backgroundGradientTo: "#fff",
                          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                      />
                    </View>
                  ) : (
                    <View style={{ backgroundColor: "transparent" }}>
                      <View
                        style={{
                          backgroundColor: "transparent",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            color: "black",
                            paddingTop: 20,
                          }}
                        >
                          Total Users Predictions count
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            color: "black",
                            paddingTop: 10,
                            paddingBottom: 20,
                            fontWeight: "bold",
                          }}
                        >
                          {stats.total}
                        </Text>
                      </View>

                      <PieChart
                        data={diseaseData}
                        width={screenWidth}
                        height={220}
                        chartConfig={{
                          backgroundColor: "transparent",
                          backgroundGradientFrom: "#fff",
                          backgroundGradientTo: "#fff",
                          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                      />
                    </View>
                  )}
                  {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>
              </ScrollView>
            )}
          </View>

          {activeSection === "city" && (
            <ScrollView
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.40)",
                borderRadius: 20,
                margin: 10,
              }}
              contentContainerStyle={{ padding: 10 }}
            >
              <View
                style={{
                  alignSelf: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 10,
                    color: "black",
                    alignSelf: "center",
                  }}
                >
                  City-based Insights
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingBottom: 10,
                    backgroundColor: "transparent",
                  }}
                >
                  <TouchableOpacity onPress={() => setDiseaseSection("FLU")}>
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
                  <TouchableOpacity onPress={() => setDiseaseSection("COLD")}>
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
                  <TouchableOpacity onPress={() => setDiseaseSection("COVID")}>
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
              </View>

              {Object.entries(diseaseCityStats)
                .filter(([disease]) => disease === diseaseSection)
                .map(([disease, cities]) => {
                  const cityNames = Object.keys(
                    cities as Record<string, number>
                  );
                  const cityCounts = Object.values(
                    cities as Record<string, number>
                  );

                  return (
                    <View style={styles.card} key={disease}>
                      <Text style={styles.cardTitle}>{disease}</Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <BarChart
                        data={{
                          labels: cityNames,
                          datasets: [{ data: cityCounts }],
                        }}
                        width={Math.max(screenWidth, cityNames.length * 80)}
                        height={220}
                        fromZero
                        yAxisLabel=""
                        yAxisSuffix=""
                        chartConfig={{
                          backgroundColor: "#ffffff",
                          backgroundGradientFrom: "#ffffff",
                          backgroundGradientTo: "#e6f2f8",
                          decimalPlaces: 0,
                          color: (opacity = 1) =>
                            `rgba(33, 150, 243, ${opacity})`, 
                          labelColor: (opacity = 1) =>
                            `rgba(0, 0, 0, ${opacity})`,
                          style: {
                            borderRadius: 16,
                          },
                          propsForBackgroundLines: {
                            strokeDasharray: "", 
                          },
                          propsForLabels: {
                            fontSize: 10,
                          },
                        }}
                        style={{
                          marginVertical: 8,
                          borderRadius: 16,
                        }}
                      />
                      </ScrollView>

                      {Object.entries(cities as Record<string, number>)
                        .sort(([, aCount], [, bCount]) => bCount - aCount)
                        .map(([city, count]) => (
                          <View style={styles.cityRow} key={city}>
                            <Text style={styles.cityName}>{city}</Text>
                            <Text style={styles.cityCount}>({count})</Text>
                          </View>
                        ))}
                    </View>
                  );
                })}

              {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
                  You're doing great! Stay hydrated and maintain good hygiene.
                  👍
                </Text>
              )}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
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
    marginBottom: 120,
    backgroundColor: "transparent",
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  topTitle: {
    fontSize: 20,
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
  itemContainer2: {
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
  card: {
    backgroundColor: "#f5f5f5",
    marginVertical: 10,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  cityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: "transparent",
  },
  cityName: { fontSize: 16, color: "#555" },
  cityCount: { fontSize: 12, color: "#888", marginRight: 5 },
});

export default HealthAnalysis;
