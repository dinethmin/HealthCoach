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
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { defaultStyles } from "../constants/Styles";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { FIREBASE_Database } from "../FirebaseConfig";
import { router } from "expo-router";

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

      <Text style={styles.title}>
        {type === "login" ? "Welcome back" : "Create your account"}
      </Text>

      <View style={{ marginBottom: 20 }}>
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
          </>
        ) : (
          <>
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
              placeholder="Gender (Male, Female, Non-binary)"
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
              secureTextEntry
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
          </>
        )}
      </View>

      {type === "login" ? (
        <TouchableOpacity
          onPress={signIn}
          style={[defaultStyles.btn, styles.btnPrimary]}
        >
          <Text style={styles.btnPrimaryText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={signUp}
          style={[defaultStyles.btn, styles.btnPrimary]}
        >
          <Text style={styles.btnPrimaryText}>Create account</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "bold",
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
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
