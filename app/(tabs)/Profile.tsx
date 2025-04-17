import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";
import { Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FIREBASE_AUTH, FIREBASE_Database } from "@/FirebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useFocusEffect } from "expo-router";
import { child, get, ref } from "firebase/database";
import { ColorPalette } from "@/constants/Colors";

const Profile = () => {
  const [userimage, setUrl] = React.useState("");
  const [newImageUrl, setNewUrl] = useState("");
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
      setNewUrl(userimage);
      setNewName(name);
    }, [newImageUrl, name, newName, userimage])
  );

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

        setUrl(userData.imageUrl || "");
        setName(userData.name || "");
      } else if (snapshot2.exists()) {
        const userData = snapshot2.val();

        setUrl(userData.imageUrl || "");
        setName(userData.name || "");
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "left", "right"]}
    >
      <Text style={styles.topTitle}>My Profile</Text>
      <View style={styles.userCard}>
        <Image
          source={{
            uri:
              userimage ||
              "https://www.pngplay.com/wp-content/uploads/12/Anime-Girl-Pfp-PNG-Pic-Background.png",
          }}
          style={styles.profileImage}
        />
        <View style={styles.userCardItems}>
          <Text style={styles.title}>{name}</Text>
          <Link
            href={{
              pathname: "/EditProfile",
              params: {
                type: "page",
              },
            }}
            asChild
            style={[styles.btn]}
          >
            <TouchableOpacity>
              <FontAwesome5
                name="user-edit"
                style={styles.btnIcon}
                size={16}
                color="white"
              />
              <Text style={styles.btnColor}>Edit Profile</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      <View style={styles.profileCard}>
        <View
          style={{
            backgroundColor: ColorPalette.greyLight,
            padding: 5,
            width: "100%",
          }}
        >
          <Text style={styles.profileTitle}>Account Settings</Text>
        </View>
        <Link
          href={{
            pathname: "/AccountLogin",
            params: {
              type: "page",
            },
          }}
          asChild
        >
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.profileSubTitle}>Account Login</Text>
            <AntDesign style={styles.profileSubTitleLogo} name="right" />
          </TouchableOpacity>
        </Link>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text style={styles.profileSubTitle}>Privacy</Text>
          <AntDesign style={styles.profileSubTitleLogo} name="right" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text style={styles.profileSubTitle}>Notification</Text>
          <AntDesign style={styles.profileSubTitleLogo} name="right" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text style={styles.profileSubTitle}>Language</Text>
          <AntDesign style={styles.profileSubTitleLogo} name="right" />
        </TouchableOpacity>
      </View>
      <View style={{ height: 10, backgroundColor: "transparent" }} />
      <View style={styles.profileCard}>
        <View
          style={{
            backgroundColor: ColorPalette.greyLight,
            padding: 5,
            width: "100%",
          }}
        >
          <Text style={styles.profileTitle}>Support</Text>
        </View>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text style={styles.profileSubTitle}>Feedback</Text>
          <AntDesign style={styles.profileSubTitleLogo} name="right" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text style={styles.profileSubTitle}>About Health Coach</Text>
          <AntDesign style={styles.profileSubTitleLogo} name="right" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text style={styles.profileSubTitle}>Safety information</Text>
          <AntDesign style={styles.profileSubTitleLogo} name="right" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text style={styles.profileSubTitle}>Rate us</Text>
          <AntDesign style={styles.profileSubTitleLogo} name="right" />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <Button title="Sign Out" onPress={() => FIREBASE_AUTH.signOut()} />
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
  profileTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 5,
  },
  profileSubTitle: {
    fontSize: 14,
    fontWeight: "condensedBold",
    color: "black",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
  },
  profileSubTitleLogo: {
    fontSize: 14,
    fontWeight: "condensedBold",
    color: "black",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 6,
    paddingRight: 12,
    paddingLeft: 12,
  },
  userCard: {
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "transparent",
    padding: 5,
  },
  profileCard: {
    flexDirection: "column",
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
    height: 40,
    backgroundColor: "transparent",
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
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: "80%",
  },
});

export default Profile;
