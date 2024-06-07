import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../constants/colors";

const ShopDetailScreen = ({ route, navigation }) => {
  const { shop } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/3593/3593767.png" }}
          style={styles.shopLogo}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.shopTitle}>{shop} for spare parts</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingLeft}>
            <Text style={styles.ratingStars}>★★★★☆</Text>
            <Text style={styles.ratingText}>4 Star Ratings</Text>
          </View>
          <Text style={styles.ratingSubText}>Based on Google Search</Text>
        </View>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.locationText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare leo non mollis id cursus. Eu euismod faucibus in leo.
        </Text>
        <View style={styles.offerContainer}>
          <View style={styles.greenBox}></View>
          <View style={styles.whiteBox}>
            <TouchableOpacity
              style={styles.offerButton}
              onPress={() => navigation.navigate("OffersScreen")}
            >
              <Text style={styles.offerButtonText}>Wheels for Toyota</Text>
              <View style={styles.offerArrowContainer}>
                <Text style={styles.offerArrowText}>{">"}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    flex: 1,
    marginTop: 30,
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 50,  // More rounded edges
    borderTopRightRadius: 50, // More rounded edges
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 }, // Adjusted shadow offset
    shadowOpacity: 0.6, // Adjusted shadow opacity
    shadowRadius: 10, // Adjusted shadow radius
    elevation: 5, // Increased elevation for shadow effect on Android
    width: '100%', // Ensures the card takes full width
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 24,
    color: COLORS.black,
  },
  shopLogo: {
    width: 100,
    height: 150,
  },
  shopTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 50, // Move shop name a bit to the bottom
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  ratingLeft: {
    flexDirection: 'column', // Change flex direction to column
    alignItems: 'center',
  },
  ratingStars: {
    fontSize: 24,
    color: COLORS.black,
    marginTop: 20,
  },
  ratingText: {
    fontSize: 16,
    color: COLORS.black,
    marginTop: 5, // Add some space between stars and text
    marginRight: 5,
  },
  ratingSubText: {
    fontSize: 14,
    color: COLORS.grey,
    textAlign: "right",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
  },
  locationText: {
    fontSize: 16,
    color: COLORS.black,
    marginTop: 20,
  },
  offerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Take up the remaining space
    marginTop: 30,
  },
  greenBox: {
    backgroundColor: 'green',
    opacity: 0.3, // Reduce opacity
    width: '35%',
    height: '100%',
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
  },
  whiteBox: {
    backgroundColor: COLORS.white,
    width: '85%',
    height: '70%',
    marginLeft: -60, // Overlap with the green box
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  offerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  offerButtonText: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: "bold",
  },
  offerArrowContainer: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.white,
    borderRadius: 15, // Makes the container circular
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2, // Add border to make it more visible
    borderColor: COLORS.black,
  },
  offerArrowText: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: "bold",
  },
});

export default ShopDetailScreen;
