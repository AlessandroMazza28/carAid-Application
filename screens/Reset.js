import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import COLORS from "../constants/colors";

const Reset = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const LOCAL_BASE_URL = "http://192.168.1.4:9090/api/";

  const handleResetPassword = async () => {
    if (!email || !newPassword || !confirmNewPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${LOCAL_BASE_URL}profile/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          newPassword: newPassword,
          confirmPassword: confirmNewPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsEmailSent(true);
      } else {
        alert(data.error || "An error occurred during password reset.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An error occurred during password reset.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
        {!isEmailSent ? (
          <>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />
            </View>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                secureTextEntry={true}
                style={styles.input}
              />
            </View>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChangeText={(text) => setConfirmNewPassword(text)}
                secureTextEntry={true}
                style={styles.input}
              />
            </View>
            <Button
              title="Reset Password"
              filled
              onPress={handleResetPassword}
              style={styles.button}
            />
          </>
        ) : (
          <>
            <Text style={styles.description}>
              An email with password reset instructions has been sent to:
            </Text>
            <Text style={styles.email}>{email}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Return to Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.black,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: COLORS.black,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 5,
    marginHorizontal: 15,
    color: COLORS.black,
    textAlign: "left",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 50,
    paddingHorizontal: 12,
    height: 50,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: COLORS.black,
  },
  button: {
    marginTop: 10,
    borderRadius: 50,
  },
  email: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: COLORS.black,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.primary,
  },
});

export default Reset;
