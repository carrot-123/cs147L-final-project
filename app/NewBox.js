import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
  KeyboardAvoidingView,
} from "react-native";
import { useCallback, useReducer, useState, useRef, useEffect } from "react";

import {
  SegmentedButtons,
  Icon,
  useTheme,
  FAB,
  TextInput,
  Menu,
  PaperProvider,
  RadioButton,
  Dialog,
  Portal,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { Images, Themes } from "../assets/Themes/index.js";
import { useFonts } from "expo-font";
import SelfCareBox from "./components/SelfCareBox.js";
import BoxList from "./components/BoxList.js";
import BoxesContext from "./BoxesContext.js";
import DetailList from "./components/DetailList.js";
import { AntDesign } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Link } from "expo-router";

export default function NewBox() {
  const params = useLocalSearchParams();
  const [visible, setVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [value, setValue] = useState("first");
  const [text, setText] = useState(undefined);
  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link
              href={{
                pathname: "/Home",
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
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <KeyboardAwareScrollView
            contentContainerStyle={{ paddingBottom: 60 }}
            extraScrollHeight={50}
          >
            <View style={styles.imgHeader}></View>
            <View style={styles.infoContainer}>
              <TextInput
                style={styles.body}
                mode="flat"
                label={<Text style={styles.label}>Name</Text>}
                multiline={true}
                onChangeText={(text) => setText(text)}
                value={text}
                placeholder="The name of your self care box"
              />
              <View style={styles.radioButtonSection}>
                <Text style={[styles.label, { fontSize: 15 }]}>Time</Text>
                <RadioButton.Group
                  onValueChange={(newValue) => setValue(newValue)}
                  value={value}
                >
                  <View style={styles.radioButtons}>
                    <Text style={styles.radioButtonText}>Morning</Text>
                    <RadioButton value="Morning" />
                  </View>
                  <View style={styles.radioButtons}>
                    <Text style={styles.radioButtonText}>Day</Text>
                    <RadioButton value="Day" />
                  </View>
                  <View style={styles.radioButtons}>
                    <Text style={styles.radioButtonText}>Night</Text>
                    <RadioButton value="Night" />
                  </View>
                  <View style={styles.radioButtons}>
                    <Text style={styles.radioButtonText}>Anytime</Text>
                    <RadioButton value="Anytime" />
                  </View>
                </RadioButton.Group>
              </View>

              <TextInput
                style={styles.body}
                mode="flat"
                label={<Text style={styles.label}>Description</Text>}
                multiline={true}
                onChangeText={(text) => setText(text)}
                value={text}
                placeholder={"A quick description of this self care box"}
              />
              <TextInput
                style={styles.body}
                mode="flat"
                label={<Text style={styles.label}>Self Care Routine</Text>}
                multiline={true}
                onChangeText={(text) => setText(text)}
                value={text}
                placeholder={
                  "A list of some self care activities\nPut each item on its own line"
                }
              />
              <TextInput
                style={styles.body}
                mode="flat"
                label={<Text style={styles.label}>Items Neeeded</Text>}
                multiline={true}
                onChangeText={(text) => setText(text)}
                value={text}
                placeholder={
                  "A list of items for self care\nPut each item on its own line"
                }
              />
              <TextInput
                style={styles.body}
                mode="flat"
                label={<Text style={styles.label}>Recommended Playlists</Text>}
                multiline={true}
                onChangeText={(text) => setText(text)}
                value={text}
                placeholder={
                  "Some playlists to watch or listen to\nPut each item on its own line"
                }
              />
              <TextInput
                style={styles.body}
                mode="flat"
                label={<Text style={styles.label}>Words of Affirmation</Text>}
                multiline={true}
                value={params.words}
                placeholder="Some affirming words or quotes"
              />
            </View>
            <FAB
              label="Set cover"
              style={styles.fab}
              mode="flat"
              onPress={() => console.log("Pressed")}
              color="white"
              backgroundColor="rgba(0, 0, 0, 0.8)"
              customSize={25}
            />
            <Portal>
              <Dialog
                visible={visible}
                onDismiss={hideDialog}
                style={styles.dialog}
              >
                <Dialog.Title style={styles.label}>
                  Leave without Saving?
                </Dialog.Title>

                <Dialog.Actions>
                  <Pressable onPress={hideDialog}>
                    <Text>Cancel</Text>
                  </Pressable>
                  <Pressable onPress={hideDialog}>
                    <Text style={{ color: "red" }}>Leave</Text>
                  </Pressable>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </PaperProvider>
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
    backgroundColor: "white",
  },

  body: {
    fontFamily: "Montserrat",
    fontSize: 16,
    backgroundColor: "white",
    width: "100%",
    paddingBottom: 5,
  },
  radioButtonText: {
    fontFamily: "Montserrat",
    fontSize: 14,
    backgroundColor: "white",
  },
  label: {
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
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

  radioButtonSection: {
    flex: 1,
    paddingLeft: 20,
    width: "100%",
  },
  radioButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 30,
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
  dialog: {
    backgroundColor: "white",
    borderRadius: 6,
  },
});
