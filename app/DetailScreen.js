import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  AsyncStorage,
  Button,
  Image,
} from "react-native";
import { useCallback, useReducer, useState, useEffect } from "react";
import { Link } from "expo-router";
import { SegmentedButtons, Icon, useTheme, FAB } from "react-native-paper";
import { Images, Themes } from "../assets/Themes/index.js";
import { useFonts } from "expo-font";
import SelfCareBox from "./components/SelfCareBox.js";
import BoxList from "./components/BoxList.js";
import BoxesContext from "./BoxesContext.js";
import DetailList from "./components/DetailList.js";
import { AntDesign } from "@expo/vector-icons";
import { Stack } from "expo-router";
import Supabase from "./Supabase.js";

export default function DetailScreen() {
  const params = useLocalSearchParams();
  const url = Supabase.storage
    .from("coverImages")
    .getPublicUrl(params.coverImg);
  const image = {
    uri: url.data.publicUrl,
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link
              href={{
                pathname: "/EditBox",
                params: {
                  id: params.id,
                  name: params.name,
                  time: params.time,
                  desc: params.desc,
                  routine: params.routine,
                  itemsNeeded: params.itemsNeeded,
                  playlists: params.playlists,
                  words: params.words,
                  coverImg: params.coverImg,
                },
              }}
              asChild
            >
              <AntDesign name="ellipsis1" size={24} color="black" />
            </Link>
          ),
        }}
      />

      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Image source={image} style={styles.imgHeader} />

          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.headerText}>{params.name}</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  maxHeight: 40,
                }}
              >
                <AntDesign name="clockcircleo" size={20} color="black" />
                <Text style={styles.timeText}>{params.time}</Text>
              </View>

              <Text style={styles.body}>{params.desc}</Text>
            </View>

            <View style={styles.listSection}>
              <View>
                <Text style={styles.sectionText}>Self Care Routine</Text>
                <DetailList listValues={params.routine} />
              </View>
              <View>
                <Text style={styles.sectionText}>Items Needed</Text>
                <DetailList listValues={params.itemsNeeded} />
              </View>

              <View>
                <Text style={styles.sectionText}>Recommended Playlists</Text>
                <DetailList listValues={params.playlists} />
              </View>

              <View>
                <Text style={styles.sectionText}>Words of Affirmation</Text>
                <Text style={styles.words}>{params.words}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  imgHeader: {
    height: 131,
    backgroundColor: "black",
    width: "100%",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 20,
    justifyContent: "center",
  },

  headerText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 28,
    textAlign: "left",
  },
  body: {
    fontFamily: "Montserrat",
    fontSize: 14,
  },
  infoContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "flex-start",
    padding: 30,
    gap: 30,
  },
  sectionText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  timeText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
  },
  listSection: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },
  words: {
    fontFamily: "Montserrat-Italic",
    marginLeft: 20,
  },
  fab: {
    position: "absolute",
    marginBottom: 40,
    alignSelf: "center",
    bottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#CEDC9D",
  },
});
