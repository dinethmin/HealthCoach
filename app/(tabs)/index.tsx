import { StyleSheet, TouchableOpacity } from "react-native";
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

export default function TabOneScreen() {
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [doctor, setDoctor] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
      setNewName(name);
    }, [name, newName])
  );

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

        setName(userData.name || "");
      } else if (snapshot2.exists()) {
        const userData = snapshot2.val();

        setName(userData.name || "");
        setDoctor(true);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <LinearGradient
      colors={["#438cbf", "#74b9e8", "#bbe1fa"]}
      locations={[0, 0.6, 1]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "transparent" }}
        edges={["top", "left", "right"]}
      >
        <View style={styles.userCard}>
          <Image
            style={{ margin: 0, padding: 0, width: 100 }}
            source={require("../../assets/images/Animation.gif")}
          />
          <View style={styles.userCardItems}>
            <Text style={styles.topTitle}>Hi {name}, </Text>
            <Text style={styles.topTitle}>Welcome to Health Coach.</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.itemCardContainer}>
          <TouchableOpacity style={styles.itemContainer}>
            <LottieView
              source={{
                uri: "https://lottie.host/9827b19f-01e0-4fd3-ac2b-6bfc5a85457a/k21LYXj63z.json",
              }}
              autoPlay
              loop
              speed={0.5}
              style={{ width: 60, height: 70 }}
            />
            <Text style={styles.profileSubTitle}>Chat</Text>
          </TouchableOpacity>
          <Link
            href={{
              pathname: "/PredictionHistory",
              params: {
                type: "page",
              },
            }}
            asChild
          >
            <TouchableOpacity style={styles.itemContainer}>
              <LottieView
                source={{
                  uri: "https://lottie.host/da19275e-76d1-47b6-837c-662ba8c92100/bJlij7YC5C.json",
                }}
                autoPlay
                loop
                speed={0.5}
                style={{ width: 70, height: 70 }}
              />
              <Text style={styles.profileSubTitle}>Prediction History</Text>
            </TouchableOpacity>
          </Link>
          <Link
            href={{
              pathname: "/HealthAnalysis",
              params: {
                type: "page",
              },
            }}
            asChild
          >
            <TouchableOpacity style={styles.itemContainer}>
              <LottieView
                source={{
                  uri: "https://lottie.host/b6e43384-c126-45df-b70b-7601f63b2c76/MseuYfW2cZ.json",
                }}
                autoPlay
                loop
                speed={0.5}
                style={{ width: 70, height: 70 }}
              />
              <Text style={styles.profileSubTitle}>Health analysis</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.itemCardContainer2}>
          {doctor === true ? (
            <Link
              href={{
                pathname: "/DoctorProfile",
                params: {
                  type: "page",
                },
              }}
              asChild
            >
              <TouchableOpacity style={styles.itemContainer2}>
                <LottieView
                  source={{
                    uri: "https://lottie.host/e934bafa-bc89-4ebe-9e0b-584dc3088454/pgzVNMZtaE.json",
                  }}
                  autoPlay
                  loop
                  speed={0.5}
                  style={{ width: "50%", height: 80 }}
                />
                <Text style={styles.profileSubTitle}>Edit Doctor Details</Text>
              </TouchableOpacity>
            </Link>
          ) : null}
        </View>
        <View style={styles.separator} />
        <View style={styles.itemCard}>
          <Text style={styles.profileTitle}>Health Tips</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.itemCard}>
          <Link
            href={{
              pathname: "/(tabs)/two",
              params: {
                type: "page",
              },
            }}
            asChild
            style={[styles.btn]}
          >
            <TouchableOpacity>
              <LinearGradient
                colors={["#0f4c75", "#3282b8", "#bbe1fa"]}
                locations={[0, 0.6, 1]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderRadius: 12,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <LottieView
                  source={{
                    uri: "https://lottie.host/aff7658e-be79-4141-be34-bd92c7cadc9d/Ii9xLWehgh.json",
                  }}
                  autoPlay
                  loop
                  speed={0.5}
                  style={{ width: 40, height: 40 }}
                />
                <Text
                  style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}
                >
                  Start Disease Prediction
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Link>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 20,
    backgroundColor: "transparent",
  },
  topTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 5,
  },
  profileSubTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 60,
    margin: 10,
  },
  userCardItems: {
    flexDirection: "column",
    backgroundColor: "transparent",
    paddingRight: 10,
    marginRight: 10,
    width: "60%",
  },
  itemCard: {
    backgroundColor: "transparent",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  itemCardContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  itemCardContainer2: {
    width: "100%",
    backgroundColor: "transparent",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 0,
  },
  itemContainer: {
    backgroundColor: ColorPalette.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    margin: 0,
    borderRadius: 10,
  },
  itemContainer2: {
    backgroundColor: ColorPalette.lightBlue,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 8,
    margin: 0,
    borderRadius: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#2196F3",
  },
  btnIcon: {
    paddingRight: 7,
  },
  btnColor: {
    color: "white",
    fontSize: 16,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
