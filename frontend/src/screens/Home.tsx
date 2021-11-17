import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View } from "react-native";
import { Props } from "../Navigation";
import Screen from "../components/Screen";

export default function Home(props: Props) {
  React.useEffect(() => {}, []);

  const handleRandomChatPress = () => {
    props.navigation.navigate("AllChat");
  };

  const handleGroupChatPress = () => {};

  const handleSecretPress = (name: string) => {
    props.navigation.navigate("HappyBirthday", { name: name });
  };

  return (
    <Screen>
      <Button title="Go to All-Chat Room" onPress={handleRandomChatPress} />
      {/* <Button
        title="Happy Birthday Jason"
        onPress={() => handleSecretPress("Jason")}
      />
      <Button
        title="Happy Birthday Chan"
        onPress={() => handleSecretPress("Chan")}
      /> */}
      <StatusBar style="light" />
    </Screen>
  );
}
