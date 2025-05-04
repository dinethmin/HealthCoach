import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const ChatRoom = () => {
  return (
    <LinearGradient
      colors={["#e1ecf1", "#d2ebf7", "#d9eef9", "#e0f1f9", "#e6f2f8"]}
      locations={[0, 0.3, 0.6, 0.8, 0.88]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          keyboardVerticalOffset={1}
        >
          <View>
            <Text>ChatRoom</Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContainer: {
    marginBottom: 20,
    backgroundColor: "transparent",
    paddingLeft: 10,
    paddingRight: 10,
  },
  topTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    padding: 20,
    fontSize: 18,
    alignSelf: "center",
  },
});

export default ChatRoom;
