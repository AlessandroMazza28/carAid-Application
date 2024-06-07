import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";

const ShopListScreen = ({ navigation, route }) => {
  const { sparePartsShops } = route.params;
  const [search, setSearch] = useState("");
  const [filteredShops, setFilteredShops] = useState(sparePartsShops);

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = sparePartsShops.filter((item) => {
        const itemData = item.username ? item.username.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredShops(newData);
    } else {
      setFilteredShops(sparePartsShops);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.shopItem}
      onPress={() => navigation.navigate("ShopDetailScreen", { shop: item.username })}
    >
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3593/3593767.png",
        }}
        style={styles.shopLogo}
      />
      <Text style={styles.shopName}>{item.username}</Text>
      <TouchableOpacity style={styles.arrowButton}>
        <Text style={styles.arrowText}>{">"}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Shop"
        value={search}
        onChangeText={(text) => handleSearch(text)}
      />
      <FlatList
        data={filteredShops}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  searchBar: {
    height: 50,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    margin: 10,
    backgroundColor: "#FFFFFF",
  },
  shopItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
    height: 90,
  },
  shopLogo: {
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  shopName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ShopListScreen;
