import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const LanguageSelectionScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const languages = [
    "Arabic",
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
  ];

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
    navigation.navigate("WelcomeScreen", { language });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Language</Text>
      {languages.map((language) => (
        <TouchableOpacity
          key={language}
          style={styles.languageButton}
          onPress={() => handleLanguageSelection(language)}
        >
          <Text style={styles.languageText}>{language}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  languageButton: {
    marginVertical: 10,
  },
  languageText: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 18,
    color: "black",
    fontWeight: "400",
  },
});

export default LanguageSelectionScreen;
