import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";

const dummyMessages = [
  {
    id: "msg1",
    senderId: "user1",
    text: "Hello Doctor!",
    timestamp: 1683312331000,
  },
  {
    id: "msg2",
    senderId: "doctor1",
    text: "Hi! How can I help you today?",
    timestamp: 1683312350000,
  },
];

const CRoom = () => {
  const { chatId } = useLocalSearchParams();
  const [messages, setMessages] = useState(dummyMessages);

  const sendMessage = (text: string) => {
    const newMessage = {
      id: `msg${Date.now()}`,
      senderId: "user1",
      text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <LinearGradient
      colors={["#e1ecf1", "#d2ebf7", "#d9eef9", "#e0f1f9", "#e6f2f8"]}
      locations={[0, 0.3, 0.6, 0.8, 0.88]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.chatHeader}>Chat with: {chatId}</Text>
        <GiftedChat
          messages={messages
            .map((msg) => ({
              _id: msg.id,
              text: msg.text,
              createdAt: new Date(msg.timestamp),
              user: { _id: msg.senderId },
            }))
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())}
          onSend={(newMessages) => {
            sendMessage(newMessages[0].text);
          }}
          user={{ _id: "user1" }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatHeader: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    color: "#2c3e50",
  },
});

export default CRoom;
