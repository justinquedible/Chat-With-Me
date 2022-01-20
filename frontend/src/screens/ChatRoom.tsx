import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import io, { Socket } from "socket.io-client";
import uuid from "react-native-uuid";
import { Props } from "../Navigation";
import { RouteProp } from "@react-navigation/core";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import Screen from "../components/Screen";

interface ScreenProps extends Props {
  route: RouteProp<{ [roomName: string]: { roomName: string } }>;
}

export default function ChatRoom(props: ScreenProps) {
  const roomName = props.route.params?.roomName;
  const [message, setMessage] = React.useState("");
  const [timeStamps, setTimeStamps] = React.useState<string[]>(["234", "2342"]);
  const [messages, setMessages] = React.useState<string[]>(["hi", "hello"]);

  const [socket, setSocket] =
    React.useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  const flatList = React.useRef<FlatList>(null);

  React.useEffect(() => {
    // const sio = io("https://server-yzble43rrq-uw.a.run.app");
    const sio = io("http://localhost:8080");
    setSocket(sio);

    sio.on("connect", () => {
      sio.emit("join", roomName);
      setMessages((messages) => [`Joined ${roomName}`, ...messages]);
    });

    sio.on("message", (msg: string) => {
      const time = new Date().toLocaleTimeString();
      setTimeStamps((timeStamps) => [time, ...timeStamps]);
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
    return <Text>{item}</Text>;
  };

  const renderTimeStamp = ({ item }: { item: string }) => {
    return <Text style={styles.timeStamp}>{item}</Text>;
  };

  return (
    <Screen>
      <Button title="Go Home" onPress={handleGoBack} />

      <Text h4>Room Name: {roomName}</Text>

      <View style={styles.container}>
        <FlatList
          style={styles.timeStampList}
          ref={flatList}
          inverted={true}
          data={timeStamps}
          renderItem={renderTimeStamp}
          keyExtractor={(item: string, index: number) => uuid.v4() as string}
        />
        <FlatList
          style={styles.messageList}
          ref={flatList}
          inverted={true}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item: string, index: number) => uuid.v4() as string}
        />
      </View>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  messageList: {},
  timeStampList: {
    minWidth: 100,
    maxWidth: 100,
  },
  timeStamp: {
    color: "#ddd",
  },
});
