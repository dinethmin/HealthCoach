import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { Image } from "react-native";
import { defaultStyles } from "../constants/Styles";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { FIREBASE_Database } from "../FirebaseConfig";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const auth = FIREBASE_AUTH;
  const imageUrl =
    "https://img.freepik.com/premium-psd/contact-icon-illustration-isolated_23-2151903357.jpg?semt=ais_hybrid&w=550";

  const signIn = async () => {
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
    setLoading(false);
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      saveUserData();
      if (user) router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    }
    setLoading(false);
  };

  const saveUserData = () => {
    if (!name || !phone || !birthday || !gender || !city) {
      Alert.alert("All fields are required!");
      return;
    }

    const userId = auth.currentUser?.uid;

    if (!userId) {
      Alert.alert("User ID not found");
      return;
    }

    set(ref(FIREBASE_Database, "users/" + userId), {
      name,
      phone,
      birthday,
      gender,
      city,
      email,
      imageUrl,
    })
      .then(() => {
        Alert.alert("User data saved successfully!");
        setName("");
        setPhone("");
        setBirthday("");
        setGender("");
        setCity("");
      })
      .catch((error) => {
        console.error("Error saving user data: ", error);
        Alert.alert("Error saving data");
      });
  };

  return (
    <LinearGradient
      colors={["#3d7aa4", "#74b9e8", "#bbe1fa"]}
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
        height: "100%",
        width: "100%",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={1}
      >
        {loading && (
          <View style={defaultStyles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        {type === "login" ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                margin: 0,
              }}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
                resizeMode="contain"
                source={require("../assets/images/Logo.png")}
              />
            </View>
            <View style={{ height: 5 }} />
            <View style={styles.subContainer2}>
              <Text style={styles.title1}>Login</Text>
              <View style={{ height: 10 }} />
              <Text style={styles.subTitle}>Welcome Back! </Text>
              <Text style={styles.subTitle}>Log in to manage your health.</Text>
            </View>
          </View>
        ) : (
          <View>
            <View style={{ height: 30 }} />
            <Text style={styles.title}>Sign Up</Text>
            <View style={{ height: 5 }} />
            <Text style={styles.subTitle1}>Create an User Account</Text>
          </View>
        )}

        <View>
          {type === "login" ? (
            <>
              <TextInput
                autoCapitalize="none"
                placeholder="Email"
                style={styles.inputField}
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                autoCapitalize="none"
                placeholder="Password"
                style={styles.inputField}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TouchableOpacity
                onPress={signIn}
                style={[defaultStyles.btn, styles.btnPrimary]}
              >
                <Text style={styles.btnPrimaryText}>Login</Text>
              </TouchableOpacity>
            </>
          ) : (
            <ScrollView style={styles.scrollContainer}>
              <TextInput
                autoCapitalize="words"
                placeholder="Name"
                style={styles.inputField}
                value={name}
                onChangeText={setName}
              />
              <TextInput
                autoCapitalize="none"
                placeholder="Phone"
                style={styles.inputField}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              {phone && !/^[0-9]{10}$/.test(phone) && (
                <Text style={styles.errorText}>
                  Please enter a valid phone number format (10 digit).
                </Text>
              )}
              <TextInput
                autoCapitalize="none"
                placeholder="Birthday (DD/MM/YYYY)"
                style={styles.inputField}
                value={birthday}
                onChangeText={setBirthday}
              />
              {birthday && !/^\d{2}\/\d{2}\/\d{4}$/.test(birthday) && (
                <Text style={styles.errorText}>
                  Please enter a valid date format.
                </Text>
              )}
              <TextInput
                autoCapitalize="words"
                placeholder="Gender (Male, Female)"
                style={styles.inputField}
                value={gender}
                onChangeText={setGender}
              />
              {gender &&
                !["Male", "Female", "Non-binary", "Other"].includes(gender) && (
                  <Text style={styles.errorText}>
                    Please enter a valid gender.
                  </Text>
                )}
              <TextInput
                autoCapitalize="words"
                placeholder="City"
                style={styles.inputField}
                value={city}
                onChangeText={setCity}
              />
              <TextInput
                autoCapitalize="none"
                placeholder="Email"
                style={styles.inputField}
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                autoCapitalize="none"
                placeholder="Password"
                style={styles.inputField}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <View style={{ height: 10 }} />
              <TouchableOpacity
                onPress={signUp}
                style={[defaultStyles.btn, styles.btnPrimary]}
              >
                <Text style={styles.btnPrimaryText}>Create account</Text>
              </TouchableOpacity>

              <View style={styles.subContainer}>
                <Text style={styles.subTitle}>
                  Are you a <Text style={{ color: "#298f76" }}>Doctor? </Text>{" "}
                </Text>
                <Link
                  href={{
                    pathname: "/DoctorSignUp",
                    params: {
                      type: "page",
                    },
                  }}
                  asChild
                >
                  <TouchableOpacity style={{ backgroundColor: "transparent" }}>
                    <Text style={styles.subTitle2}>Crate an Account</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "transparent",
  },
  subContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer2: {
    backgroundColor: "transparent",
    flexDirection: "column",
    paddingBottom: 40,
  },
  scrollContainer: {
    marginBottom: 80,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "bold",
  },
  title1: {
    fontSize: 40,
    alignSelf: "center",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold",
  },
  subTitle1: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  subTitle2: {
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#103569",
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.40)",
    color: "black",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
  btnPrimary: {
    backgroundColor: "#007bff",
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: "#fff",
    fontSize: 16,
  },
});
