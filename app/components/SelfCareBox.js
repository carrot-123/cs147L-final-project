import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageBackground,
  ButtonIcon,
} from "react-native";
import { useCallback, useState, useEffect } from "react";
import { Icon, useTheme } from "react-native-paper";
import { Images, Themes } from "../../assets/Themes";
import { Link, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Supabase from "../Supabase";
export default function SelfCareBox({
  id,
  name,
  time,
  desc,
  routine,
  itemsNeeded,
  playlists,
  words,
  coverImg,
  starred,
  updateStar,
}) {
  const url = Supabase.storage.from("coverImages").getPublicUrl(coverImg);
  const image = {
    uri: url.data.publicUrl,
  };
  const [star, setStar] = useState(starred);
  const updateStarIcon = () => {
    setStar(!star);
  };
  useEffect(() => {
    const update = async () => {
      const { data, error } = await Supabase.from("selfCareBoxes")
        .update({ starred: star })
        .eq("id", id)
        .select();
      updateStar(id, data);
    };

    update();
  }, [star]);

  return (
    <View style={styles.item}>
      <Link
        href={{
          pathname: "/DetailScreen",
          params: {
            id: id,
            name: name,
            time: time,
            desc: desc,
            routine: routine,
            itemsNeeded: itemsNeeded,
            playlists: playlists,
            words: words,
            coverImg: coverImg,
          },
        }}
        asChild
      >
        <Pressable style={styles.button}>
          <ImageBackground imageStyle={styles.button} source={image}>
            <Pressable onPress={updateStarIcon} style={styles.starButton}>
              <AntDesign
                name={star ? "star" : "staro"}
                size={25}
                color={Themes.colors.white}
              />
            </Pressable>
          </ImageBackground>
        </Pressable>
      </Link>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            maxHeight: 40,
          }}
        >
          <AntDesign name="clockcircleo" size={20} color="black" />

          <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 14 }}>
            {time}
          </Text>
        </View>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: Themes.colors.white,
    marginVertical: 10,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    width: 300,
    marginTop: 20,
  },
  infoContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "flex-start",
    gap: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    backgroundColor: Themes.colors.white,
  },
  button: {
    width: "100%",
    height: 100,
    backgroundColor: Themes.colors.white,

    borderRadius: 6,
  },
  name: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  body: {
    fontFamily: "Montserrat",
  },
  desc: {
    fontFamily: "Montserrat",
  },
  starButton: {
    alignSelf: "flex-end",
    margin: 5,
  },
});
