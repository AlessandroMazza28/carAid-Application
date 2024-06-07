import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors'; // Assuming you have defined this correctly
import Button from '../components/Button'; // Assuming you have defined this correctly

const SwitchServiceType = () => {
  const [isMechanic, setIsMechanic] = useState(false);
  const [isCarOwner, setIsCarOwner] = useState(false);
  const [isSparePart, setIsSparePart] = useState(false);

  const toggleMechanic = () => {
    setIsMechanic(!isMechanic);
    setIsCarOwner(false);
    setIsSparePart(false);
  };

  const toggleCarOwner = () => {
    setIsCarOwner(!isCarOwner);
    setIsMechanic(false);
    setIsSparePart(false);
  };

  const toggleSparePart = () => {
    setIsSparePart(!isSparePart);
    setIsMechanic(false);
    setIsCarOwner(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            marginVertical: 10,
            color: COLORS.black,
            textAlign: "center",
            borderBottomWidth: 25,
          }}
        >
          Switch Service Type
        </Text>
        <View style={styles.switchContainer}>
          <Text style={styles.title}>Mechanic</Text>
          <Switch
            value={isMechanic}
            onValueChange={toggleMechanic}
          
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.title}>Car Owner</Text>
          <Switch
            value={isCarOwner}
            onValueChange={toggleCarOwner}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.title}>Spare Part shops</Text>
          <Switch
            value={isSparePart}
            onValueChange={toggleSparePart}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
     
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Aligns children to each end of the container
    marginBottom: 50,
    width: '100%', // Adjust the width as needed
    height: 50,
    borderBottomWidth: 1,
   
   
  },
  title: {
    flex: 1, // Makes the text take up the available space
    marginRight: 10, // Adds some space between the title and the switch
    borderBottomColor: COLORS.black, // Sets the color of the line to black
    marginHorizontal: 10,
   
   
    
  },
});

export default SwitchServiceType;



