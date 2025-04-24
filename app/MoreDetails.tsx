import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const MoreDetails = () => {
  const { disease } = useLocalSearchParams();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ backgroundColor: "white" }}>
        <Text>MoreDetails</Text>
        <Text>Disease: {disease}</Text>
      </View>
    </SafeAreaView>
  );
};

export default MoreDetails;
