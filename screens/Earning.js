import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const earningData = [
  { id: "1", orders: 1, amount: "$40.25" },
  { id: "2", orders: 1, amount: "$20.00" },
  { id: "3", orders: 1, amount: "$400.50" },
  { id: "4", orders: 1, amount: "$400.50" },
  { id: "5", orders: 1, amount: "$40.25" },
  { id: "6", orders: 1, amount: "$20.00" },
];

const Earning = () => {
  const [selectedTab, setSelectedTab] = useState("TODAY");

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.orders}</Text>
      <Text style={styles.itemAmount}>{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSelectedTab("TODAY")}>
          <Text
            style={[
              styles.tabText,
              selectedTab === "TODAY" && styles.selectedTabText,
            ]}
          >
            TODAY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab("WEEKLY")}>
          <Text
            style={[
              styles.tabText,
              selectedTab === "WEEKLY" && styles.selectedTabText,
            ]}
          >
            WEEKLY
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.summary}>
        <Text style={styles.dateText}>Mon, 18 Feb’19</Text>
        <Text style={styles.totalAmount}>$54.75</Text>
        <View style={styles.summaryDetails}>
          <Text style={styles.summaryDetailText}>15 Orders</Text>
          <Text style={styles.summaryDetailText}>8:30 Online hrs</Text>
          <Text style={styles.summaryDetailText}>$22.48 Cash</Text>
        </View>
      </View>
      <FlatList
        data={earningData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Text style={styles.totalEarningsText}>Total Earnings</Text>
            <Text style={styles.totalEarningsAmount}>$460.75</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tabText: {
    fontSize: 18,
    color: "#808080",
  },
  selectedTabText: {
    color: "#32CD32",
    fontWeight: "bold",
  },
  summary: {
    alignItems: "center",
    paddingVertical: 20,
  },
  dateText: {
    fontSize: 16,
    color: "#808080",
  },
  totalAmount: {
    fontSize: 28,
    color: "#32CD32",
    fontWeight: "bold",
    marginVertical: 10,
  },
  summaryDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 10,
  },
  summaryDetailText: {
    fontSize: 16,
    color: "#808080",
    textAlign: "center",
    width: "33%",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  itemText: {
    fontSize: 16,
  },
  itemAmount: {
    fontSize: 16,
    color: "#808080",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  totalEarningsText: {
    fontSize: 16,
    color: "#32CD32",
    fontWeight: "bold",
  },
  totalEarningsAmount: {
    fontSize: 16,
    color: "#32CD32",
    fontWeight: "bold",
  },
});

export default Earning;
