import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { FIREBASE_AUTH, FIREBASE_Database } from "@/FirebaseConfig";
import { ColorPalette } from "@/constants/Colors";

const AccountLogin = () => {
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
    height: 20,
    backgroundColor: "transparent",
  },
  nomalText: {
    color: "gray",
    paddingLeft: 40,
    paddingTop: 10,
    fontSize: 17,
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

export default AccountLogin;
