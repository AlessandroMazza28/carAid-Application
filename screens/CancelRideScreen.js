import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import COLORS from "../constants/colors";

const CancelRideScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { clearMarkers } = route.params;

  const handleCancelOptionPress = () => {
    setModalVisible(true);
  };

  const handleCancelConfirmation = () => {
    setModalVisible(false);
    clearMarkers();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cancel Trip</Text>
      <TouchableOpacity style={styles.option} onPress={handleCancelOptionPress}>
        <Text style={styles.optionText}>• Rider isn't here</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleCancelOptionPress}>
        <Text style={styles.optionText}>• Wrong address shown</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleCancelOptionPress}>
        <Text style={styles.optionText}>• Don't charge rider</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleCancelOptionPress}>
        <Text style={styles.optionText}>• Don't charge rider</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleCancelOptionPress}>
        <Text style={styles.optionText}>• Don't charge rider</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleCancelOptionPress}>
        <Text style={styles.optionText}>• Don't charge rider</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Cancel Rockdean's trip?</Text>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleCancelConfirmation}
              >
                <Text style={styles.buttonTextCancel}>YES, CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    padding: 15,
    marginVertical: 10,
    width: "90%",
    height: 60,
    alignItems: "flex-start",
    backgroundColor: COLORS.primary,
    paddingLeft: 40,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    width: "100%",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: "red",
    borderRadius: 25,
  },
  cancelButton: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    borderColor: "red",
    borderWidth: 1,
    color: "red",
  },
  buttonTextCancel: {
    color: "#fff",
    fontSize: 18,
  },
  buttonText: {
    color: "red",
    fontSize: 18,
  },
});

export default CancelRideScreen;
