import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { defaultStyles } from "../constants/Styles";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = FIREBASE_AUTH;

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

  return (
    <LinearGradient
      colors={["#8dc7ef", "#76c0f1", "#b3ddf1", "#cdecf9", "#e6f2f8"]}
      locations={[0, 0.3, 0.6, 0.8, 0.88]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={{
        paddingLeft: 10,
        paddingRight: 10,
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

        <View style={{flex: 1, justifyContent: "center"}}>
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
          <View style={styles.subContainer2}>
            <Text style={styles.title1}>Login</Text>
            <View style={{ height: 10 }} />
            <Text style={styles.subTitle}>Welcome Back! </Text>
            <Text style={styles.subTitle}>Log in to manage your health.</Text>
          </View>
          <View style={{ height: 20 }} />
          <View>
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
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
