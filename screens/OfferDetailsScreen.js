import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import COLORS from "../constants/colors";

const OfferDetailsScreen = ({ route }) => {
  const { offer } = route.params;

  return (
    <View style={styles.container}>
      <Image
      source={{
          uri: "https://cdn-icons-png.flaticon.com/512/1073/1073801.png",
        }}
        style={styles.profileImage}
      />
      <Text style={styles.question}>Question from {offer.name}</Text>
      <Text style={styles.descriptionTitle}>Description of car</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare leo non
        mollis id cursus. Eu euismod faucibus in leo.
      </Text>
      <Text style={styles.questionTitle}>Question</Text>
      <Text style={styles.questionText}>Wheels for Toyota are Available</Text>
      <Text style={styles.answerTitle}>Your Answer</Text>
      <View style={styles.answerBox}>
        <Text style={styles.answerText}>Wheels for Toyota are Available</Text>
        <Text style={styles.arrowText}>{">"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: COLORS.white,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 20,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  questionText: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 20,
  },
  answerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  answerBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 30,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  answerText: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});

export default OfferDetailsScreen;
