import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  TextInput,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { FIREBASE_AUTH, FIREBASE_Database } from "@/FirebaseConfig";
import { child, get, ref } from "firebase/database";
import React, { useEffect, useState, useRef } from "react";
import { ColorPalette } from "@/constants/Colors";
import { BarChart } from "react-native-chart-kit";
import { PieChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";

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
  const [suggestionsSection, setSuggestionsSection] = useState("blood");
  const screenWidth = Dimensions.get("window").width;

  // health data for suggestions
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [sugar, setSugar] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [sleep, setSleep] = useState("");

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

  // Animations for Disease Selection Sections (Personal Suggestions)
  const bloodPAnim = useRef(
    new Animated.Value(suggestionsSection === "blood" ? 1 : 0)
  ).current;
  const sugerAnim = useRef(
    new Animated.Value(suggestionsSection === "suger" ? 1 : 0)
  ).current;
  const bmiAnim = useRef(
    new Animated.Value(suggestionsSection === "bmi" ? 1 : 0)
  ).current;
  const heartRAnim = useRef(
    new Animated.Value(suggestionsSection === "heart" ? 1 : 0)
  ).current;
  const sleepAnim = useRef(
    new Animated.Value(suggestionsSection === "sleep" ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(bloodPAnim, {
      toValue: suggestionsSection === "blood" ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
    Animated.timing(sugerAnim, {
      toValue: suggestionsSection === "suger" ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
    Animated.timing(bmiAnim, {
      toValue: suggestionsSection === "bmi" ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
    Animated.timing(heartRAnim, {
      toValue: suggestionsSection === "heart" ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
    Animated.timing(sleepAnim, {
      toValue: suggestionsSection === "sleep" ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [suggestionsSection]);

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

  // Suggestions
  // Calculate BMI
  const calcBMI = () => {
    const h = parseFloat(height) / 100; // convert to meters
    const w = parseFloat(weight);
    if (!h || !w) return null;
    return parseFloat((w / (h * h)).toFixed(1));
  };

  const bmi = calcBMI();

  const suggestions = {
    bloodPressure: null as string | null,
    sugar: null as string | null,
    bmi: null as string | null,
    heartRate: null as string | null,
    sleep: null as string | null,
  };

  // Blood Pressure
  if (systolic && diastolic) {
    const sys = parseInt(systolic);
    const dia = parseInt(diastolic);
    if (sys >= 180 && dia >= 120) {
      suggestions.bloodPressure = "HYPERTENSIVE CRISIS";
    } else if (sys >= 140 || dia >= 90) {
      suggestions.bloodPressure = "HIGH BLOOD PRESSURE HYPERTENSION STAGE 2";
    } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
      suggestions.bloodPressure = "HIGH BLOOD PRESSURE HYPERTENSION STAGE 1";
    } else if (sys >= 120 && sys <= 129 && dia < 80 && dia > 60) {
      suggestions.bloodPressure =
        "ELEVATED BLOOD PRESSURE. Stay hydrated, consult doctor.";
    } else if (sys >= 90 && sys < 120 && dia <= 80 && dia > 60) {
      suggestions.bloodPressure = "Blood pressure is normal.";
    } else if (sys < 90 || dia < 60) {
      suggestions.bloodPressure = "Low BP. Stay hydrated, consult doctor.";
    } else {
      suggestions.bloodPressure = "Error in BP values.";
    }
  }

  // Sugar
  if (sugar) {
    const s = parseFloat(sugar);
    if (s < 70) {
      suggestions.sugar =
        "LOW BLOOD SUGAR. Eat something and consult your doctor.";
    } else if (s >= 70 && s <= 99) {
      suggestions.sugar = "Blood sugar is normal.";
    } else if (s >= 100 && s <= 125) {
      suggestions.sugar = "PREDIABETES Monitor and adjust lifestyle.";
    } else if (s >= 126) {
      suggestions.sugar = "HIGH BLOOD SUGAR";
    } else {
      suggestions.sugar = "Unable to evaluate sugar levels. Check input.";
    }
  }

  // BMI
  if (bmi) {
    if (bmi < 18.5) {
      suggestions.bmi = "Underweight. Balanced diet can help gain weight.";
    } else if (bmi >= 25) {
      suggestions.bmi = "Overweight. Exercise and mindful eating suggested.";
    } else {
      suggestions.bmi = "BMI is in a healthy range.";
    }
  }

  // Heart rate
  if (heartRate) {
    const hr = parseInt(heartRate);
    if (hr < 60) {
      suggestions.heartRate =
        "LOW HEART RATE. Normal for athletes, otherwise consult a doctor.";
    } else if (hr >= 60 && hr <= 100) {
      suggestions.heartRate = "Heart rate is NORMAL.";
    } else if (hr > 100) {
      suggestions.heartRate =
        "HIGH HEART RATE. Relax and consult a doctor if persistent.";
    } else {
      suggestions.heartRate = "Unable to evaluate heart rate. Check input.";
    }
  }

  // Sleep
  if (sleep) {
    const sl = parseFloat(sleep);
    if (sl < 6) {
      suggestions.sleep = "INSUFFICIENT SLEEP. Aim for 7–9 hours nightly.";
    } else if (sl >= 6 && sl <= 9) {
      suggestions.sleep = "Sleep duration is HEALTHY.";
    } else if (sl > 9) {
      suggestions.sleep =
        "EXCESSIVE SLEEP. Could be a sign of fatigue or other issues.";
    } else {
      suggestions.sleep = "Unable to evaluate sleep. Check input.";
    }
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
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                      >
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
            <View style={{ backgroundColor: "transparent" }}>
              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingBottom: 10,
                  paddingTop: 10,
                  paddingHorizontal: 15,
                  borderRadius: 20,
                  backgroundColor: "rgba(255, 255, 255, 0.40)",
                  alignItems: "center",
                  marginHorizontal: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => setSuggestionsSection("blood")}
                >
                  <Animated.View
                    style={{
                      paddingVertical: 2,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      backgroundColor: bloodPAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["transparent", "#2196F3"],
                      }),
                    }}
                  >
                    <Animated.Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: bloodPAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["#2c3e50", "#fff"],
                        }),
                      }}
                    >
                      Blood Pressure
                    </Animated.Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSuggestionsSection("suger")}
                >
                  <Animated.View
                    style={{
                      paddingVertical: 2,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      backgroundColor: sugerAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["transparent", "#2196F3"],
                      }),
                    }}
                  >
                    <Animated.Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: sugerAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["#2c3e50", "#fff"],
                        }),
                      }}
                    >
                      Blood Sugar
                    </Animated.Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSuggestionsSection("bmi")}>
                  <Animated.View
                    style={{
                      paddingVertical: 2,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      backgroundColor: bmiAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["transparent", "#2196F3"],
                      }),
                    }}
                  >
                    <Animated.Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: bmiAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["#2c3e50", "#fff"],
                        }),
                      }}
                    >
                      BMI
                    </Animated.Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSuggestionsSection("heart")}
                >
                  <Animated.View
                    style={{
                      paddingVertical: 2,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      backgroundColor: heartRAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["transparent", "#2196F3"],
                      }),
                    }}
                  >
                    <Animated.Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: heartRAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["#2c3e50", "#fff"],
                        }),
                      }}
                    >
                      Heart Rate
                    </Animated.Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSuggestionsSection("sleep")}
                >
                  <Animated.View
                    style={{
                      paddingVertical: 2,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      backgroundColor: sleepAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["transparent", "#2196F3"],
                      }),
                    }}
                  >
                    <Animated.Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: sleepAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["#2c3e50", "#fff"],
                        }),
                      }}
                    >
                      Sleep
                    </Animated.Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.container}>
                <Text style={styles.title}>Enter Your Health Data</Text>
                {suggestionsSection === "blood" && (
                  <>
                    <Input
                      label="Systolic BP (mmHg)"
                      value={systolic}
                      onChange={setSystolic}
                    />
                    <Input
                      label="Diastolic BP (mmHg)"
                      value={diastolic}
                      onChange={setDiastolic}
                    />
                    <Text style={styles.subTitle}>Suggestions</Text>
                    {suggestions.bloodPressure !== null && (
                      <Card style={styles.card1}>
                        <Card.Content>
                          {suggestions.bloodPressure ===
                          "HYPERTENSIVE CRISIS" ? (
                            <View
                              style={{
                                backgroundColor: "transparent",
                                margin: 0,
                                padding: 0,
                              }}
                            >
                              <Text
                                style={{
                                  color: "#ae0000",
                                  fontWeight: "bold",
                                  alignSelf: "center",
                                  fontSize: 18,
                                  paddingBottom: 10,
                                }}
                              >
                                {suggestions.bloodPressure}
                              </Text>
                              <View
                                style={{
                                  padding: 5,
                                  backgroundColor: "transparent",
                                }}
                              >
                                <Text
                                  style={{
                                    paddingBottom: 10,
                                  }}
                                >
                                  <Entypo
                                    name="dot-single"
                                    size={20}
                                    color="black"
                                  />
                                  Wait five minutes after your first reading.
                                </Text>
                                <Text
                                  style={{
                                    paddingBottom: 10,
                                  }}
                                >
                                  <Entypo
                                    name="dot-single"
                                    size={20}
                                    color="black"
                                  />
                                  Take your blood pressure again.
                                </Text>
                                <Text>
                                  If your readings are still unusually high,{" "}
                                  <Text
                                    style={{
                                      fontWeight: "bold",
                                      color: "#af2727",
                                    }}
                                  >
                                    contact your health care professional
                                    immediately.
                                  </Text>
                                </Text>
                              </View>
                            </View>
                          ) : null}

                          {suggestions.bloodPressure ===
                          "HIGH BLOOD PRESSURE HYPERTENSION STAGE 2" ? (
                            <View
                              style={{
                                backgroundColor: "transparent",
                                margin: 0,
                                padding: 0,
                              }}
                            >
                              <Text
                                style={{
                                  color: "#ae0000",
                                  fontWeight: "bold",
                                  alignSelf: "center",
                                  fontSize: 18,
                                  paddingBottom: 10,
                                }}
                              >
                                {suggestions.bloodPressure}
                              </Text>
                              <View
                                style={{
                                  padding: 5,
                                  backgroundColor: "transparent",
                                }}
                              >
                                <Text
                                  style={{
                                    paddingBottom: 10,
                                  }}
                                >
                                  <Entypo
                                    name="dot-single"
                                    size={20}
                                    color="black"
                                  />
                                  You need medical attention,{" "}
                                  <Text
                                    style={{
                                      fontWeight: "bold",
                                    }}
                                  >
                                    contact your health care professional.
                                  </Text>
                                </Text>
                                <Text style={{ textAlign: "justify" }}>
                                  Your health care professional should prescribe
                                  blood pressure medication and healthy
                                  lifestyle changes.
                                </Text>
                              </View>
                            </View>
                          ) : null}

                          {suggestions.bloodPressure ===
                          "HIGH BLOOD PRESSURE HYPERTENSION STAGE 1" ? (
                            <View
                              style={{
                                backgroundColor: "transparent",
                                margin: 0,
                                padding: 0,
                              }}
                            >
                              <Text
                                style={{
                                  color: "#ae0000",
                                  fontWeight: "bold",
                                  alignSelf: "center",
                                  fontSize: 18,
                                  paddingBottom: 10,
                                }}
                              >
                                {suggestions.bloodPressure}
                              </Text>
                              <View
                                style={{
                                  padding: 5,
                                  backgroundColor: "transparent",
                                }}
                              >
                                <Text
                                  style={{
                                    paddingBottom: 10,
                                  }}
                                >
                                  <Entypo
                                    name="dot-single"
                                    size={20}
                                    color="black"
                                  />
                                  You need medical attention,{" "}
                                  <Text
                                    style={{
                                      fontWeight: "bold",
                                    }}
                                  >
                                    contact your health care professional.
                                  </Text>
                                </Text>
                                <Text style={{ textAlign: "justify" }}>
                                  your health care professional should prescribe
                                  lifestyle changes. They may consider adding
                                  medication based on your risk of heart disease
                                  or stroke and should add medication if you
                                  have other conditions such as diabetes, heart
                                  failure and kidney disease.
                                </Text>
                              </View>
                            </View>
                          ) : null}

                          {suggestions.bloodPressure ===
                          "ELEVATED BLOOD PRESSURE. Stay hydrated, consult doctor." ? (
                            <Text>{suggestions.bloodPressure}</Text>
                          ) : null}

                          {suggestions.bloodPressure ===
                          "Blood pressure is normal." ? (
                            <Text>{suggestions.bloodPressure}</Text>
                          ) : null}

                          {suggestions.bloodPressure ===
                          "Low BP. Stay hydrated, consult doctor." ? (
                            <Text>{suggestions.bloodPressure}</Text>
                          ) : null}

                          {suggestions.bloodPressure ===
                          "Error in BP values." ? (
                            <Text>{suggestions.bloodPressure}</Text>
                          ) : null}
                        </Card.Content>
                      </Card>
                    )}
                  </>
                )}
                {suggestionsSection === "suger" && (
                  <>
                    <Input
                      label="Blood Sugar (mg/dL)"
                      value={sugar}
                      onChange={setSugar}
                    />
                    <Text style={styles.subTitle}>Suggestions</Text>
                    {suggestions.sugar !== null && (
                      <Card style={styles.card1}>
                        <Card.Content>
                          {suggestions.sugar === "HIGH BLOOD SUGAR" ? (
                            <View
                              style={{
                                backgroundColor: "transparent",
                                margin: 0,
                                padding: 0,
                              }}
                            >
                              <Text
                                style={{
                                  color: "#ae0000",
                                  fontWeight: "bold",
                                  alignSelf: "center",
                                  fontSize: 18,
                                  paddingBottom: 10,
                                }}
                              >
                                {suggestions.sugar}
                              </Text>
                              <View
                                style={{
                                  padding: 5,
                                  paddingLeft: 20,
                                  backgroundColor: "transparent",
                                  justifyContent: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    paddingBottom: 10,
                                  }}
                                >
                                  <Entypo
                                    name="dot-single"
                                    size={20}
                                    color="black"
                                  />
                                  Possible diabetes
                                </Text>
                                <Text
                                  style={{
                                    paddingBottom: 10,
                                  }}
                                >
                                  <Entypo
                                    name="dot-single"
                                    size={20}
                                    color="black"
                                  />
                                  Seek medical advice.
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <Text>{suggestions.sugar}</Text>
                          )}
                        </Card.Content>
                      </Card>
                    )}
                  </>
                )}
                {suggestionsSection === "bmi" && (
                  <>
                    <Input
                      label="Height (cm)"
                      value={height}
                      onChange={setHeight}
                    />
                    <Input
                      label="Weight (kg)"
                      value={weight}
                      onChange={setWeight}
                    />

                    {bmi && (
                      <Text style={styles.bmiText}>Calculated BMI: {bmi}</Text>
                    )}

                    {/* separator */}
                    <View
                      style={{ height: 10, backgroundColor: "transparent" }}
                    />

                    <Text style={styles.subTitle}>Suggestions</Text>
                    {suggestions.bmi !== null && (
                      <Card style={styles.card1}>
                        <Card.Content>
                          <Text>{suggestions.bmi}</Text>
                        </Card.Content>
                      </Card>
                    )}
                  </>
                )}
                {suggestionsSection === "heart" && (
                  <>
                    <Input
                      label="Heart Rate (bpm)"
                      value={heartRate}
                      onChange={setHeartRate}
                    />
                    <Text style={styles.subTitle}>Suggestions</Text>

                    {suggestions.heartRate !== null && (
                      <Card style={styles.card1}>
                        <Card.Content>
                          <Text>{suggestions.heartRate}</Text>
                        </Card.Content>
                      </Card>
                    )}
                  </>
                )}
                {suggestionsSection === "sleep" && (
                  <>
                    <Input
                      label="Sleep Hours"
                      value={sleep}
                      onChange={setSleep}
                    />
                    <Text style={styles.subTitle}>Suggestions</Text>
                    {suggestions.sleep !== null && (
                      <Card style={styles.card1}>
                        <Card.Content>
                          <Text>{suggestions.sleep}</Text>
                        </Card.Content>
                      </Card>
                    )}
                  </>
                )}
              </ScrollView>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const Input: React.FC<{
  label: string;
  value: string;
  onChange: (text: string) => void;
}> = ({ label, value, onChange }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChange}
      keyboardType="numeric"
      placeholder="Enter value"
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  separator: {
    height: 6,
    backgroundColor: "transparent",
  },
  container: {
    backgroundColor: "transparent",
    flexDirection: "column",
    height: "76%",
    padding: 10,
  },
  scrollContainer: {
    marginBottom: 120,
    backgroundColor: "transparent",
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    paddingBottom: 10,
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#0d47a1",
  },
  inputContainer: {
    marginBottom: 12,
    backgroundColor: "transparent",
  },
  label: {
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  bmiText: {
    fontSize: 16,
    color: "#1b5e20",
    marginTop: 10,
  },
  card1: {
    marginBottom: 10,
    backgroundColor: "rgb(70, 91, 209)",
    borderRadius: 10,
  },
});

export default HealthAnalysis;
