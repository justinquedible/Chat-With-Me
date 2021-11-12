import React from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
} from "react-native";
import io, { Socket } from "socket.io-client";
import uuid from "react-native-uuid";
import { Props } from "../Navigation";
import { DefaultEventsMap } from "@socket.io/component-emitter";

export default function AllChat(props: Props) {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<string[]>([]);
  const [socket, setSocket] =
    React.useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  React.useEffect(() => {
    const sio = io("https://107.184.73.48:8080");
    setSocket(sio);

    sio.on("connect", () => {
      console.log("connected");
    });

    sio.on("message", (msg: string) => {
      setMessages((messages) => [...messages, msg]);
    });

    sio.on("disconnect", () => {
      console.log("disconnected");
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
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item: string, index: number) => uuid.v4() as string}
      />

      <TextInput
        style={styles.textInput}
        value={message}
        onSubmitEditing={submitMessage}
        onChangeText={(msg) => {
          setMessage(msg);
        }}
      />

      <Button title="Go Back" onPress={handleGoBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  message: {
    color: "#fff",
  },
  textInput: {
    backgroundColor: "#fff",
  },
});
