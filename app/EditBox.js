import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  FlatList,
  AsyncStorage,
  Button,
} from "react-native";
import { useCallback, useReducer, useState, useEffect } from "react";
import {
  SegmentedButtons,
  Icon,
  useTheme,
  FAB,
  TextInput,
  Menu,
  PaperProvider,
} from "react-native-paper";
import { Images, Themes } from "../assets/Themes/index.js";
import { useFonts } from "expo-font";
import SelfCareBox from "./components/SelfCareBox.js";
import BoxList from "./components/BoxList.js";
import BoxesContext from "./BoxesContext.js";
import DetailList from "./components/DetailList.js";
import { AntDesign } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Link } from "expo-router";

export default function EditBox() {
  const params = useLocalSearchParams();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  console.log(params.routine);
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link
              href={{
                pathname: "/DetailScreen",
                params: {
                  index: params.index,
                  name: params.name,
                  time: params.time,
                  desc: params.desc,
                  routine: params.routine,
                  itemsNeeded: params.itemsNeeded,
                  playlists: params.playlists,
                  words: params.words,
                },
              }}
              asChild
            >
              <Pressable>
                <Text>Save</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.imgHeader}></View>
          <View style={styles.infoContainer}>
            <View>
              <TextInput
                style={styles.headerText}
                mode="outlined"
                label="Name"
                multiline={true}
                value={params.name}
              />
              <View
                style={{
                  paddingTop: 50,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <PaperProvider>
                  <View>
                    <Menu
                      visible={visible}
                      onDismiss={closeMenu}
                      style={{ zIndex: 100 }}
                      anchor={
                        <Pressable onPress={openMenu}>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 2,
                              maxHeight: 40,
                            }}
                          >
                            <AntDesign
                              name="clockcircle"
                              size={25}
                              color="#CEDC9D"
                            />
                            <Text style={styles.body}>{params.time}</Text>
                          </View>
                        </Pressable>
                      }
                    >
                      <Menu.Item
                        onPress={() => {
                          closeMenu();
                        }}
                        title="Morning"
                      />
                      <Menu.Item
                        onPress={() => {
                          closeMenu();
                        }}
                        title="Day"
                      />
                      <Menu.Item
                        onPress={() => {
                          closeMenu();
                        }}
                        title="Night"
                      />
                      <Menu.Item
                        onPress={() => {
                          closeMenu();
                        }}
                        title="Anytime"
                      />
                    </Menu>
                  </View>
                </PaperProvider>
              </View>
              <TextInput
                style={styles.headerText}
                mode="outlined"
                label="Description"
                multiline={true}
                value={params.desc}
              />
              <View
                style={{
                  paddingTop: 50,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              ></View>
            </View>
            <TextInput
              style={styles.body}
              mode="outlined"
              label="Self Care Routine"
              multiline={true}
              value={params.routine.replaceAll(",", "\n")}
            />
            <TextInput
              style={styles.body}
              mode="outlined"
              label="Items Needed"
              multiline={true}
              value={params.itemsNeeded.replaceAll(",", "\n")}
            />
            <TextInput
              style={styles.body}
              mode="outlined"
              label="Recommended Playlists"
              multiline={true}
              value={params.playlists.replaceAll(",", "\n")}
            />
            <TextInput
              style={styles.body}
              mode="outlined"
              label="Words of Affirmation"
              multiline={true}
              value={params.words}
            />
          </View>
          <FAB
            label="Change cover"
            style={styles.fab}
            mode="flat"
            onPress={() => console.log("Pressed")}
            color="white"
            backgroundColor="rgba(0, 0, 0, 0.8)"
            customSize={25}
          />
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
    marginTop: 20,
    marginLeft: 10,
    left: 0,
    top: 0,
    padding: 0,
    margin: 0,
  },
  segmentedButton: {
    width: "90%",
  },
  buttonLabelText: {
    fontSize: 12,
  },
});
