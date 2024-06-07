import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import COLORS from '../constants/colors';
import { AuthContext } from '../App';

const SubscriptionPlan = ({ navigation }) => {
  const { state, getAllSubscriptionPlans, subscribeUser } = useContext(AuthContext);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        console.log('Fetching subscription plans...');
        const response = await getAllSubscriptionPlans();
        console.log('getAllSubscriptionPlans response:', response);
        setPlans(response);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log('No active subscription found, displaying available plans.');
        } else {
          console.error('Error fetching subscription plans:', error);
        }
      }
    };

    fetchPlans();
  }, [getAllSubscriptionPlans]);

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
  };

  const handleSaveSubscription = async () => {
    if (selectedPlan) {
      try {
        console.log('Selected plan:', selectedPlan);
        const response = await subscribeUser(selectedPlan);
        console.log('Subscription response:', response);
        Alert.alert(
          'Thank you for subscribing!',
          `You have selected the plan.`,
          [{ text: 'OK', onPress: () => navigation.navigate('MapViewNearby') }],
          { cancelable: false }
        );
      } catch (error) {
        console.error('Error subscribing to plan:', error);
        Alert.alert('Error', 'Failed to subscribe to plan. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please select a plan.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription Plans</Text>
      {state.currentSubscription ? (
        <View style={[styles.planContainer, styles.selectedPlan]}>
          <View style={styles.planRow}>
            <Text style={styles.planName}>{state.currentSubscription.subscription.planName}</Text>
            <Text style={styles.planPrice}>${state.currentSubscription.subscription.price}</Text>
          </View>
          <Text style={styles.planDetails}>{state.currentSubscription.subscription.description}</Text>
        </View>
      ) : (
        <>
          {plans.length > 0 ? (
            plans.map((plan) => (
              <TouchableOpacity
                key={plan._id}
                style={[
                  styles.planContainer,
                  selectedPlan === plan._id && styles.selectedPlan,
                ]}
                onPress={() => handleSelectPlan(plan._id)}
              >
                <View style={styles.planRow}>
                  <Text style={styles.planName}>{plan.planName}</Text>
                  <Text style={styles.planPrice}>${plan.price}</Text>
                </View>
                <Text style={styles.planDetails}>{plan.description}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>Loading subscription plans...</Text>
          )}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveSubscription}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.black,
    textAlign: 'center',
  },
  planContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  selectedPlan: {
    backgroundColor: COLORS.primary,
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  planPrice: {
    fontSize: 18,
    color: COLORS.black,
  },
  planDetails: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    borderRadius: 50,
  },
});

export default SubscriptionPlan;
