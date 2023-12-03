import { FlatList } from "react-native";
import BoxesContext from "../BoxesContext";
import { useContext } from "react";
import SelfCareBox from "./SelfCareBox";

export default function BoxList() {
  const boxes = useContext(BoxesContext);
  const renderBox = ({ item, index }) => (
    <SelfCareBox
      index={index}
      name={item.name}
      time={item.time}
      desc={item.desc}
    />
  );
  return (
    <FlatList
      data={boxes}
      renderItem={({ item, index }) => renderBox({ item, index })}
      keyExtractor={(item) => item.index}
    />
  );
}
