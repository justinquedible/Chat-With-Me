import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { Props } from "../Navigation";

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
    <View style={styles.container}>
      {/* <Button title="Go to All-Chat Room" onPress={handleRandomChatPress} /> */}
      <Button
        title="Happy Birthday Jason"
        onPress={() => handleSecretPress("Jason")}
      />
      <Button
        title="Happy Birthday Chan"
        onPress={() => handleSecretPress("Chan")}
      />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#000",
  },
});
