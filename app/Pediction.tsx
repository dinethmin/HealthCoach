import { Text, View, SafeAreaView } from "react-native";
import AnimatedIntro from "@/components/AnimatedIntro";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <AnimatedIntro />
      </View>
    </SafeAreaView>
  );
}
