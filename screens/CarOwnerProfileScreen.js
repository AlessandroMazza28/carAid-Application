import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AuthContext } from "../App";
import COLORS from "../constants/colors";

const CarOwnerProfileScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext); 
  const { state } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://www.gravatar.com/avatar/?d=mp" }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{state.user?.username || "User Name"}</Text>
        <Text style={styles.userType}>{state.user?.role || "Car Owner"}</Text>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("MapViewNearby")}
        >
          <Text style={styles.menuItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("SubscriptionPlan")}
        >
          <Text style={styles.menuItemText}>My Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("MyVehicleScreen")}
        >
          <Text style={styles.menuItemText}>My Vehicle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            navigation.navigate("SettingsScreen", { userType: "carOwner" })
          }
        >
          <Text style={styles.menuItemText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("SwitchServiceTypeScreen")}
        >
          <Text style={styles.menuItemText}>Switch</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={signOut} // Call signOut directly
        >
          <Text style={styles.menuItemText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 250,
    marginBottom: 50,
    backgroundColor: COLORS.darkBlue,
  },
  header: {
    marginTop: 70,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: COLORS.darkBlue,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
    color: COLORS.white,
  },
  userType: {
    fontSize: 14,
    color: COLORS.white,
  },
  menuContainer: {
    padding: 20,
    height: 900,
    backgroundColor: COLORS.white,
  },
  menuItem: {
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
});

export default CarOwnerProfileScreen;
