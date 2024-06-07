import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const SettingsScreen = ({ route, navigation }) => {
  const { userType } = route.params;
  const handleVehiclePress = () => {
    navigation.navigate("MyVehicleScreen");
  };
  const handleWalletPress = () => {
    navigation.navigate("MyWalletScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Settings</Text>
      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>My Profile</Text>
        </TouchableOpacity>
        {userType === "carOwner" && (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleVehiclePress}
          >
            <Text style={styles.menuItemText}>My Vehicle</Text>
          </TouchableOpacity>
        )}
        {(userType === "mechanic") && (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleWalletPress}
          >
            <Text style={styles.menuItemText}>My Wallet</Text>
          </TouchableOpacity>
        )}
        {userType !== "spareParts" && (
          <>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('BankDetails')}>
              <Text style={styles.menuItemText}>Bank Details</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PersonalDocuments')}>
          <Text style={styles.menuItemText}>Personal Document</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Reset")}>
          <Text style={styles.menuItemText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("HomeNav")}>
          <Text style={styles.menuItemText}>More</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Privacy Policies</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkBlue,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
});

export default SettingsScreen;
