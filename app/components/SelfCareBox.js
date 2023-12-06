import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useCallback, useState } from "react";
import { Icon, useTheme } from "react-native-paper";
import { Images, Themes } from "../../assets/Themes";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
export default function SelfCareBox({
  index,
  name,
  time,
  desc,
  routine,
  itemsNeeded,
  playlists,
  words,
}) {
  return (
    <View style={styles.item}>
      <Link
        href={{
          pathname: "/DetailScreen",
          params: {
            index: index,
            name: name,
            time: time,
            desc: desc,
            routine: routine,
            itemsNeeded: itemsNeeded,
            playlists: playlists,
            words: words,
          },
        }}
        asChild
      >
        <Pressable style={styles.button}>
          <Text>img placeholder</Text>
        </Pressable>
      </Link>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            maxHeight: 40,
          }}
        >
          <AntDesign name="clockcircle" size={25} color="#CEDC9D" />

          <Text style={styles.body}>{time}</Text>
        </View>

        <Text style={styles.desc}>{desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    marginVertical: 10,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    width: 300,
    marginTop: 20,
  },
  infoContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "flex-start",
  },
  button: {
    width: "100%",
    height: 100,
    backgroundColor: "#CEDC9D",
    borderRadius: 6,
  },
  name: {
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
  },
  body: {
    fontFamily: "Montserrat",
  },
  desc: {
    fontFamily: "Montserrat",
  },
});
