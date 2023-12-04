import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  AsyncStorage,
} from "react-native";
import { useCallback, useReducer, useState, useEffect } from "react";
import { SegmentedButtons, Icon, useTheme } from "react-native-paper";
import { Images, Themes } from "../assets/Themes/index.js";
import { useFonts } from "expo-font";
import SelfCareBox from "./components/SelfCareBox.js";
import BoxList from "./components/BoxList.js";
import BoxesContext from "./BoxesContext.js";
import DetailList from "./components/DetailList.js";

export default function DetailScreen() {
  const params = useLocalSearchParams();
  console.log(params);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.headerText}>{params.name}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            maxHeight: 40,
          }}
        >
          <Icon source={"clock"} color="#CEDC9D" size={25} />
          <Text style={styles.body}>{params.time}</Text>
        </View>

        <Text style={styles.body}>{params.desc}</Text>
        <DetailList listValues={params.routine} />
        <DetailList listValues={params.itemsNeeded} />
        <DetailList listValues={params.playlists} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 60,
  },
  headerText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 28,
    textAlign: "left",
  },
  body: {
    fontFamily: "Montserrat",
  },
  infoContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "flex-start",
    padding: 30,
  },
});
