import React from "react";
import { Text, View } from "@/components/Themed";
import { Button, StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top" , "left" , "right"]}>
      <Text style={styles.topTitle}>My Profile</Text>

      <Text style={styles.title}>{FIREBASE_AUTH.currentUser?.email}</Text>

      <Button title="Sign Out" onPress={() => FIREBASE_AUTH.signOut()} />
      
      <Button
        title="Delete Account"
        onPress={() => FIREBASE_AUTH.currentUser?.delete()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
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
    margin: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default Profile;
