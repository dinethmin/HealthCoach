import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";

export default function TabOneScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "left", "right"]}
    >
      <View style={styles.container}>
        <Text style={styles.topTitle}>Welcome to Health Coach</Text>
        <Image
          style={{ margin: 0, padding: 0, width: 50 }}
          source={require("../../assets/images/Animation.gif")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row",
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
