import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  AsyncStorage,
} from "react-native";
import BoxesContext from "../BoxesContext";
import { useContext } from "react";
import SelfCareBox from "./SelfCareBox";
import { List } from "react-native-paper";

export default function DetailList({ listValues }) {
  const listValueArray = listValues.split(",");
  const listComponent = listValueArray.map((item) => (
    <Text key={item} style={styles.listText}>{`\u2022 ${item}`}</Text>
  ));
  return listComponent;
}

const styles = StyleSheet.create({
  listText: {
    fontFamily: "Montserrat",
    marginLeft: 20,
  },
});
