import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import COLORS from "../constants/colors";
import { AuthContext } from "../App"; 

const transactions = [
  {
    id: "1",
    type: "Added to Wallet",
    date: "1 Feb'19",
    amount: "$40",
    reference: "#123467",
  },
  {
    id: "2",
    type: "Fix payment",
    date: "1 Feb'19",
    amount: "$40",
    reference: "#123467",
  },
  {
    id: "3",
    type: "Fix payment",
    date: "1 Feb'19",
    amount: "$40",
    reference: "#123467",
  },
  {
    id: "4",
    type: "Added to Wallet",
    date: "1 Feb'19",
    amount: "$40",
    reference: "#123467",
  },
  {
    id: "5",
    type: "Fix payment",
    date: "1 Feb'19",
    amount: "$40",
    reference: "#123467",
  },
];

const MyWalletScreen = ({ navigation }) => {
  const { state, createWallet, getBalance } = useContext(AuthContext);

  useEffect(() => {
    const initializeWallet = async () => {
      try {
        await createWallet();
        await getBalance();
      } catch (error) {
        Alert.alert("Error", "Failed to initialize wallet. Please try again.");
      }
    };

    initializeWallet();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View>
        <Text style={styles.transactionType}>{item.type}</Text>
        <Text style={styles.transactionDetails}>
          {item.date} • {item.reference}
        </Text>
      </View>
      <Text style={styles.transactionAmount}>{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Wallet</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total balance</Text>
        <Text style={styles.balanceAmount}>
          ${state.balance !== null ? state.balance : "undefined"}
        </Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>PAY ONLINE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("AddMoneyToWalletScreen")}
        >
          <Text style={styles.actionButtonText}>ADD MONEY</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>APRIL 2019</Text>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  balanceContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: "#777",
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.darkBlue,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  transactionType: {
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionDetails: {
    fontSize: 14,
    color: "#777",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MyWalletScreen;
