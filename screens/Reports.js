import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import COLORS from "../constants/colors";
import { AuthContext } from "../App";

const issues = [
  "Bad Review",
  "Balance insufficient",
  "Late",
  "No show",
  "Rude behavior",
  "Vehicle issue",
  "Payment issue",
  "Incorrect route",
];

const Reports = ({ navigation }) => {
  const { state, fetchRandomProfiles } = useContext(AuthContext);
  const [profilesWithIssues, setProfilesWithIssues] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      await fetchRandomProfiles();
      assignIssuesToProfiles(state.randomProfiles);
    };
    fetchProfiles();
  }, [fetchRandomProfiles]);

  const assignIssuesToProfiles = (profiles) => {
    const profilesWithIssues = profiles.map((profile) => ({
      ...profile,
      issue: issues[Math.floor(Math.random() * issues.length)],
    }));
    setProfilesWithIssues(profilesWithIssues);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: "https://www.gravatar.com/avatar/?d=mp" }}
        style={styles.profileImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{item.username}</Text>
        <Text style={styles.issueText}>{item.issue ?? ""}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Reports</Text>
        <TouchableOpacity
          onPress={() => {
            /* Handle view all */
          }}
        >
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={profilesWithIssues}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  viewAllText: {
    fontSize: 16,
    color: "#FF4500",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    marginLeft: 15,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  issueText: {
    fontSize: 14,
    color: COLORS.darkColorPrim,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
  },
});

export default Reports;
