import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { FIREBASE_AUTH, FIREBASE_Database } from "@/FirebaseConfig";
import { ColorPalette } from "@/constants/Colors";
import { getDatabase, ref, remove } from "firebase/database";
import { deleteUser } from "@firebase/auth";
import AntDesign from "@expo/vector-icons/AntDesign";

const AccountLogin = () => {
  const user = FIREBASE_AUTH.currentUser;
  const userId = FIREBASE_AUTH.currentUser?.uid;

  const handleDeleteAccount = async () => {
    if (user) {
      try {
        // Delete user data
        const db = getDatabase();
        await remove(ref(db, `users/${userId}`));
        await remove(ref(db, `doctor/${userId}`));

        // Delete user
        await deleteUser(user);

        console.log("User account and data deleted.");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <Text style={styles.topTitle}>Account Login</Text>
      </View>
      <View
        style={{
          backgroundColor: ColorPalette.greyLight2,
          padding: 5,
          width: "100%",
          height: "15%",
          justifyContent: "center",
        }}
      >
        <Text style={styles.profileTitle}>You have signed up with </Text>
        <Text style={styles.nomalText}>{FIREBASE_AUTH.currentUser?.email}</Text>
      </View>
      <View style={styles.separator} />
      <View
        style={{
          backgroundColor: ColorPalette.greyLight2,
          padding: 5,
          width: "100%",
          height: "15%",
          justifyContent: "center",
        }}
      >
        <Text style={styles.profileTitle}>Your userID</Text>
        <Text selectable={true} style={styles.nomalText}>
          {userId}
        </Text>
      </View>
      <View style={{ height: "40%" }} />
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "OK",
                onPress: handleDeleteAccount,
              },
            ]
          )
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <AntDesign name="deleteuser" size={22} color="white" />
          <Text style={styles.btnColor}>Delete My Account</Text>
        </View>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    textAlign: "center",
    padding: 15,
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 5,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  separator: {
    height: 10,
    backgroundColor: "transparent",
  },
  nomalText: {
    color: "gray",
    paddingLeft: 40,
    paddingTop: 10,
    fontSize: 17,
  },
  btnColor: {
    color: "white",
    fontSize: 16,
  },
  btn: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-evenly",
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    width: "70%",
  },
});

export default AccountLogin;
