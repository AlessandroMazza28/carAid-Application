import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import COLORS from "../constants/colors";

const Otp = ({ route, navigation }) => {
  const { phoneNumber } = route.params;
  const [invalidCode, setInvalidCode] = useState(false);

  const handleCodeFilled = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to you at the entered phone number
      </Text>
      <Text style={styles.subtitle}>Phone Number:{phoneNumber}</Text>
      <TouchableOpacity
        style={styles.editPhoneNumberButton}
        onPress={() => navigation.navigate("PhoneNumber")}
      >
        <Text style={styles.editPhoneNumberButtonText}>Edit Phone Number</Text>
      </TouchableOpacity>
      <OTPInputView
        style={styles.otpInput}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.inputField}
        codeInputHighlightStyle={styles.inputFieldHighlighted}
        onCodeFilled={handleCodeFilled}
      />
      {invalidCode && <Text style={styles.error}>Incorrect code.</Text>}
      <TouchableOpacity style={styles.submitButton} onPress={handleCodeFilled}>
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.lighter,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  editPhoneNumberButton: {
    marginBottom: 20,
  },
  editPhoneNumberButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  otpInput: {
    width: "80%",
    height: 200,
  },
  inputField: {
    width: 40,
    height: 45,
    borderBottomWidth: 1,
    color: COLORS.black,
    fontSize: 20,
  },
  inputFieldHighlighted: {
    borderColor: COLORS.primary,
    width: 40,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Otp;
