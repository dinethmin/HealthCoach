import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import { ColorPalette } from "@/constants/Colors";
import { Link } from "expo-router";
import AnimatedIntro from "@/components/AnimatedIntro";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BottomLoginSheet from "@/components/BottomLoginSheet";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{ flex: 1, backgroundColor:'black' }}>
        
        <AnimatedIntro />
        <BottomLoginSheet />
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

export default Home;