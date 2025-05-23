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
import { defaultStyles } from "../constants/Styles";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { FIREBASE_Database } from "../FirebaseConfig";
import { router } from "expo-router";
import { ColorPalette } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const DoctorSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [MLN, setMLN] = useState("");
  const auth = FIREBASE_AUTH;
  const imageUrl =
    "https://www.pharmacy.texas.gov/buttons/applicants/new-pharmacists.png";

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
    if (!name || !phone || !birthday || !gender || !city || !MLN) {
      Alert.alert("All fields are required!");
      return;
    }

    const userId = auth.currentUser?.uid;

    if (!userId) {
      Alert.alert("User ID not found");
      return;
    }

    set(ref(FIREBASE_Database, "doctor/" + userId), {
      name,
      phone,
      birthday,
      gender,
      city,
      MLN,
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
        setMLN("");
      })
      .catch((error) => {
        console.error("Error saving user data: ", error);
        Alert.alert("Error saving data");
      });
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
        <View>
          <Text style={styles.title}>Doctor Sign Up</Text>
        </View>

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
            !["Male", "Female", "Other"].includes(gender) && (
              <Text style={styles.errorText}>Please enter a valid gender.</Text>
            )}
          <TextInput
            autoCapitalize="words"
            placeholder="City"
            style={styles.inputField}
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            autoCapitalize="characters"
            placeholder="Medical License Number"
            style={styles.inputField}
            value={MLN}
            onChangeText={setMLN}
          />
          {MLN && !/^SLMC-\d{4}-\d{5}$/.test(MLN) && (
            <Text style={styles.errorText}>
              Please enter a valid Medical License Number(e.g. SLMC-2025-12345).
            </Text>
          )}
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
          <View style={{height: 10}}/>
          <TouchableOpacity
            onPress={signUp}
            style={[defaultStyles.btn, styles.btnPrimary]}
          >
            <Text style={styles.btnPrimaryText}>Create account</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "transparent",
  },
  scrollContainer: {
    marginBottom: 60,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "bold",
    paddingBottom: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    backgroundColor:"rgba(255, 255, 255, 0.40)",
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

export default DoctorSignUp;
