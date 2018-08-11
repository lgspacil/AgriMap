import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";

import ListItem from "../ListItem/ListItem";

const placeList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.farms}
      renderItem={(info) => (
        <ListItem
          key={info.item._id}
          farmName={info.item.name}
          farmCoords={info.item.coords}
          // calling a function automatically
          onItemPressed={() => props.onItemSelected(info.item._id)}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default placeList;
