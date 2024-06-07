import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import COLORS from "../constants/colors";

const trafficData = [
  { id: "1", count: 1, price: "$40.25" },
  { id: "2", count: 1, price: "$20.00" },
  { id: "3", count: 1, price: "$400.50" },
  { id: "4", count: 1, price: "$400.50" },
  { id: "5", count: 1, price: "$40.25" },
  { id: "6", count: 1, price: "$20.00" },
];

const Traffic = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemCount}>{item.count}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Traffics</Text>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: "https://dummyimage.com/600x400/000/fff&text=Traffic+Chart",
        }}
        resizeMode="contain"
      />
      <FlatList
        data={trafficData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  header: {
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 5,
  },
  itemCount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.grey,
    marginHorizontal: 20,
  },
});

export default Traffic;
