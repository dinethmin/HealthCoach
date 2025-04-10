import React from "react";
import { Text, View } from "@/components/Themed";
import { Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Profile = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "left", "right"]}
    >
      <Text style={styles.topTitle}>My Profile</Text>
      <View style={styles.userCard}>
        <Image
          source={{
            uri: "https://www.pngplay.com/wp-content/uploads/12/Anime-Girl-Pfp-PNG-Photo-Image.png",
          }}
          style={styles.profileImage}
        />
        <View style={styles.userCardItems}>
          <Text style={styles.title}>{FIREBASE_AUTH.currentUser?.email}</Text>
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
    margin: 10,
    textAlign: "center",
  },
  userCard: {
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "transparent",
  },
  userCardItems: {
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "transparent",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
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
    justifyContent: "center",
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: "80%",
  }
});

export default Profile;
