import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { Video } from "expo-av";
import * as Device from "expo-device";
import { Props } from "../Navigation";
import { RouteProp } from "@react-navigation/core";

interface ScreenProps extends Props {
  route: RouteProp<{ [name: string]: { name: string } }>;
}

export default function Jason(props: ScreenProps) {
  const video = React.useRef<Video>(null);

  React.useEffect(() => {
    if (video.current !== null) {
      video.current.playAsync();
    }
  }, []);

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
      <Video
        ref={video}
        style={styles.video}
        source={require(`../../assets/${props.route.params.name}.mp4`)}
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
