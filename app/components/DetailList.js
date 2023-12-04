import { FlatList, Text } from "react-native";
import BoxesContext from "../BoxesContext";
import { useContext } from "react";
import SelfCareBox from "./SelfCareBox";

export default function DetailList({ listValues }) {
  const listValueArray = listValues.split(",");
  return [listValueArray].map((item) => <Text>{item}</Text>);
}
