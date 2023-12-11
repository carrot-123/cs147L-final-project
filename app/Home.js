import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { useCallback, useReducer, useState, useEffect } from "react";
import { SegmentedButtons } from "react-native-paper";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { Link } from "expo-router";

import { Themes } from "../assets/Themes/index.js";
import BoxList from "./components/BoxList.js";
import BoxesContext from "./BoxesContext.js";
import Supabase from "./Supabase.js";

const INITIAL_BOXES = [];

const boxesReducer = (boxes, action) => {
  if (action.type === "filtered") {
    if (action.value.length === 0) {
      return {
        ...boxes,
        filtered: ["None"],
      };
    }
    return {
      ...boxes,
      filtered: boxes.newBoxes.filter((box) => {
        if (action.value.length === 1 && action.value.includes("Starred")) {
          return box.starred;
        } else if (action.value.includes("Starred")) {
          return (
            (box.starred && action.value.includes(box.time)) ||
            (box.starred && box.time === "Anytime")
          );
        } else {
          return action.value.includes(box.time) || box.time === "Anytime";
        }
      }),
    };
  } else if (action.type === "getBoxes") {
    const newBoxes = action.value;
    return { newBoxes, filtered: ["None"] };
  } else if (action.type === "updateStar") {
    var newBoxes = boxes.newBoxes.map((box) => {
      if (box.id === action.id) {
        return action.newValue[0];
      } else {
        return box;
      }
    });
    return {
      newBoxes,
      filtered: ["None"],
    };
  } else {
    console.error("Unrecognized action", action.type);
  }
};

SplashScreen.preventAutoHideAsync();

export default function Home() {
  const isFocused = useIsFocused();

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
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  useEffect(() => {
    const handleFilterBoxes = () => {
      dispatch({
        type: "filtered",
        value: value,
      });
    };
    handleFilterBoxes();
  }, [value]);

  const updateStar = (id, newValue) => {
    dispatch({ type: "updateStar", value: boxes, id: id, newValue: newValue });
  };

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
                  style: { backgroundColor: Themes.colors.white },
                  showSelectedCheck: true,
                },
                {
                  value: "Morning",
                  label: "Morning",
                  labelStyle: styles.buttonLabelText,
                  style: { backgroundColor: Themes.colors.white },
                  showSelectedCheck: true,
                },
                {
                  value: "Day",
                  label: "Day",
                  labelStyle: styles.buttonLabelText,
                  style: { backgroundColor: Themes.colors.white },
                  showSelectedCheck: true,
                },
                {
                  value: "Night",
                  label: "Night",
                  labelStyle: styles.buttonLabelText,
                  style: { backgroundColor: Themes.colors.white },
                  showSelectedCheck: true,
                },
              ]}
            />
            <BoxList updateStar={updateStar} />
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
    backgroundColor: Themes.colors.white,
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
