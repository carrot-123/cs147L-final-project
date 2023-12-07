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

export default function EditBox() {
  const params = useLocalSearchParams();
  const [visible, setVisible] = useState(false);

  const [value, setValue] = useState("first");
  const [nameText, setnameText] = useState(undefined);
  const [timeText, setTimeText] = useState(undefined);
  const [descText, setDescText] = useState(undefined);
  const [routineText, setRoutineText] = useState(undefined);
  const [itemsText, setItemsText] = useState(undefined);
  const [playlistsText, setPlaylistsText] = useState(undefined);
  const [wordsText, setWordsText] = useState(undefined);

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

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
              defaultValue={params.name}
              onChangeText={(text) => nameText(text)}
              value={nameText}
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
              onChangeText={(text) => setDescText(text)}
              defaultValue={params.desc}
              value={descText}
            />
            <TextInput
              style={styles.body}
              mode="flat"
              label={<Text style={styles.label}>Self Care Routine</Text>}
              multiline={true}
              onChangeText={(text) => setRoutineText(text)}
              defaultValue={params.routine.replaceAll(",", "\n")}
              value={routineText}
            />
            <TextInput
              style={styles.body}
              mode="flat"
              label={<Text style={styles.label}>Items Neeeded</Text>}
              multiline={true}
              onChangeText={(text) => setItemsText(text)}
              defaultValue={params.itemsNeeded.replaceAll(",", "\n")}
              value={itemsText}
            />
            <TextInput
              style={styles.body}
              mode="flat"
              label={<Text style={styles.label}>Recommended Playlists</Text>}
              multiline={true}
              onChangeText={(text) => setPlaylistsText(text)}
              defaultValue={params.playlists.replaceAll(",", "\n")}
              value={playlistsText}
            />
            <TextInput
              style={styles.body}
              mode="flat"
              label={<Text style={styles.label}>Words of Affirmation</Text>}
              multiline={true}
              onChangeText={(text) => setWordsText(text)}
              defaultValue={params.words}
              value={wordsText}
            />
            <Pressable style={styles.deleteButton}>
              <Text style={{ fontFamily: "Montserrat", color: "red" }}>
                Delete Box
              </Text>
            </Pressable>
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
        </KeyboardAwareScrollView>
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
  deleteButton: {
    border: 1,
    borderWidth: 1,
    padding: 10,
    borderColor: "red",
    marginLeft: 10,
  },
  buttonLabelText: {
    fontSize: 12,
  },
});
