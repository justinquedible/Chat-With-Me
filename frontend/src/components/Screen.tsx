import React, { CSSProperties, PropsWithChildren } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface ScreenProps {
  style?: StyleProp<ViewStyle>;
}

export default function Screen(props: PropsWithChildren<ScreenProps>) {
  return <View style={[props.style, styles.container]}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 10,
    flex: 1,
    backgroundColor: "#111",
  },
});
