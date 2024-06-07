import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import COLORS from "../constants/colors";
import { AuthContext } from '../App'; // Ensure the context is correctly imported

const SwitchServiceTypeScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (state.user) {
      setUserRole(state.user.role);
    }
  }, [state.user]);

  const handleNavigation = () => {
    if (userRole === "Mechanic") {
      navigation.navigate("MechanicProfileScreen");
    } else if (userRole === "Car Owner") {
      navigation.navigate("CarOwnerProfileScreen");
    } else if (userRole === "Spare parts shop") {
      navigation.navigate("SparePartsProfileScreen");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Mechanic</Text>
        <Switch
          value={userRole === 'Mechanic'}
          disabled={true}
        />
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Car Owner</Text>
        <Switch
          value={userRole === 'Car Owner'}
          disabled={true}
        />
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Spare Parts Shop Owner</Text>
        <Switch
          value={userRole === 'Spare parts shop'}
          disabled={true}
        />
      </View>
      <TouchableOpacity
        style={styles.navigateButton}
        onPress={handleNavigation}
      >
        <Text style={styles.navigateButtonText}>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    justifyContent: "center",
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  navigateButton: {
    marginTop: 30,
    paddingVertical: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  navigateButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SwitchServiceTypeScreen;
