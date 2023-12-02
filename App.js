import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import { useCallback, useState } from "react";
import { SegmentedButtons, Icon, useTheme } from "react-native-paper";
import { Images, Themes } from "./assets/Themes";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import SelfCareBox from "./SelfCareBox.js";

const boxes = [
  {
    id: "1",
    name: "Finals Weekend",
    time: "DAY",
    desc: "For that rough time before finals.",
  },
  {
    id: "2",
    name: "For a Good Night's Sleep",
    time: "NIGHT",
    desc: "I want to sleep ;-;",
  },
  {
    id: "3",
    name: "For when I am sad",
    time: "ANYTIME",
    desc: "I will provide better descriptions",
  },
  {
    id: "4",
    name: "Finals Weekend",
    time: "day",
    desc: "For that rough time before finals.",
  },
];

SplashScreen.preventAutoHideAsync();
export default function App() {
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

  const renderBox = ({ item, index }) => (
    <SelfCareBox
      index={index}
      name={item.name}
      time={item.time}
      desc={item.desc}
    />
  );

  return (
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
              },
              {
                label: "Day",
                labelStyle: styles.buttonLabelText,
              },
              {
                label: "Night",
                labelStyle: styles.buttonLabelText,
              },
              {
                label: "Anytime",
                labelStyle: styles.buttonLabelText,
              },
            ]}
          />

          <FlatList
            data={boxes}
            renderItem={({ item, index }) => renderBox({ item, index })}
            keyExtractor={(item) => item.index}
          />
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    </View>
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
  },
});
