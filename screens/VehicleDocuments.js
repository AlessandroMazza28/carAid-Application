import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import COLORS from '../constants/colors';
import { AuthContext } from '../App';

const VehicleDocuments = ({ navigation, route }) => {
  const { vehicleId } = route.params;
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState({
    rcBook: null,
    insurancePolicy: null,
    ownerCertificate: null,
    license: null,
  });

  const { uploadVehicleDocument, fetchVehicleDocuments } = useContext(AuthContext);

  const pickDocument = async (documentType) => {
    setLoading(true);
    let result = await DocumentPicker.getDocumentAsync({});
    console.log('Document Picker Result:', result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const document = result.assets[0];
      try {
        await uploadVehicleDocument(document.uri, documentType, document.name, vehicleId);
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
        const docs = await fetchVehicleDocuments(vehicleId);
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
  }, [fetchVehicleDocuments, vehicleId]);

  const handleNext = () => {
    navigation.navigate('BankDetails');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle Documents</Text>

      <View style={styles.documentContainer}>
        <View>
          <Text style={styles.documentText}>RC Book</Text>
          <Text style={styles.docSubText}>Vehicle Registration</Text>
        </View>
        <TouchableOpacity onPress={() => pickDocument('rcBook')}>
          <Text style={styles.uploadLinkText}>UPLOAD</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.fileName}>
        {documents.rcBook ? documents.rcBook : 'No file uploaded'}
      </Text>

      <View style={styles.documentContainer}>
        <View>
          <Text style={styles.documentText}>Insurance Policy</Text>
          <Text style={styles.docSubText}>A driving License is an official document</Text>
        </View>
        <TouchableOpacity onPress={() => pickDocument('insurancePolicy')}>
          <Text style={styles.uploadLinkText}>UPLOAD</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.fileName}>
        {documents.insurancePolicy ? documents.insurancePolicy : 'No file uploaded'}
      </Text>

      <View style={styles.documentContainer}>
        <View>
          <Text style={styles.documentText}>Owner Certificate</Text>
          <Text style={styles.docSubText}>A passport is a travel document ...</Text>
        </View>
        <TouchableOpacity onPress={() => pickDocument('ownerCertificate')}>
          <Text style={styles.uploadLinkText}>UPLOAD</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.fileName}>
        {documents.ownerCertificate ? documents.ownerCertificate : 'No file uploaded'}
      </Text>

      <View style={styles.documentContainer}>
        <View>
          <Text style={styles.documentText}>License</Text>
          <Text style={styles.docSubText}>Incorrect document type</Text>
        </View>
        <TouchableOpacity onPress={() => pickDocument('license')}>
          <Text style={styles.uploadLinkText}>UPLOAD</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.fileName}>
        {documents.license ? documents.license : 'No file uploaded'}
      </Text>

      {loading && <ActivityIndicator size="large" color={COLORS.primary} />}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext} disabled={loading}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
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
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
    color: COLORS.black,
    textAlign: 'center',
  },
  documentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  documentText: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  docSubText: {
    fontSize: 14,
    color: COLORS.grey,
    marginTop: 5,
  },
  uploadLinkText: {
    fontSize: 16,
    color: COLORS.darkColorPrim,
    fontWeight: 'bold',
  },
  fileName: {
    fontSize: 14,
    color: COLORS.grey,
    textAlign: 'center',
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default VehicleDocuments;
