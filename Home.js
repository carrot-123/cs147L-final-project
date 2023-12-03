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
import { useCallback, useReducer, useState } from "react";
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
    time: "DAY",
    desc: "For that rough time before finals.",
    imageUrl: "",
    starred: false,
  },
  {
    id: 1,
    name: "For a Good Night's Sleep",
    time: "NIGHT",
    desc: "I want to sleep ;-;",
    imageUrl: "",
    starred: true,
  },
  {
    id: 2,
    name: "For when I am sad",
    time: "ANYTIME",
    desc: "I will provide better descriptions",
    imageUrl: "",
    starred: false,
  },
  {
    id: 3,
    name: "Finals Weekend",
    time: "day",
    desc: "For that rough time before finals.",
    imageUrl: "",
    starred: true,
  },
];

let currentId = 4;

const boxesReducer = (boxes, action) => {
  console.log(action);
};

SplashScreen.preventAutoHideAsync();
export default function Home() {
  const [boxes, setBoxes] = useState(INITIAL_BOXES);

  const [fontsLoaded] = useFonts({
    Montserrat: require("./assets/Fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./assets/Fonts/Montserrat-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  //const [boxes, dispatch] = useReducer(boxesReducer, INITIAL_BOXES);

  return (
    <BoxesContext.Provider value={boxes}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Your self care boxes</Text>
          </View>
          <View style={styles.body}>
            <SegmentedButtons
              style={styles.segmentedButton}
              buttons={[
                {
                  label: "Starred",

                  labelStyle: styles.buttonLabelText,

                  style: { backgroundColor: "#CEDC9D" },
                },
                {
                  label: "Day",
                  labelStyle: styles.buttonLabelText,
                  style: { backgroundColor: "#CEDC9D" },
                },
                {
                  label: "Night",
                  labelStyle: styles.buttonLabelText,
                  style: { backgroundColor: "#CEDC9D" },
                },
                {
                  label: "Anytime",
                  labelStyle: styles.buttonLabelText,
                  style: { backgroundColor: "#CEDC9D" },
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
