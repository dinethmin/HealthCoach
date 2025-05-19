import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { FIREBASE_AUTH, FIREBASE_Database } from "@/FirebaseConfig";
import { child, get, ref } from "firebase/database";

const dummyChats = [
  {
    id: "user1_doctor1",
    participants: { user1: true, doctor1: true },
    name: { user: "User 1", doctor: "Doctor 1" },
    lastMessage: "See you next week!",
    lastUpdated: 1683312331233,
  },
  {
    id: "user1_doctor2",
    participants: { user1: true, doctor2: true },
    name: { user: "User 2", doctor: "Doctor 2" },
    lastMessage: "Thanks for the advice!",
    lastUpdated: 1683322331233,
  },
];

const Chat = () => {
  const [doctor, setDoctor] = useState(false);

  const fetchUserData = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (!user) {
        console.warn("No user logged in");
        return;
      }

      const userId = FIREBASE_AUTH.currentUser?.uid;
      const dbRef = ref(FIREBASE_Database);

      const snapshot2 = await get(child(dbRef, `doctor/${userId}`));

      if (snapshot2.exists()) {
        setDoctor(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <LinearGradient
      colors={["#e1ecf1", "#d2ebf7", "#d9eef9", "#e0f1f9", "#e6f2f8"]}
      locations={[0, 0.3, 0.6, 0.8, 0.88]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View>
          {dummyChats.map((chat) => (
            <Link
              key={chat.id}
              href={{
                pathname: "/CRoom",
                params: {
                  chatId: chat.id,
                },
              }}
              asChild
            >
              <TouchableOpacity style={styles.chatCard}>
                {doctor ? (
                  <Text style={styles.chatTitle}>{chat.name.user}</Text>
                ) : (
                  <Text style={styles.chatTitle}>{chat.name.doctor}</Text>
                )}
                <Text style={styles.chatLastMessage}>{chat.lastMessage}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  chatCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
  },
  chatLastMessage: {
    fontSize: 14,
    color: "#888",
  },
});

export default Chat;
