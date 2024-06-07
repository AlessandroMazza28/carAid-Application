import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import COLORS from "../constants/colors";

const offers = [
  { id: "1", question: "Question from Mai" },
  { id: "2", question: "Question from Mai" },
  { id: "3", question: "Question from Mai" },
  { id: "4", question: "Question from Mai" },
];

const OffersScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.offerItem}
      onPress={() => navigation.navigate("OfferDetailsScreen", { offer: item })}
    >
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/1073/1073801.png",
        }}
        style={styles.userIcon}
      />
      <Text style={styles.offerText}>{item.question}</Text>
      <TouchableOpacity style={styles.arrowButton}>
        <Text style={styles.arrowText}>{">"}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Offers</Text>
      <FlatList
        data={offers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  offerItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  offerText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});

export default OffersScreen;
