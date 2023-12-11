import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
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
import { useRouter, Link, Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Themes from "../assets/Themes/themes.js";
import Supabase from "./Supabase.js";

export default function NewBox() {
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

  const [chosenImage, setChosenImage] = useState(null);
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
      nameText === undefined ||
      descText === undefined ||
      routineText === undefined ||
      itemsText === undefined ||
      playlistsText === undefined ||
      wordsText === undefined ||
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

  const add = async () => {
    const { error } = await Supabase.from("selfCareBoxes").insert({
      name: nameText,
      desc: descText,
      time: timeText,
      routine: routineText.split("\n"),
      itemsNeeded: itemsText.split("\n"),
      playlists: playlistsText.split("\n"),
      words: wordsText,
      coverImg: chosenImage,
    });
    router.push("/Home");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              disabled={disableSave()}
              onPress={add}
              style={{ opacity: disableSave() ? 0.25 : 1 }}
            >
              <Text>Save</Text>
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => {
                showDialog();
              }}
            >
              <Text style={{ color: "red" }}>Cancel</Text>
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
                  onChangeText={(text) => setNameText(text)}
                  value={nameText}
                  placeholder="The name of your self care box"
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
                  defaultValue={"Anytime"}
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
                  value={descText}
                  placeholder={"A quick description of this self care box"}
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
                  value={routineText}
                  placeholder={
                    "A list of some self care activities\nPut each item on its own line"
                  }
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
                  value={itemsText}
                  placeholder={
                    "A list of items for self care\nPut each item on its own line"
                  }
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
                  value={playlistsText}
                  placeholder={
                    "Some playlists to watch or listen to\nPut each item on its own line"
                  }
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
                  value={params.words}
                  placeholder="Some affirming words or quotes"
                />
                <HelperText type="error" visible={hasErrors(wordsText)}>
                  Please provide some affirming words
                </HelperText>
              </View>
            </View>
            <FAB
              label="Set cover"
              style={styles.fab}
              mode="flat"
              onPress={showCoverDialog}
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
                  <Link href={{ pathname: "/Home" }} asChild>
                    <Pressable>
                      <Text style={{ color: "red", padding: 5 }}>Leave</Text>
                    </Pressable>
                  </Link>
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
    backgroundColor: "black",
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
    backgroundColor: Themes.colors.white,
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
  dialog: {
    backgroundColor: Themes.colors.white,
    borderRadius: 6,
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
