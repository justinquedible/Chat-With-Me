import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { Button, Input, Text, ThemeProvider } from "react-native-elements";
import io, { Socket } from "socket.io-client";
import uuid from "react-native-uuid";
import { Props } from "../Navigation";
import { RouteProp } from "@react-navigation/core";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import Screen from "../components/Screen";
import { theme } from "../styling/theme";

interface ScreenProps extends Props {
  route: RouteProp<{ [roomName: string]: { roomName: string } }>;
}

export default function ChatRoom(props: ScreenProps) {
  const roomName = props.route.params?.roomName;
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<string[]>([]);
  const [socket, setSocket] =
    React.useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  const flatList = React.useRef<FlatList>(null);

  React.useEffect(() => {
    const sio = io("https://server-m7qcpsjy5a-uw.a.run.app");
    setSocket(sio);

    sio.on("connect", () => {
      sio.emit("join", roomName);
      setMessages((messages) => [`Joined ${roomName}`, ...messages]);
    });

    sio.on("message", (msg: string) => {
      setMessages((messages) => [msg, ...messages]);
    });

    sio.on("disconnect", () => {
      // console.log("disconnected");
    });
  }, []);

  const handleGoBack = () => {
    socket?.disconnect();
    props.navigation.navigate("Home");
  };

  const submitMessage = () => {
    socket?.send(roomName, message);
    setMessage("");
  };

  const renderMessage = ({ item }: { item: string }) => {
    return <Text style={theme.Text.textStyle}>{item}</Text>;
  };

  return (
    <ThemeProvider theme={theme}>
      <Screen>
        <Button title="Go Home" onPress={handleGoBack} />

        {/* TODO: Fix this */}
        <Text>{roomName}</Text>

        <FlatList
          style={styles.messageList}
          ref={flatList}
          inverted={true}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item: string, index: number) => uuid.v4() as string}
        />

        <Input
          autoFocus={true}
          blurOnSubmit={false}
          placeholder="Type to chat"
          value={message}
          onSubmitEditing={submitMessage}
          onChangeText={(msg) => {
            setMessage(msg);
          }}
        />
      </Screen>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  messageList: {
    paddingTop: 20,
    marginHorizontal: 10,
  },
});
