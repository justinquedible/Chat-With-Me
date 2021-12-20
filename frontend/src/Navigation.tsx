import React, { useEffect } from "react";
import { Alert } from "react-native";
import * as Updates from "expo-updates";
import * as Device from "expo-device";
import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import Home from "./screens/Home";
import AllChat from "./screens/AllChat";
import HappyBirthday from "./screens/HappyBirthday";
import { UpdateEventType } from "expo-updates";

export type Props = NativeStackScreenProps<ParamListBase>;

const Stack = createNativeStackNavigator();

export default function Navigation() {
  useEffect(() => {
    if (Device.brand !== null) {
      Updates.addListener((updateEvent) => {
        if (updateEvent.type === UpdateEventType.UPDATE_AVAILABLE) {
          Alert.alert("Update Available", "Please update the app", [
            { text: "Update", onPress: () => Updates.reloadAsync() },
          ]);
        }
      });
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AllChat" component={AllChat} />
        <Stack.Screen name="HappyBirthday" component={HappyBirthday} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
