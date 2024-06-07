import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ThankYouCard = ({ message }) => {
  const handleLinkPress = () => {
    // Define the action you want to perform on press
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Thank you</Text>
        <Text style={[styles.text, styles.greyText]}>
          Thank you for your engagement with CarAid. Please be activated by our App. There is 5EGP that will be sent to your account.
          {' '}
          <Text style={[styles.link, styles.alignRight]} onPress={handleLinkPress}>OKAY</Text>
          {' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bbcfc3", // Set background color to green
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  card: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    color: '#333',
    textAlign: 'left',
  },
  greyText: {
    color: 'grey', // Change text color to grey
    fontSize: 17,
  },
  
  alignRight: {
    textAlign: 'right',
    color: 'green', // Change text color to green
  },
});

export default ThankYouCard;
