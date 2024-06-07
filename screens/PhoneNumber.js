import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PhoneInput from "react-native-phone-number-input";
import COLORS from "../constants/colors";

const PhoneNumber = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const onPressContinue = () => {
    navigation.push("Otp", { phoneNumber });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.welcome}>Enter Mobile Number</Text>
        <PhoneInput
          defaultValue={phoneNumber}
          defaultCode="US"
          onChangeText={(text) => setPhoneNumber(text)}
          containerStyle={styles.inputContainer}
          textContainerStyle={styles.inputTextContainer}
          textInputStyle={styles.inputText}
          autoFocus
        />
        <TouchableOpacity style={styles.button} onPress={onPressContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <Text style={styles.terms}>
          By continuing, I confirm that I have read & agree to Terms &
          Conditions and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -200,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcome: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inputTextContainer: {
    paddingVertical: 12,
    borderRadius: 25,
    width: 350,
  },
  inputText: {
    fontSize: 16,
  },
  button: {
    height: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  terms: {
    color: "gray",
    textAlign: "center",
  },
});

export default PhoneNumber;
