import React, { useEffect, useState } from "react";
import { router, Tabs } from "expo-router";
import { Text, ActivityIndicator, View } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//Icons Imports
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      if (!user) {
        router.replace("/Home");
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          size="large"
          color={Colors[colorScheme ?? "light"].tint}
        />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          headerShown: false,
          title: "Prediction",
          tabBarIcon: ({ color }) => <MaterialIcons name="health-and-safety" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
        }}
      />
      
    </Tabs>
  );
}
