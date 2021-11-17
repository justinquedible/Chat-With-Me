import React, { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";

export default function Screen(props: PropsWithChildren<{}>) {
  return <View style={styles.container}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    padding: 10,
    flex: 1,
    backgroundColor: "#000",
  },
});
