import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { useState } from "react";

import {
  FAB,
  TextInput,
  PaperProvider,
  RadioButton,
  Dialog,
  Portal,
  HelperText,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import Supabase from "./Supabase.js";

export default function EditBox() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [nameText, setNameText] = useState(undefined);
  const [timeText, setTimeText] = useState(undefined);
  const [descText, setDescText] = useState(undefined);
  const [routineText, setRoutineText] = useState(undefined);
  const [itemsText, setItemsText] = useState(undefined);
  const [playlistsText, setPlaylistsText] = useState(undefined);
  const [wordsText, setWordsText] = useState(undefined);

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const hasErrors = (text) => {
    return text === "";
  };

  const disableSave = () => {
    if (
      hasErrors(nameText) ||
      hasErrors(descText) ||
      hasErrors(routineText) ||
      hasErrors(itemsText) ||
      hasErrors(playlistsText) ||
      hasErrors(wordsText)
    ) {
      return true;
    }
    return false;
  };

  const deleteBox = async () => {
    const { error } = await Supabase.from("selfCareBoxes")
      .delete()
      .eq("id", params.id);

    router.push("/Home");
  };

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
    router.push({
      pathname: "/DetailScreen",
      params: {
        id: params.id,
        name: nameText ? nameText : params.name,
        time: timeText ? timeText : params.time,
        desc: descText ? descText : params.desc,
        routine: routineText ? routineText.split("\n") : params.routine,
        itemsNeeded: itemsText ? itemsText.split("\n") : params.itemsNeeded,
        playlists: playlistsText ? playlistsText.split("\n") : params.playlists,
        words: wordsText ? wordsText : params.words,
      },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              disabled={disableSave()}
              onPress={() => {
                update();
              }}
              style={{ opacity: disableSave() ? 0.25 : 1 }}
            >
              <Text>Save</Text>
            </Pressable>
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
              <View style={{ width: "90%" }}>
                <TextInput
                  style={styles.body}
                  mode="flat"
                  label={<Text style={styles.label}>Name</Text>}
                  multiline={true}
                  defaultValue={params.name}
                  onChangeText={(text) => setNameText(text)}
                  value={nameText}
                />
                <HelperText type="error" visible={hasErrors(nameText)}>
                  Please provide a name
                </HelperText>
              </View>

              <View style={styles.radioButtonSection}>
                <Text style={[styles.label, { fontSize: 15 }]}>Time</Text>
                <RadioButton.Group
                  onValueChange={(text) => setTimeText(text)}
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
              <View style={{ width: "90%" }}>
                <TextInput
                  style={styles.body}
                  mode="flat"
                  label={<Text style={styles.label}>Description</Text>}
                  multiline={true}
                  onChangeText={(text) => setDescText(text)}
                  defaultValue={params.desc}
                  value={descText}
                />
                <HelperText type="error" visible={hasErrors(descText)}>
                  Please provide a description
                </HelperText>
              </View>
              <View style={{ width: "90%" }}>
                <TextInput
                  style={styles.body}
                  mode="flat"
                  label={<Text style={styles.label}>Self Care Routine</Text>}
                  multiline={true}
                  onChangeText={(text) => setRoutineText(text)}
                  defaultValue={params.routine.replaceAll(",", "\n")}
                  value={routineText}
                />
                <HelperText type="error" visible={hasErrors(routineText)}>
                  Please provide a routine
                </HelperText>
              </View>
              <View style={{ width: "90%" }}>
                <TextInput
                  style={styles.body}
                  mode="flat"
                  label={<Text style={styles.label}>Items Neeeded</Text>}
                  multiline={true}
                  onChangeText={(text) => setItemsText(text)}
                  defaultValue={params.itemsNeeded.replaceAll(",", "\n")}
                  value={itemsText}
                />
                <HelperText type="error" visible={hasErrors(itemsText)}>
                  Please provide a list of items
                </HelperText>
              </View>
              <View style={{ width: "90%" }}>
                <TextInput
                  style={styles.body}
                  mode="flat"
                  label={
                    <Text style={styles.label}>Recommended Playlists</Text>
                  }
                  multiline={true}
                  onChangeText={(text) => setPlaylistsText(text)}
                  defaultValue={params.playlists.replaceAll(",", "\n")}
                  value={playlistsText}
                />
                <HelperText type="error" visible={hasErrors(playlistsText)}>
                  Please provide a playlist
                </HelperText>
              </View>
              <View style={{ width: "90%" }}>
                <TextInput
                  style={styles.body}
                  mode="flat"
                  label={<Text style={styles.label}>Words of Affirmation</Text>}
                  multiline={true}
                  onChangeText={(text) => setWordsText(text)}
                  defaultValue={params.words}
                  value={wordsText}
                />
                <HelperText type="error" visible={hasErrors(wordsText)}>
                  Please provide some affirming words
                </HelperText>
              </View>
              <Pressable onPress={showDialog} style={styles.deleteButton}>
                <Text style={styles.deleteFont}>Delete Box</Text>
              </Pressable>
            </View>
            <FAB
              label="Change cover"
              style={styles.fab}
              mode="flat"
              onPress={showDialog} // change this!
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
                  Delete this box?
                </Dialog.Title>

                <Dialog.Actions>
                  <Pressable onPress={hideDialog}>
                    <Text>Cancel</Text>
                  </Pressable>

                  <Pressable onPress={deleteBox}>
                    <Text style={{ color: "red" }}>Delete</Text>
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
  dialog: {
    backgroundColor: "white",
    borderRadius: 6,
  },
  deleteFont: {
    color: "red",
    fontFamily: "Montserrat",
  },
});
