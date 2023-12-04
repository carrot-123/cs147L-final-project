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
import { Images, Themes } from "./assets/Themes";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import SelfCareBox from "./components/SelfCareBox.js";
import BoxList from "./components/BoxList.js";
import BoxesContext from "./BoxesContext.js";

const INITIAL_BOXES = [
  {
    id: 0,
    name: "Finals Weekend",
    time: "Day",
    desc: "For that rough time before finals.",
    imageUrl: "",
    starred: false,
  },
  {
    id: 1,
    name: "For a Good Night's Sleep",
    time: "Night",
    desc: "I want to sleep ;-;",
    imageUrl: "",
    starred: true,
  },
  {
    id: 2,
    name: "For when I am sad",
    time: "Anytime",
    desc: "I will provide better descriptions",
    imageUrl: "",
    starred: false,
  },
  {
    id: 3,
    name: "Finals Weekend",
    time: "Day",
    desc: "For that rough time before finals.",
    imageUrl: "",
    starred: true,
  },
];

let currentId = 4;

const boxesReducer = (boxes, action) => {
  if (action.type === "filtered") {
    if (action.value.length === 0) {
      console.log("here");
      return {
        ...boxes,
        filtered: ["None"],
      };
    }
    return {
      ...boxes,
      filtered: boxes.INITIAL_BOXES.filter((box) => {
        if (action.value.length === 1 && action.value.includes("Starred")) {
          return box.starred;
        } else if (action.value.includes("Starred")) {
          console.log(action.value.includes(box.time));
          return box.starred && action.value.includes(box.time);
        } else {
          return action.value.includes(box.time) || box.time === "Anytime";
        }
      }),
    };
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

  const [fontsLoaded] = useFonts({
    Montserrat: require("./assets/Fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./assets/Fonts/Montserrat-Bold.ttf"),
  });
  useEffect(() => {
    const handleFilterBoxes = () => {
      dispatch({
        type: "filtered",
        value: value,
      });
    };
    handleFilterBoxes();
  }, [value]);
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
    gap: 60,
  },
  header: {
    //check this
    top: "5%",
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
