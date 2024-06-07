import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../App";

const RideDetailsScreen = ({ navigation, route }) => {
  const { fare, name, date, mechanicId } = route.params;
  const { fetchMechanicProfile } = useContext(AuthContext);
  const [mechanic, setMechanic] = useState(null);

  console.log("fare final navigating:", fare)

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

  return (
    <View style={styles.container}>
      <Text style={styles.cost}>${fare}</Text>
      {mechanic ? (
        <>
          <Text style={styles.name}>{mechanic.username}</Text>
          <Text style={styles.date}>{date}</Text>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading mechanic details...</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleBackToMap}>
        <Text style={styles.buttonText}>Back to Map</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cost: {
    fontSize: 36,
    fontWeight: "bold",
  },
  name: {
    fontSize: 24,
    marginVertical: 10,
  },
  date: {
    fontSize: 20,
    color: "#888",
  },
  loadingText: {
    fontSize: 20,
    color: "#888",
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default RideDetailsScreen;
