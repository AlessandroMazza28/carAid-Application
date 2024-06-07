import React, { useState, useContext  } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Modal,
  TextBase,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import COLORS from "../constants/colors";
import { AuthContext } from "../App";


const Signup = ({ navigation, route }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const language = route?.params?.language;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const { signUp } = useContext(AuthContext);
  

  const dropdownOptions = ["Mechanic", "Spare parts shop", "Car Owner"];

  const handleSignUp = async () => {
    console.log("handleSignUp triggered");
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    const userData = {
      username,
      email,
      mobileNumber,
      password,
      confirmPassword,
      role: selectedOption,
    };

    console.log("Calling signUp with data:", userData);
    try {
      await signUp(userData);
/*       console.log("SignUp successful, navigating to PhoneNumber");
 */      navigation.navigate("PhoneNumber");
    } catch (error) {
      console.error("SignUp failed", error);
      Alert.alert("Error", "SignUp failed. Please try again.");
    }
  };

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              marginVertical: 2,
              color: COLORS.black,
              textAlign: "center",
            }}
          >
            Sign Up
          </Text>
        </View>

        <View style={{ marginBottom: 3 }}>
          <View style={styles.inputContainer}>
            <TextInput 
            placeholder="Enter your name" 
            value={username}
            onChangeText={setUsername}
            />
          </View>
        </View>

        <View style={{ marginBottom: 3 }}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter your email address"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={{ marginBottom: 3 }}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="+20"
              keyboardType="numeric"
              style={{ width: "12%" }}
            />
            <TextInput
              placeholder="Enter your phone number"
              keyboardType="numeric"
              style={{ width: "80%" }}
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
          </View>
        </View>

        <View style={{ marginBottom: 3 }}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter your password"
              secureTextEntry={!isPasswordShown}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{ position: "absolute", right: 12 }}
            >
              <Ionicons
                name={isPasswordShown ? "eye-off" : "eye"}
                size={24}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginBottom: 3 }}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Confirm your password"
              secureTextEntry={!isPasswordShown}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{ position: "absolute", right: 12 }}
            >
              <Ionicons
                name={isPasswordShown ? "eye-off" : "eye"}
                size={24}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Custom Dropdown Menu */}

        <TouchableOpacity
          onPress={() => setShowDropdown(!showDropdown)}
          style={styles.inputContainer}
        >
          <Text style={{ color: COLORS.black }}>
            {selectedOption || "Category yourself / type of service"}
          </Text>
          <Ionicons name="caret-down-outline" size={24} color={COLORS.black} />
        </TouchableOpacity>

        {/* Dropdown Modal */}
        {showDropdown && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showDropdown}
            onRequestClose={() => setShowDropdown(false)}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setShowDropdown(false)}
            >
              <View style={styles.dropdownContainer}>
                {dropdownOptions.map(option => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      setSelectedOption(option);
                      setShowDropdown(false);
                    }}
                    style={styles.dropdownItem}
                  >
                    <Text
                      style={{
                        color: COLORS.white,
                        fontWeight: "bold",
                        textAlign: "center",
                        alignContent: "center",
                        alignSelf: "center",
                        flex: 1,
                      }}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
        )}

        {/* Checkbox and Terms */}
        {/* <View style={{ flexDirection: "row", marginVertical: 6, marginTop: 6 }}>
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text>I agree to the terms and conditions</Text>
        </View> */}

        {/* Signup Button */}
        <Button
          title="Sign Up"
          filled
          onPress={handleSignUp}

          style={{
            marginTop: 15,
            marginBottom: 4,
            borderRadius: 50,
            height: 60,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 15,
          }}
        ></View>
        {/* Social Login Options */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          {/* Facebook Login */}
          {/* <TouchableOpacity
            onPress={() => console.log("Facebook pressed")}
            style={styles.socialButton}
          >
            <Image
              source={require("../assets/facebook.png")}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Text>Facebook</Text>
          </TouchableOpacity> */}
        </View>

        {/* Already have an account */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 15,
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black }}>
            Already have an account
          </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  inputContainer: {
    width: "100%",
    height: 60,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 22,
    marginTop: 7,
  },
  dropdownContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 16,
    minWidth: 400,
    height: 140,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 70,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: COLORS.white,
  },
  dropdownText: {},
  socialButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.grey,
    marginRight: 4,
    borderRadius: 50,
  },
  socialIcon: {
    height: 36,
    width: 36,
    marginRight: 8,
  },
};

export default Signup;
