import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useCallback, useState } from "react";
import { Icon, useTheme } from "react-native-paper";
import { Images, Themes } from "./assets/Themes";

export default function SelfCareBox({ index, name, time, desc }) {
  return (
    <View style={styles.item}>
      <Pressable style={styles.button}>
        <Text>img placeholder</Text>
      </Pressable>
      <Text style={styles.name}>{name}</Text>
      <Icon source={"clock"} />
      <Text style={styles.body}>{time}</Text>
      <Text style={styles.body}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    marginVertical: 10,
    flex: 1,
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
    height: 180,
  },
  button: {
    width: "100%",
    height: "60%",
    backgroundColor: "#CEDC9D",
    borderRadius: 6,
  },
  name: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
  },
  body: {
    fontFamily: "Montserrat",
  },
});
