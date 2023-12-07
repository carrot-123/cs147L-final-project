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
import * as SplashScreen from "expo-splash-screen";
import SelfCareBox from "./components/SelfCareBox.js";
import BoxList from "./components/BoxList.js";
import BoxesContext from "./BoxesContext.js";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import Supabase from "./Supabase.js";

const INITIAL_BOXES = [
  {
    id: 0,
    name: "Test for very very very very very very very long titles!",
    time: "Day",
    desc: "Test for very very very very very very very very very very very very very very very very long descriptions",
    imageUrl: "",
    starred: false,

    routine: [
      "Drink tea",
      "Light a candle",
      "Call mom",
      "Listen to lofi",
      "Watch videos",
    ],

    itemsNeeded: ["Chamomile tea", "Vanilla candle", "Blankets"],
    playlists: ["Lofi for Bears Only"],
    words: "Everything is Fine",
  },
  {
    id: 1,
    name: "For a Good Night's Sleep",
    time: "Night",
    desc: "I want to sleep ;-;",
    imageUrl: "",
    starred: true,
    routine: [
      "Drink tea",
      "Light a candle",
      "Call mom",
      "Listen to lofi",
      "Watch videos",
    ],

    itemsNeeded: ["Chamomile tea", "Vanilla candle", "Blankets"],
    playlists: ["Lofi for Bears Only"],
    words: ["Everything is Fine"],
  },
  {
    id: 2,
    name: "For when I am sad",
    time: "Anytime",
    desc: "I will provide better descriptions",
    imageUrl: "",
    starred: false,
    routine: [
      "Drink tea",
      "Light a candle",
      "Call mom",
      "Listen to lofi",
      "Watch videos",
    ],

    itemsNeeded: ["Chamomile tea", "Vanilla candle", "Blankets"],
    playlists: ["Lofi for Bears Only"],
    words: ["Everything is Fine"],
  },
];

let currentId = 3;

const boxesReducer = (boxes, action) => {
  if (action.type === "filtered") {
    if (action.value.length === 0) {
      return {
        ...boxes,
        filtered: ["None"],
      };
    }
    console.log(boxes);
    return {
      ...boxes,
      filtered: boxes.newBoxes.filter((box) => {
        if (action.value.length === 1 && action.value.includes("Starred")) {
          return box.starred;
        } else if (action.value.includes("Starred")) {
          console.log(box);
          return box.starred && action.value.includes(box.time);
        } else {
          return action.value.includes(box.time) || box.time === "Anytime";
        }
      }),
    };
  } else if (action.type === "getBoxes") {
    console.log("here!!!");
    console.log(action.value);
    const newBoxes = action.value;
    return { newBoxes, filtered: ["None"] };
  } else {
    console.error("Unrecognized action", action.type);
  }
};

SplashScreen.preventAutoHideAsync();
export default function Home() {
  const [value, setValue] = useState([]);
  const [boxes, dispatch] = useReducer(boxesReducer, {
    INITIAL_BOXES,
    filtered: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await Supabase.from("selfCareBoxes").select("*");

      dispatch({ type: "getBoxes", value: response.data });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const handleFilterBoxes = () => {
      dispatch({
        type: "filtered",
        value: value,
      });
    };
    handleFilterBoxes();
  }, [value]);

  const [fontsLoaded] = useFonts({
    Montserrat: require("../assets/Fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../assets/Fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("../assets/Fonts/Montserrat-Medium.ttf"),
    "Montserrat-Italic": require("../assets/Fonts/Montserrat-Italic.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <BoxesContext.Provider value={boxes}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <SafeAreaView style={styles.container}>
          <Link
            href={{
              pathname: "/NewBox",
            }}
            asChild
          >
            <Pressable style={styles.addButton}>
              <AntDesign name="pluscircleo" size={25} color="black" />
            </Pressable>
          </Link>

          <View style={styles.header}>
            <Text style={styles.headerText}>Your self care boxes</Text>
          </View>
          <View style={styles.body}>
            <SegmentedButtons
              multiSelect={true}
              onValueChange={setValue}
              value={value}
              style={styles.segmentedButton}
              buttons={[
                {
                  value: "Starred",
                  label: "Starred",
                  labelStyle: styles.buttonLabelText,

                  style: { backgroundColor: "#CEDC9D" },
                  showSelectedCheck: true,
                },
                {
                  value: "Morning",
                  label: "Morning",
                  labelStyle: styles.buttonLabelText,
                  style: { backgroundColor: "#CEDC9D" },
                  showSelectedCheck: true,
                },
                {
                  value: "Day",
                  label: "Day",
                  labelStyle: styles.buttonLabelText,
                  style: { backgroundColor: "#CEDC9D" },
                  showSelectedCheck: true,
                },
                {
                  value: "Night",
                  label: "Night",
                  labelStyle: styles.buttonLabelText,
                  style: { backgroundColor: "#CEDC9D" },
                  showSelectedCheck: true,
                },
              ]}
            />

            <BoxList />
          </View>

          <StatusBar style="auto" />
        </SafeAreaView>
      </View>
    </BoxesContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    paddingBottom: 20,
    alignSelf: "flex-start",
    paddingLeft: 20,
    paddingTop: 10,
  },
  addButton: {
    alignSelf: "flex-end",
    paddingRight: 20,
    paddingTop: 5,
  },
  headerText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 28,
    textAlign: "left",
  },
  segmentedButton: {
    width: "90%",
  },
  buttonLabelText: {
    fontSize: 12,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});
