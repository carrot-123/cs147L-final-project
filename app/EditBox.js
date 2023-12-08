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
import Supabase from "./Supabase.js";

export default function EditBox() {
  const params = useLocalSearchParams();

  const [nameText, setNameText] = useState(undefined);
  const [timeText, setTimeText] = useState(undefined);
  const [descText, setDescText] = useState(undefined);
  const [routineText, setRoutineText] = useState(undefined);
  const [itemsText, setItemsText] = useState(undefined);
  const [playlistsText, setPlaylistsText] = useState(undefined);
  const [wordsText, setWordsText] = useState(undefined);
  const [save, setSave] = useState(false);

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const pickerRef = useRef();
  const update = async () => {
    if (nameText) {
      const { error } = await Supabase.from("selfCareBoxes")
        .update({ name: nameText })
        .eq("id", params.id);
    }
    if (timeText) {
      const { error } = await Supabase.from("selfCareBoxes")
        .update({ time: timeText })
        .eq("id", params.id);
    }
    if (descText) {
      const { error } = await Supabase.from("selfCareBoxes")
        .update({ desc: descText })
        .eq("id", params.id);
    }
    if (routineText) {
      const { error } = await Supabase.from("selfCareBoxes")
        .update({ routine: routineText.split("\n") })
        .eq("id", params.id);
    }
    if (itemsText) {
      const { error } = await Supabase.from("selfCareBoxes")
        .update({ itemsNeeded: itemsText.split("\n") })
        .eq("id", params.id);
    }
    if (playlistsText) {
      const { error } = await Supabase.from("selfCareBoxes")
        .update({ playlists: playlistsText.split("\n") })
        .eq("id", params.id);
    }
    if (wordsText) {
      const { error } = await Supabase.from("selfCareBoxes")
        .update({ words: wordsText })
        .eq("id", params.id);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link
              href={{
                pathname: "/DetailScreen",
                params: {
                  id: params.id,
                  name: nameText ? nameText : params.name,
                  time: timeText ? timeText : params.time,
                  desc: descText ? descText : params.desc,
                  routine: routineText
                    ? routineText.split("\n")
                    : params.routine,
                  itemsNeeded: itemsText
                    ? itemsText.split("\n")
                    : params.itemsNeeded,
                  playlists: playlistsText
                    ? playlistsText.split("\n")
                    : params.playlists,
                  words: wordsText ? wordsText : params.words,
                },
              }}
              asChild
            >
              <Pressable
                onPress={() => {
                  update();
                  setSave(true);
                }}
              >
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
                defaultValue={params.name}
                onChangeText={(text) => setNameText(text)}
                value={nameText}
              />
              <View style={styles.radioButtonSection}>
                <Text style={[styles.label, { fontSize: 15 }]}>Time</Text>
                <RadioButton.Group
                  onValueChange={(timeText) => setTimeText(timeText)}
                  value={timeText}
                  defaultValue={params.time}
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
              <Pressable onPress={showDialog} style={styles.deleteButton}>
                <Text style={{ fontFamily: "Montserrat", color: "red" }}>
                  Delete Box
                </Text>
              </Pressable>
            </View>
            <FAB
              label="Change cover"
              style={styles.fab}
              mode="flat"
              onPress={showDialog}
              color="white"
              backgroundColor="rgba(0, 0, 0, 0.8)"
              customSize={25}
            />

            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Delete this box?</Dialog.Title>

                <Dialog.Actions>
                  <Pressable onPress={hideDialog}>
                    <Text>Cancel</Text>
                  </Pressable>
                  <Pressable onPress={hideDialog}>
                    <Text>Delete</Text>
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
