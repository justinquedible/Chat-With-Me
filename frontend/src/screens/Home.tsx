import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { Button, Input, Overlay, ThemeProvider } from "react-native-elements";
import { Props } from "../Navigation";
import Screen from "../components/Screen";
import { theme } from "../styling/theme";

export default function Home(props: Props) {
  const [roomName, setRoomName] = React.useState("");
  const [showOverlay, setShowOverlay] = React.useState(false);

  React.useEffect(() => {}, []);

  const handleAllChatPress = () => {
    props.navigation.navigate("ChatRoom", { roomName: "all-chat" });
  };

  const handleChatRoomPress = () => {
    setShowOverlay(true);
  };

  const goToChatRoom = () => {
    setShowOverlay(false);
    props.navigation.navigate("ChatRoom", { roomName: roomName });
  };

  const handleSecretPress = (name: string) => {
    props.navigation.navigate("HappyBirthday", { name: name });
  };

  return (
    <ThemeProvider theme={theme} useDark={false}>
      <Screen>
        <Overlay
          isVisible={showOverlay}
          onBackdropPress={() => setShowOverlay(false)}
        >
          <Input
            autoFocus={true}
            placeholder="Type Room Name"
            value={roomName}
            onSubmitEditing={goToChatRoom}
            onChangeText={(text) => {
              setRoomName(text);
            }}
          />
        </Overlay>

        <View style={styles.buttonContainer}>
          <Button title="Go to All-Chat Room" onPress={handleAllChatPress} />
          <Button title="Create / Join Room" onPress={handleChatRoomPress} />

          {/* <Button title="Jason" onPress={() => handleSecretPress("jason")} />
          <Button title="Chan" onPress={() => handleSecretPress("chan")} />
          <Button
            title="Jonathan"
            onPress={() => handleSecretPress("jonathan")}
          /> */}
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
