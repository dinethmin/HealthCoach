import React, { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";
import { Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FIREBASE_AUTH, FIREBASE_Database } from "@/FirebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";
import { child, get, getDatabase, ref, remove } from "firebase/database";
import { deleteUser } from "firebase/auth";

const Profile = () => {
  const [userimage, setUrl] = React.useState("");
  const [newImageUrl, setNewUrl] = useState("");
  const user = FIREBASE_AUTH.currentUser;
  const userId = FIREBASE_AUTH.currentUser?.uid;

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setNewUrl(userimage);
  }, [newImageUrl]);

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

        setUrl(userData.imageUrl || "");
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (user) {
      try {
        // Delete user data
        const db = getDatabase();
        await remove(ref(db, `users/${userId}`));

        // Delete user
        await deleteUser(user);

        console.log("User account and data deleted.");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
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
          <Text style={styles.title}>{FIREBASE_AUTH.currentUser?.email}</Text>
          <Link
            href={{
              pathname: "/EditProfile",
              params: {
                type: "edit",
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
      <Button title="Sign Out" onPress={() => FIREBASE_AUTH.signOut()} />

      <Button title="Delete Account" onPress={handleDeleteAccount} />
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
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: "80%",
  },
});

export default Profile;
