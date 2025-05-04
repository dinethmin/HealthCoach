import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useColorScheme } from "@/components/useColorScheme";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const hideSplash = async () => {
      if (loaded) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplash();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="Home" options={{ headerShown: false }} />
        <Stack.Screen
          name="login"
          options={{
            presentation: "modal",
            title: "  Back",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              fontSize: 20,
              color: "#a5a3a3",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="MoreDetails"
          options={{
            presentation: "modal",
            title: "  Back",
            headerStyle: {
              backgroundColor: "023d69",
            },
            headerTitleStyle: {
              fontFamily: "mon-sb",
              fontSize: 20,
              color: "#a5a3a3",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="DoctorSignUp"
          options={{
            presentation: "modal",
            title: "  Back",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              fontSize: 20,
              color: "#a5a3a3",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="DoctorProfile"
          options={{
            presentation: "modal",
            title: "  Back",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              fontSize: 20,
              color: "#a5a3a3",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="EditProfile"
          options={{
            presentation: "modal",
            title: "  Back",
            headerStyle: {
              backgroundColor: "white",
            },
            headerTitleStyle: {
              fontFamily: "mon-sb",
              fontSize: 20,
              color: "#a5a3a3",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="PredictionHistory"
          options={{
            presentation: "modal",
            title: "      Prediction History",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              fontSize: 22,
              color: "#a5a3a3",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="HealthAnalysis"
          options={{
            presentation: "modal",
            title: "      Health Analysis",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              fontSize: 20,
              color: "#a5a3a3",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="AccountLogin"
          options={{
            presentation: "modal",
            title: "  Back",
            headerStyle: {
              backgroundColor: "white",
            },
            headerTitleStyle: {
              fontFamily: "mon-sb",
              fontSize: 20,
              color: "#a5a3a3",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Chat"
          options={{
            presentation: "modal",
            title: "      Chat List",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              fontSize: 22,
              color: "#a5a3a3",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="CRoom"
          options={{
            presentation: "modal",
            title: "      Chat Room",
            headerStyle: {
              backgroundColor: "white",
            },
            headerTitleStyle: {
              fontFamily: "mon-sb",
              fontSize: 22,
              color: "#a5a3a3",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
