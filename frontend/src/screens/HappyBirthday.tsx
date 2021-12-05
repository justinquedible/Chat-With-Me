import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { Video } from "expo-av";
import * as Device from "expo-device";
import { Props } from "../Navigation";
import { RouteProp } from "@react-navigation/core";

interface ScreenProps extends Props {
  route: RouteProp<{ [name: string]: { name: string } }>;
}

export default function Jason(props: ScreenProps) {
  const video = React.useRef<Video>(null);
  const videoURLS = {
    jason:
      "https://firebasestorage.googleapis.com/v0/b/omegle-app-28aed.appspot.com/o/jason.mp4?alt=media&token=cbf3f416-7300-400c-9f61-7f7ba9ec008f",
    chan: "https://firebasestorage.googleapis.com/v0/b/omegle-app-28aed.appspot.com/o/chan.mp4?alt=media&token=d8a28971-8d17-46a1-ac4b-e7e4f34689af",
    jonathan:
      "https://firebasestorage.googleapis.com/v0/b/omegle-app-28aed.appspot.com/o/jonathan.mp4?alt=media&token=140d326d-64e6-4383-894a-adea05fc21d0",
  };

  React.useEffect(() => {
    if (video.current !== null) {
      video.current.playAsync();
    }
  }, [video]);

  const handleGoBack = () => {
    if (Device.brand !== null) {
      // if device is a phone/tablet
      props.navigation.goBack();
    } else {
      // if device is a computer
      window.location.reload(); // workaround for bringing user back to home page
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Go Back" onPress={handleGoBack} />
      <Text style={{ color: "white" }}>Turn Volume Up!</Text>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: (videoURLS as any)[props.route.params.name],
        }}
        resizeMode="contain"
        isLooping={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    alignSelf: "center",
    width: "80%",
    height: "80%",
  },
});
