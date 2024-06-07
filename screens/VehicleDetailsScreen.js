import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import COLORS from "../constants/colors";
import { AuthContext } from "../App";

const VehicleDetailsScreen = ({ route, navigation }) => {
  const { state, fetchVehicleDetails } = useContext(AuthContext);
  const { vehicleId } = route.params; 
  const { vehicle } = state;

  useEffect(() => {
    if (vehicleId) {
      fetchVehicleDetails(vehicleId);
    }
  }, [vehicleId]);

  if (!vehicle) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.vehicleModel}>{vehicle.carType}</Text>
        <Text style={styles.vehicleLicense}>{vehicle.plateNo}</Text>
      </View>
      <View style={styles.documentContainer}>
        <View style={styles.documentItem}>
          <View>
            <Text style={styles.documentTitle}>Vehicle Registration</Text>
            <Text style={styles.documentSubtitle}>Vehicle Registration</Text>
          </View>
          <Text style={styles.documentStatusApproved}>APPROVED</Text>
        </View>
        <View style={styles.documentItem}>
          <View>
            <Text style={styles.documentTitle}>Vehicle Insurance</Text>
            <Text style={styles.documentSubtitle}>Expires: 22 Nov 2020</Text>
          </View>
          <Text style={styles.documentStatusApproved}>APPROVED</Text>
        </View>
        <View style={styles.documentItem}>
          <View>
            <Text style={styles.documentTitle}>Vehicle Permit</Text>
            <Text style={styles.documentSubtitle}>Expires: 11 Apr 2022</Text>
          </View>
          <Text style={styles.documentStatusApproved}>APPROVED</Text>
        </View>
        <View style={styles.documentItem}>
          <View>
            <Text style={styles.documentTitle}>Vehicle Loan EMI Details</Text>
            <Text style={styles.documentSubtitle}>Incorrect document type</Text>
          </View>
          <Text style={styles.documentStatusNotApproved}>NOT APPROVED</Text>
        </View>
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
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  vehicleModel: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  vehicleLicense: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
  },
  documentContainer: {
    marginTop: 20,
  },
  documentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  documentSubtitle: {
    fontSize: 14,
    color: "#777",
  },
  documentStatusApproved: {
    backgroundColor: "lightgreen",
    width: 130,
    height: 30,
    textAlign: "center",
    textAlignVertical: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5,
    color: "green",
    fontWeight: "bold",
    borderColor: "green",
    borderWidth: 1,
  },
  documentStatusNotApproved: {
    backgroundColor: "pink",
    width: 130,
    height: 30,
    textAlign: "center",
    textAlignVertical: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5,
    color: "red",
    fontWeight: "bold",
    borderColor: "red",
    borderWidth: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VehicleDetailsScreen;
