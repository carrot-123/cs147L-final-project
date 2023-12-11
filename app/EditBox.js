import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import {
  FAB,
  TextInput,
  PaperProvider,
  RadioButton,
  Dialog,
  Portal,
  HelperText,
} from "react-native-paper";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";

import Themes from "../assets/Themes/themes.js";
import Supabase from "./Supabase.js";

export default function EditBox() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const url1 = Supabase.storage.from("coverImages").getPublicUrl("cover1.jpeg");
  const image1 = {
    uri: url1.data.publicUrl,
  };
  const url2 = Supabase.storage.from("coverImages").getPublicUrl("cover2.jpeg");
  const image2 = {
    uri: url2.data.publicUrl,
  };
  const url3 = Supabase.storage.from("coverImages").getPublicUrl("cover3.jpeg");
  const image3 = {
    uri: url3.data.publicUrl,
  };
  const url4 = Supabase.storage.from("coverImages").getPublicUrl("cover4.jpeg");
  const image4 = {
    uri: url4.data.publicUrl,
  };
  const url5 = Supabase.storage.from("coverImages").getPublicUrl("cover5.jpeg");
  const image5 = {
    uri: url5.data.publicUrl,
  };

  const [chosenImage, setChosenImage] = useState(params.coverImg);
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

  const [coverVisible, setCoverVisible] = useState(false);
  const showCoverDialog = () => setCoverVisible(true);
  const hideCoverDialog = () => setCoverVisible(false);

  const [url, setUrl] = useState(
    Supabase.storage.from("coverImages").getPublicUrl(params.coverImg)
  );
  const [image, setImage] = useState({
    uri: url.data.publicUrl,
  });

  useEffect(() => {
    const setCover = async () => {
      await Supabase.from("selfCareBoxes")
        .update({ coverImg: chosenImage })
        .eq("id", params.id);
      setUrl(Supabase.storage.from("coverImages").getPublicUrl(chosenImage));
    };
    setCover();
    hideCoverDialog();
  }, [chosenImage]);

  useEffect(() => {
    setImage({ uri: url.data.publicUrl });
  }, [url]);

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
        coverImg: chosenImage, // change later
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
            contentContainerStyle={{ paddingBottom: 30 }}
            extraScrollHeight={50}
            style={{ width: "100%" }}
          >
            <Image source={image} style={styles.imgHeader} />
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
              onPress={showCoverDialog}
              color={Themes.colors.white}
              backgroundColor="black"
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
                    <Text style={{ color: "red", padding: 5 }}>Delete</Text>
                  </Pressable>
                </Dialog.Actions>
              </Dialog>
            </Portal>
            <Portal>
              <Dialog
                visible={coverVisible}
                onDismiss={hideCoverDialog}
                style={styles.dialog}
              >
                <Dialog.Title style={styles.label}>
                  Choose a new cover image:
                </Dialog.Title>
                <Dialog.Actions>
                  <ScrollView>
                    <Pressable onPress={() => setChosenImage("cover1.jpeg")}>
                      <Image source={image1} style={styles.button} />
                    </Pressable>
                    <Pressable onPress={() => setChosenImage("cover2.jpeg")}>
                      <Image source={image2} style={styles.button} />
                    </Pressable>
                    <Pressable onPress={() => setChosenImage("cover3.jpeg")}>
                      <Image source={image3} style={styles.button} />
                    </Pressable>
                    <Pressable onPress={() => setChosenImage("cover4.jpeg")}>
                      <Image source={image4} style={styles.button} />
                    </Pressable>
                    <Pressable onPress={() => setChosenImage("cover5.jpeg")}>
                      <Image source={image5} style={styles.button} />
                    </Pressable>
                  </ScrollView>
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
    backgroundColor: "#CEDC9D",
    width: "100%",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Themes.colors.white,
    width: "100%",
  },
  body: {
    fontFamily: "Montserrat",
    fontSize: 16,
    backgroundColor: Themes.colors.offWhite,
    width: "100%",
    paddingBottom: 5,
  },
  radioButtonText: {
    fontFamily: "Montserrat",
    fontSize: 14,
  },
  label: {
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
  },
  infoContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  radioButtonSection: {
    flex: 1,
    paddingLeft: 25,
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
    marginLeft: 25,
    alignSelf: "flex-start",
  },
  buttonLabelText: {
    fontSize: 12,
  },
  dialog: {
    backgroundColor: Themes.colors.white,
    borderRadius: 6,
  },
  deleteFont: {
    color: "red",
    fontFamily: "Montserrat",
  },
  button: {
    marginTop: 20,
    width: 270,
    height: 90,
    backgroundColor: Themes.colors.white,
    borderRadius: 6,
    alignSelf: "center",
  },
});
