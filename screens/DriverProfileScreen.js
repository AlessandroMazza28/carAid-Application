import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from "react-native";
import COLORS from "../constants/colors";
import { AuthContext } from "../App";

const DriverProfileScreen = ({ route, navigation }) => {
  const { mechanicId, fare, date } = route.params;
  const { fetchMechanicProfile } = useContext(AuthContext);
  const [mechanic, setMechanic] = useState(null);
  console.log("fare mid navigating:", fare);

  useEffect(() => {
    const getMechanicProfile = async () => {
      try {
        const profile = await fetchMechanicProfile(mechanicId);
        setMechanic(profile);
      } catch (error) {
        console.error("Failed to fetch mechanic profile:", error);
        Alert.alert("Error", "Failed to fetch mechanic profile. Please try again later.");
      }
    };

    getMechanicProfile();
  }, [mechanicId, fetchMechanicProfile]);

  const handleBackToMap = () => {
    navigation.goBack();
  };

  const handleRideDetailsPress = () => {
    const name = "Jessica Bob";
    navigation.navigate("RideDetailsScreen", { fare, name, date, mechanicId });
  };

  if (!mechanic) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.profileBox}>
          <Image
            source={{ uri: mechanic.avatar || "https://www.gravatar.com/avatar/?d=mp" }}
            style={styles.profileImage}
          />
          <Text style={styles.driverName}>{mechanic.username}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>3250</Text>
              <Text style={styles.statText}>Total Fix</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>2.5</Text>
              <Text style={styles.statText}>Years</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <Text style={styles.sectionTitle}>Personal Info</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.personalInfoText}>•    {mechanic.mobileNumber}</Text>
          <Text style={styles.personalInfoText}>•    {mechanic.email}</Text>
          <Text style={styles.personalInfoText}>•    English and Spanish</Text>
          <Text style={styles.personalInfoText}>•    RM6 NL, PO 2452, New York</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleBackToMap}>
            <Text style={styles.buttonText}>Back to Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRideDetailsPress}>
            <Text style={styles.buttonText}>Ride Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
    paddingTop: 100, // Adjusted paddingTop to prevent overlap
  },
  topContainer: {
    backgroundColor: COLORS.darkBlue,
    height: 200, // Set a fixed height for the top container
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Made the top container absolute
    top: 0,
  },
  profileBox: {
    backgroundColor: COLORS.white,
    width: '90%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Position the profile box absolutely within the top container
    top: '80%',
    transform: [{ translateY: -50 }],
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  driverName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.black,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  statBox: {
    alignItems: 'center',
    marginHorizontal: 70,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.black,
  },
  statText: {
    fontSize: 16,
    color: COLORS.black,
  },
  lowerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 300,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoContainer: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    marginHorizontal: -25,
  },
  personalInfoText: {
    fontSize: 18,
    marginBottom: 10,
    paddingTop: 20,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DriverProfileScreen;
