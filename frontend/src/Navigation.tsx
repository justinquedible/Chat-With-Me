import React from "react";
import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import Home from "./screens/Home";
import AllChat from "./screens/AllChat";
import HappyBirthday from "./screens/HappyBirthday";

export type Props = NativeStackScreenProps<ParamListBase>;

const Stack = createNativeStackNavigator();

export default function Navigation() {
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
