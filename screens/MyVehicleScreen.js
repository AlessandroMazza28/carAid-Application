import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import COLORS from "../constants/colors";
import { AuthContext } from "../App";

const MyVehicleScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const { vehicles } = state;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.vehicleItem}
      onPress={() =>
        navigation.navigate("VehicleDetailsScreen", { vehicleId: item._id })
      }
    >
      <View>
        <Text style={styles.vehicleModel}>{item.model}</Text>
        <Text style={styles.vehicleLicense}>{item.plateNo}</Text>
      </View>
      <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/3306/3306103.png" }} style={styles.vehicleImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>My Vehicle</Text>
      <FlatList
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <TouchableOpacity style={styles.addButton}
        onPress={() => navigation.navigate("AddVehicle")}
      >
        <Text style={styles.addButtonText}>ADD A VEHICLE</Text>
      </TouchableOpacity>
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
    textAlign: "center",
    marginBottom: 20,
  },
  vehicleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  vehicleModel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  vehicleLicense: {
    fontSize: 14,
    color: "#777",
  },
  vehicleImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MyVehicleScreen;
