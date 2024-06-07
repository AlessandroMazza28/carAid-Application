import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
//

const WelcomeScreen = ({ route, navigation }) => {
  // const { language } = route.params;

  // console.log("Selected language:", language);
//comment 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperPart} />
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/Logo-icon-new.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.lowerPart}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.SignUpbutton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.SignUpbuttonText}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
  },
  upperPart: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  logoContainer: {
    position: "absolute",
    top: "37%",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
  },
  logo: {
    width: 300,
    height: 300,
  },
  lowerPart: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 100,
    marginBottom: 4,
    height: 60,
    width: "80%",
    justifyContent: "center",
  },
  SignUpbutton: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 4,
    height: 60,
    width: "80%",
    justifyContent: "center",
  },
  SignUpbuttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
  },
});

export default WelcomeScreen;
