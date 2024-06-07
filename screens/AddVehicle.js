import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import COLORS from '../constants/colors';
import { AuthContext } from '../App';

const AddVehicle = ({ navigation }) => {
  const [carType, setCarType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [plateNo, setPlateNo] = useState('');
  const [color, setColor] = useState('');
  const { addVehicle } = useContext(AuthContext);

  const handleRegister = async () => {
    const vehicleData = {
      carType,
      brand,
      model,
      manufacturer,
      plateNo,
      color,
    };

    try {
      const newVehicle = await addVehicle(vehicleData);
      navigation.navigate('VehicleDocuments', { vehicleId: newVehicle._id });
    } catch (error) {
      console.error('Failed to register vehicle:', error);
      Alert.alert('Error', 'Failed to register vehicle. Please try again.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <Text style={styles.title}>Add Vehicle</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Car Type</Text>
          <TextInput
            placeholder="Car Type"
            value={carType}
            onChangeText={setCarType}
            style={styles.input}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Brand (Auto Suggestion) </Text>
          <TextInput
            placeholder="Brand"
            value={brand}
            onChangeText={setBrand}
            style={styles.input}
          />
          {brand ? (
            <FlatList
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setBrand(item);
                    Keyboard.dismiss();
                  }}
                  style={styles.suggestionItem}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          ) : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Model (Auto Suggestion)</Text>
          <TextInput
            placeholder="Model"
            value={model}
            onChangeText={setModel}
            style={styles.input}
          />
          {model ? (
            <FlatList
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setModel(item);
                    Keyboard.dismiss();
                  }}
                  style={styles.suggestionItem}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          ) : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Manufacturer (Auto Suggestion)</Text>
          <TextInput
            placeholder="Manufacturer"
            value={manufacturer}
            onChangeText={setManufacturer}
            style={styles.input}
          />
          {manufacturer ? (
            <FlatList
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setManufacturer(item);
                    Keyboard.dismiss();
                  }}
                  style={styles.suggestionItem}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          ) : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Number Plate</Text>
          <TextInput
            placeholder="Number Plate"
            value={plateNo}
            onChangeText={setPlateNo}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Color</Text>
          <TextInput
            placeholder="Color"
            value={color}
            onChangeText={setColor}
            style={styles.input}
          />
        </View>

        <Button
          title="Register"
          filled
          onPress={handleRegister}
          style={styles.registerButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
    color: COLORS.black,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 20,
    paddingRight: 40,
    marginTop: 5,
  },
  suggestionItem: {
    backgroundColor: COLORS.lightGrey,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 5,
  },
  registerButton: {
    marginTop: 20,
    borderRadius: 50,
    height: 60,
  },
});

export default AddVehicle;
