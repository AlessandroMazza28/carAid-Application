import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import COLORS from '../constants/colors';
import { AuthContext } from '../App';

const PersonalDocuments = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState({
    birthCertificate: null,
    drivingLicence: null,
    passport: null,
    electionCard: null,
  });

  const { uploadUserDocument, fetchUserDocuments, state  } = useContext(AuthContext);

  const pickDocument = async (documentType) => {
    setLoading(true);
    let result = await DocumentPicker.getDocumentAsync({});
    console.log('Document Picker Result:', result);

    if (result && result.assets && result.assets.length > 0) {
      const document = result.assets[0];
      try {
        console.log('Before document upload');
        await uploadUserDocument(document.uri, documentType, document.name);
        console.log('After document upload');

        setDocuments((prevDocs) => ({
          ...prevDocs,
          [documentType]: document.name,
        }));
      } catch (error) {
        console.error('Error during document upload:', error);
        Alert.alert('Error', 'Failed to upload document');
      }
    } else {
      console.error('No document selected or invalid result structure:', result);
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadDocuments = async () => {
      setLoading(true);
      try {
        const docs = await fetchUserDocuments();
        const updatedDocs = {};
        docs.forEach((doc) => {
          updatedDocs[doc.documentType] = doc.originalname;
        });
        setDocuments(updatedDocs);
      } catch (error) {
        console.error('Error loading documents:', error);
      }
      setLoading(false);
    };
    loadDocuments();
  }, [fetchUserDocuments]);

  const handleNext = () => {
    if (state.user.role === 'Car Owner') {
      navigation.navigate('AddVehicle');
    } else {
      navigation.navigate('BankDetails');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Personal Documents</Text>

      <View style={styles.documentContainer}>
        <View>
          <Text style={styles.documentText}>Birth Certificate</Text>
          <Text style={styles.docSubText}>Vehicle Registration</Text>
        </View>
        <TouchableOpacity onPress={() => pickDocument('birthCertificate')}>
          <Text style={styles.uploadLinkText}>UPLOAD</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.fileName}>
        {documents.birthCertificate ? documents.birthCertificate : "No file uploaded"}
      </Text>

      <View style={styles.documentContainer}>
        <View>
          <Text style={styles.documentText}>Driving Licence</Text>
          <Text style={styles.docSubText}>Driving Licence is an official document</Text>
        </View>
        <TouchableOpacity onPress={() => pickDocument('drivingLicence')}>
          <Text style={styles.uploadLinkText}>UPLOAD</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.fileName}>
        {documents.drivingLicence ? documents.drivingLicence : "No file uploaded"}
      </Text>

      <View style={styles.documentContainer}>
        <View>
          <Text style={styles.documentText}>Passport</Text>
          <Text style={styles.docSubText}>A passport is a travel document ...</Text>
        </View>
        <TouchableOpacity onPress={() => pickDocument('passport')}>
          <Text style={styles.uploadLinkText}>UPLOAD</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.fileName}>
        {documents.passport ? documents.passport : "No file uploaded"}
      </Text>

      <View style={styles.documentContainer}>
        <View>
          <Text style={styles.documentText}>Election Card</Text>
          <Text style={styles.docSubText}>Incorrect document type</Text>
        </View>
        <TouchableOpacity onPress={() => pickDocument('electionCard')}>
          <Text style={styles.uploadLinkText}>UPLOAD</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.fileName}>
        {documents.electionCard ? documents.electionCard : "No file uploaded"}
      </Text>

      {loading && <ActivityIndicator size="large" color={COLORS.primary} />}

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By continuing, I confirm that I have read the{" "}
          <Text style={styles.linkText}>Terms & Conditions</Text> and{" "}
          <Text style={styles.linkText}>Privacy Policy</Text>.
        </Text>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext} disabled={loading}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 50,
    color: COLORS.black,
    textAlign: "center",
  },
  documentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  documentText: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: "bold",
  },
  docSubText: {
    fontSize: 14,
    color: COLORS.grey,
    marginTop: 5,
  },
  uploadLinkText: {
    fontSize: 16,
    color: COLORS.darkColorPrim,
    fontWeight: "bold",
  },
  fileName: {
    fontSize: 14,
    color: COLORS.grey,
    textAlign: "center",
    marginBottom: 10,
  },
  termsContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  termsText: {
    fontSize: 14,
    color: COLORS.black,
    textAlign: "center",
  },
  linkText: {
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 50,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default PersonalDocuments;
