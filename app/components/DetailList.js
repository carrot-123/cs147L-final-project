import { StyleSheet, Text } from "react-native";

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
