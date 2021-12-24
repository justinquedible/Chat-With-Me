import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { Button, ThemeProvider } from "react-native-elements";
import { Props } from "../Navigation";
import Screen from "../components/Screen";

export default function Home(props: Props) {
  React.useEffect(() => {}, []);

  const handleAllChatPress = () => {
    props.navigation.navigate("AllChat");
  };

  const handleGroupChatPress = () => {};

  const handleSecretPress = (name: string) => {
    props.navigation.navigate("HappyBirthday", { name: name });
  };

  return (
    <ThemeProvider theme={theme}>
      <Screen>
        <View style={styles.buttonContainer}>
          <Button title="Go to All-Chat Room" onPress={handleAllChatPress} />
          <Button title="Jason" onPress={() => handleSecretPress("jason")} />
          <Button title="Chan" onPress={() => handleSecretPress("chan")} />
          <Button
            title="Jonathan"
            onPress={() => handleSecretPress("jonathan")}
          />
        </View>
        <StatusBar style="light" />
      </Screen>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
  },
});

const theme = {
  Button: {
    buttonStyle: {
      backgroundColor: "#09f",
    },
    containerStyle: {
      margin: 20,
      width: "80%",
    },
  },
};
