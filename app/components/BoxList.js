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
      routine={item.routine}
      itemsNeeded={item.itemsNeeded}
      playlists={item.playlists}
      words={item.words}
    />
  );

  if (boxes.filtered.length !== 0 && boxes.filtered[0] === "None") {
    return (
      <FlatList
        data={boxes.INITIAL_BOXES}
        renderItem={({ item, index }) => renderBox({ item, index })}
        keyExtractor={(item) => item.index}
      />
    );
  } else {
    return (
      <FlatList
        data={boxes.filtered}
        renderItem={({ item, index }) => renderBox({ item, index })}
        keyExtractor={(item) => item.index}
      />
    );
  }
}
