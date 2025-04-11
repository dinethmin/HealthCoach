import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { get, ref, child } from "firebase/database";
import { FIREBASE_Database } from "../FirebaseConfig";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useEffect } from "react";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

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
        setBirthday(userData.birthday || "");
        setPhone(userData.phone || "");
        setGender(userData.gender || "");
        setCity(userData.city || "");
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={styles.topTitle}>Edit Profile</Text>
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
            <Text style={styles.errorText}>Please enter a valid gender.</Text>
          )}
        <TextInput
          autoCapitalize="words"
          placeholder="City"
          style={styles.inputField}
          value={city}
          onChangeText={setCity}
          secureTextEntry
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}>
            <FontAwesome5
              name="user-edit"
              style={styles.btnIcon}
              size={16}
              color="white"
            />
            <Text style={styles.btnColor}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  topTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    margin: 10,
    textAlign: "center",
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
    justifyContent: "center",
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: "80%",
  },
  btnContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EditProfile;
