import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { get, ref, child, update } from "firebase/database";
import { FIREBASE_Database } from "../FirebaseConfig";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useEffect } from "react";
import { ColorPalette } from "@/constants/Colors";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [imageUrl, setUrl] = useState("");
  const [MLN, setMLN] = useState("");
  const [doctor, setDoctor] = useState(false);
  //updated
  const [newName, setNewName] = useState("");
  const [newBirthday, setNewBirthday] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newImageUrl, setNewUrl] = useState("");
  const [newMLN, setNewMLN] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setNewName(name);
    setNewBirthday(birthday);
    setNewPhone(phone);
    setNewGender(gender);
    setNewCity(city);
    setNewUrl(imageUrl);
    setNewMLN(MLN);
  }, [name, birthday, phone, gender, city, imageUrl, MLN]);

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
        setBirthday(userData.birthday || "");
        setPhone(userData.phone || "");
        setGender(userData.gender || "");
        setCity(userData.city || "");
        setUrl(userData.imageUrl || "");
      } else if (snapshot2.exists()) {
        const doctorData = snapshot2.val();

        setName(doctorData.name || "");
        setBirthday(doctorData.birthday || "");
        setPhone(doctorData.phone || "");
        setGender(doctorData.gender || "");
        setCity(doctorData.city || "");
        setUrl(doctorData.imageUrl || "");
        setMLN(doctorData.MLN || "");
        setDoctor(true);
      } else {
        Alert.alert("No data available");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateUserData = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (!user) {
        console.warn("No user logged in");
        return;
      }

      // Check if any update is avalable before updating
      if (
        newName === name &&
        newPhone === phone &&
        newBirthday === birthday &&
        newGender === gender &&
        newCity === city &&
        newImageUrl === imageUrl &&
        newMLN === MLN
      ) {
        Alert.alert("No data available to update");
        return;
      }

      if (user) {
        const userId = FIREBASE_AUTH.currentUser?.uid;
        const dbRef = ref(FIREBASE_Database);

        const snapshot1 = await get(child(dbRef, `users/${userId}`));
        const snapshot2 = await get(child(dbRef, `doctor/${userId}`));
        const snapshot3 = await get(child(dbRef, `doctordetails/${userId}`));

        if (snapshot1.exists()) {
          const userRef = ref(FIREBASE_Database, `users/${userId}`);

          await update(userRef, {
            name: newName,
            phone: newPhone,
            birthday: newBirthday,
            gender: newGender,
            city: newCity,
            imageUrl: newImageUrl,
          });
        } else if (snapshot2.exists()) {
          const doctorRef = ref(FIREBASE_Database, `doctor/${userId}`);

          await update(doctorRef, {
            name: newName,
            phone: newPhone,
            birthday: newBirthday,
            gender: newGender,
            city: newCity,
            imageUrl: newImageUrl,
            MLN: newMLN,
          });
        } else {
          Alert.alert("No data available");
        }
        
        if (snapshot3.exists()){
          const doctorRef = ref(FIREBASE_Database, `doctordetails/${userId}`);

          await update(doctorRef, {
            name: newName,
            MLN: newMLN,
          });
        }
        Alert.alert("Success", "Your profile has been updated!");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={1}
      >
        <View style={{ flex: 1, padding: 15 }}>
          <Text style={styles.topTitle}>Edit Profile</Text>
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.inputTitle}>Name</Text>
            <TextInput
              autoCapitalize="words"
              placeholder={name}
              style={styles.inputField}
              value={newName}
              onChangeText={setNewName}
            />
            <Text style={styles.inputTitle}>Phone</Text>
            <TextInput
              autoCapitalize="none"
              placeholder={phone}
              style={styles.inputField}
              value={newPhone}
              onChangeText={setNewPhone}
              keyboardType="phone-pad"
            />
            {phone && !/^[0-9]{10}$/.test(newPhone) && (
              <Text style={styles.errorText}>
                Please enter a valid phone number format (10 digit).
              </Text>
            )}
            {doctor === true ? (
              <>
                <Text style={styles.inputTitle}>Medical License Number</Text>
                <TextInput
                  autoCapitalize="none"
                  placeholder={MLN}
                  style={styles.inputField}
                  value={newMLN}
                  onChangeText={setNewMLN}
                />
              </>
            ) : null}
            <Text style={styles.inputTitle}>Birthday</Text>
            <TextInput
              autoCapitalize="none"
              placeholder={birthday}
              style={styles.inputField}
              value={newBirthday}
              onChangeText={setNewBirthday}
            />
            {birthday && !/^\d{2}\/\d{2}\/\d{4}$/.test(newBirthday) && (
              <Text style={styles.errorText}>
                Please enter a valid date format (DD/MM/YYYY).
              </Text>
            )}
            <Text style={styles.inputTitle}>Gender</Text>
            <TextInput
              autoCapitalize="words"
              placeholder={newGender}
              style={styles.inputField}
              value={newGender}
              onChangeText={setNewGender}
            />
            {gender &&
              !["Male", "Female", "Non-binary", "Other"].includes(
                newGender
              ) && (
                <Text style={styles.errorText}>
                  Please enter a valid gender (Male, Female, Non-binary).
                </Text>
              )}
            <Text style={styles.inputTitle}>City</Text>
            <TextInput
              autoCapitalize="words"
              placeholder={city}
              style={styles.inputField}
              value={newCity}
              onChangeText={setNewCity}
            />
            <Text style={styles.inputTitle}>Profile Image</Text>
            <TextInput
              autoCapitalize="none"
              placeholder={imageUrl}
              style={styles.inputField}
              value={newImageUrl}
              onChangeText={setNewUrl}
            />
            <Text style={styles.nomalText}>
              Please enter a valid image url or don't change the url.
            </Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btn} onPress={updateUserData}>
                <FontAwesome5
                  name="user-check"
                  style={styles.btnIcon}
                  size={16}
                  color="white"
                />
                <Text style={styles.btnColor}>Save Details</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    marginBottom: 20,
    backgroundColor: ColorPalette.light,
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "bold",
  },
  topTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    textAlign: "center",
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
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
  nomalText: {
    color: "blue",
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
    backgroundColor: "green",
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
