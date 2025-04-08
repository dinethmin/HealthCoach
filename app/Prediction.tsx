import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
import { ColorPalette } from "@/constants/Colors";
import { Link } from "expo-router";
import AnimatedIntro from "@/components/AnimatedIntro";
import AntDesign from "@expo/vector-icons/AntDesign";

const Prediction = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1,  backgroundColor: 'black' }}>
        <AnimatedIntro />
        <Link
          href={{
            pathname: "/Home",
            params: {
              type: "nav",
            },
          }}
          asChild
          style={[defaultStyles.btn, styles.btnDark]}
        >
          <TouchableOpacity>
            <AntDesign
              name="login"
              size={20}
              style={styles.btnIcon}
              color={ColorPalette.light}
            />
            <Text style={styles.btnDarkText}>Login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
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
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: ColorPalette.grey,
  },
});

export default Prediction;
