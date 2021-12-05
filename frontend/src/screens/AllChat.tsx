import React from "react";
import { StyleSheet, Text, FlatList, TextInput } from "react-native";
import { Button, Input } from "react-native-elements";
import io, { Socket } from "socket.io-client";
import uuid from "react-native-uuid";
import { Props } from "../Navigation";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import Screen from "../components/Screen";

export default function AllChat(props: Props) {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<string[]>(["Connected"]);
  const [socket, setSocket] =
    React.useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  const flatList = React.useRef<FlatList>(null);

  React.useEffect(() => {
    const sio = io("https://server-m7qcpsjy5a-uw.a.run.app");
    setSocket(sio);

    sio.on("connect", () => {
      // console.log("connected");
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
    props.navigation.goBack();
  };

  const submitMessage = () => {
    socket?.send(message);
    setMessage("");
  };

  const renderMessage = ({ item }: { item: string }) => {
    return <Text style={styles.message}>{item}</Text>;
  };

  return (
    <Screen>
      <Button title="Go Back" onPress={handleGoBack} />

      <FlatList
        style={styles.messageList}
        ref={flatList}
        inverted={true}
        scrollEnabled={false}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item: string, index: number) => uuid.v4() as string}
      />

      <Input
        style={styles.textInput}
        autoFocus={true}
        blurOnSubmit={false}
        placeholder=" Type to chat"
        value={message}
        onSubmitEditing={submitMessage}
        onChangeText={(msg) => {
          setMessage(msg);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  message: {
    color: "#fff",
  },
  messageList: {
    paddingTop: 10,
    marginHorizontal: 10,
  },
  textInput: {
    backgroundColor: "#fff",
  },
});
