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

export default function TabOneScreen() {
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");

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

      const snapshot = await get(child(dbRef, `users/${userId}`));
      if (snapshot.exists()) {
        const userData = snapshot.val();

        setName(userData.name || "");
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
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
      <View style={styles.itemCard}></View>
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
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
                Start Disease Prediction
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  container: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "column",
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
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
    fontWeight: "condensedBold",
    color: "black",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
  },
  profileSubTitleLogo: {
    fontSize: 14,
    fontWeight: "condensedBold",
    color: "black",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 6,
    paddingRight: 12,
    paddingLeft: 12,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  userCardItems: {
    flexDirection: "column",
    backgroundColor: "transparent",
    alignItems: "flex-start",
    padding: 0,
    margin: 0,
  },
  itemCard: {
    backgroundColor: "transparent",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
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
