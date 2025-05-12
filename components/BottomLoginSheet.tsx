import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ColorPalette } from "@/constants/Colors";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";

const BottomLoginSheet = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <Link
        href={{
          pathname: "/Signin",
          params: {
            type: "register",
          },
        }}
        asChild
        style={[defaultStyles.btn, styles.btnDark]}
      >
        <TouchableOpacity>
          <LottieView
            source={{
              uri: "https://lottie.host/bfbe129f-3ef8-4a92-a67e-426446e074d4/XWeQl0BFbX.json",
            }}
            autoPlay
            loop
            speed={0.5}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.btnDarkText}>Create an Account</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href={{
          pathname: "/login",
          params: {
            type: "login",
          },
        }}
        asChild
        style={[defaultStyles.btn, styles.btnDark]}
      >
        <TouchableOpacity>
          <Text style={styles.btnDarkText}>Log in</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    height: "20%",
    width: "100%",
    backgroundColor: "#000",
    padding: 26,
    gap: 14,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  btnLight: {
    backgroundColor: "#fff",
  },
  btnIcon: {
    paddingRight: 7,
  },
  btnLightText: {
    fontSize: 20,
  },
  btnDark: {
    backgroundColor: ColorPalette.grey,
  },
  btnDarkText: {
    color: "#fff",
    fontSize: 20,
    paddingLeft: 10,
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: ColorPalette.grey,
  },
});

export default BottomLoginSheet;
