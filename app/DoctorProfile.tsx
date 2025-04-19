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
import { get, ref, child, update, set } from "firebase/database";
import { FIREBASE_Database } from "../FirebaseConfig";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useEffect } from "react";
import { ColorPalette } from "@/constants/Colors";

const DoctorProfile = () => {
  const [name, setName] = useState("");
  const [MC, setMC] = useState("");
  const [YoExp, setYoExp] = useState("");
  const [Workplace, setWorkplace] = useState("");
  const [EmergencyContact, setEmergencyContact] = useState("");
  const [MLN, setMLN] = useState("");
  //updated
  const [newName, setNewName] = useState("");
  const [newMC, setNewMC] = useState("");
  const [newYoExp, setNewYoExp] = useState("");
  const [newWorkplace, setNewWorkplace] = useState("");
  const [newEmergencyContact, setNewEmergencyContact] = useState("");
  const [newMLN, setNewMLN] = useState("");

  const auth = FIREBASE_AUTH;

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setNewName(name);
    setNewMC(MC);
    setNewYoExp(YoExp);
    setNewWorkplace(Workplace);
    setNewEmergencyContact(EmergencyContact);
    setNewMLN(MLN);
  }, [name, MC, YoExp, Workplace, EmergencyContact, MLN]);

  const fetchUserData = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (!user) {
        console.warn("No user logged in");
        return;
      }

      const userId = FIREBASE_AUTH.currentUser?.uid;
      const dbRef = ref(FIREBASE_Database);

      const snapshot1 = await get(child(dbRef, `doctordetails/${userId}`));
      const snapshot2 = await get(child(dbRef, `doctor/${userId}`));

      if (snapshot1.exists()) {
        const doctorData = snapshot1.val();

        setName(doctorData.name || "");
        setMLN(doctorData.MLN || "");
        setMC(doctorData.MC || "");
        setWorkplace(doctorData.Workplace || "");
        setYoExp(doctorData.YoExp || "");
        setEmergencyContact(doctorData.EmergencyContact || "");
      } else if (snapshot2.exists()) {
        const doctorData = snapshot2.val();

        setName(doctorData.name || "");
        setMLN(doctorData.MLN || "");
      } else {
        Alert.alert("No data available");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const saveUserData = () => {
    if (
      !name ||
      !MLN ||
      !newMC ||
      !newYoExp ||
      !newWorkplace ||
      !newEmergencyContact
    ) {
      Alert.alert("All fields are required!");
      return;
    }

    setMC(newMC);
    setEmergencyContact(newEmergencyContact);
    setYoExp(newYoExp);
    setWorkplace(newWorkplace);

    const userId = auth.currentUser?.uid;

    if (!userId) {
      Alert.alert("User ID not found");
      return;
    }

    set(ref(FIREBASE_Database, "doctordetails/" + userId), {
      name,
      MLN,
      MC: newMC,
      YoExp: newYoExp,
      Workplace: newWorkplace,
      EmergencyContact: newEmergencyContact,
    })
      .then(() => {
        Alert.alert("Doctor Details saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving user data: ", error);
        Alert.alert("Error saving data");
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={1}
      >
        <View style={{ flex: 1, padding: 15 }}>
          <Text style={styles.topTitle}>Doctor Profile</Text>
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.inputTitle}>Name</Text>
            <TextInput
              autoCapitalize="words"
              placeholder={name}
              style={styles.inputFieldS}
              value={name}
              editable={false}
            />
            <Text style={styles.inputTitle}>Medical License Number</Text>
            <TextInput
              autoCapitalize="characters"
              placeholder={MLN}
              style={styles.inputFieldS}
              value={MLN}
              editable={false}
            />
            <Text style={styles.inputTitle}>
              Medical Council / Registration Authority
            </Text>
            <TextInput
              autoCapitalize="characters"
              placeholder={MC}
              style={styles.inputField}
              value={newMC}
              onChangeText={setNewMC}
            />
            <Text style={styles.inputTitle}>Years of Experience</Text>
            <TextInput
              autoCapitalize="none"
              placeholder={newYoExp}
              style={styles.inputField}
              value={newYoExp}
              onChangeText={setNewYoExp}
              keyboardType="number-pad"
            />
            <Text style={styles.inputTitle}>Workplace / Hospital Name</Text>
            <TextInput
              autoCapitalize="words"
              placeholder={Workplace}
              style={styles.inputField}
              value={newWorkplace}
              onChangeText={setNewWorkplace}
            />
            <Text style={styles.inputTitle}>Emergency Contact</Text>
            <TextInput
              autoCapitalize="none"
              placeholder={EmergencyContact}
              style={styles.inputField}
              value={newEmergencyContact}
              onChangeText={setNewEmergencyContact}
              keyboardType="phone-pad"
            />
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btn} onPress={saveUserData}>
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
  inputFieldS: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    backgroundColor: ColorPalette.greyLight2,
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

export default DoctorProfile;
