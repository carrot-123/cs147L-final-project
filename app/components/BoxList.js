import { FlatList } from "react-native";
import BoxesContext from "../BoxesContext";
import { useContext } from "react";
import SelfCareBox from "./SelfCareBox";

export default function BoxList({ updateStar }) {
  const boxes = useContext(BoxesContext);
  const renderBox = ({ item }) => (
    <SelfCareBox
      id={item.id}
      name={item.name}
      time={item.time}
      desc={item.desc}
      routine={item.routine}
      itemsNeeded={item.itemsNeeded}
      playlists={item.playlists}
      words={item.words}
      coverImg={item.coverImg}
      starred={item.starred}
      updateStar={updateStar}
    />
  );

  if (boxes.filtered.length !== 0 && boxes.filtered[0] === "None") {
    return (
      <FlatList
        data={boxes.newBoxes}
        renderItem={({ item }) => renderBox({ item })}
        keyExtractor={(item) => item.id}
      />
    );
  } else {
    return (
      <FlatList
        data={boxes.filtered}
        renderItem={({ item }) => renderBox({ item })}
        keyExtractor={(item) => item.id}
      />
    );
  }
}
