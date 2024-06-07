import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from "react-native";
import { ProgressCircle } from "react-native-svg-charts";
import COLORS from "../constants/colors";
import { AuthContext } from "../App";

const statisticsData = [
  {
    id: "1",
    name: "Abdelhady",
    review:
      "Your service is very good. the experience that I had was incredible.",
  },
  {
    id: "2",
    name: "Mai",
    review:
      "Your service is very good. the experience that I had was incredible.",
  },
  {
    id: "3",
    name: "XXXXXX",
    review:
      "Your service is very good. the experience that I had was incredible.",
  },
  {
    id: "4",
    name: "YYYYYY",
    review:
      "Your service is very good. the experience that I had was incredible.",
  },
];

const Statistics = () => {
  const { fetchAllUsersCount } = useContext(AuthContext);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const count = await fetchAllUsersCount();
        setUserCount(count);
      } catch (error) {
        console.error("Failed to fetch user count:", error);
      }
    };

    fetchData();
  }, [fetchAllUsersCount]);

  const renderItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.reviewText}>{item.review}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Statistics</Text>
      </View>
      <View style={styles.ratingInfo}>
        <View style={styles.ratingDetails}>
          <Text style={styles.ratingValue}>4.5</Text>
          <Text style={styles.userCount}>{userCount} users</Text>
        </View>
        <View style={styles.progressCircle}>
          <ProgressCircle
            style={{ height: 120, width: 120 }}
            progress={0.75}
            progressColor={COLORS.darkColorPrim}
          />
          <View style={styles.circleTextContainer}>
            <Text style={styles.circleText}>2547</Text>
            <Text style={styles.circleSubText}>Total Fix</Text>
          </View>
        </View>
      </View>
      <Text style={styles.dateText}>FEB'19</Text>
      <FlatList
        data={statisticsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ratingInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
  },
  ratingDetails: {
    alignItems: "center",
  },
  ratingValue: {
    fontSize: 36,
    fontWeight: "bold",
  },
  userCount: {
    fontSize: 16,
    color: COLORS.black,
  },
  progressCircle: {
    alignItems: "center",
  },
  circleTextContainer: {
    position: "absolute",
    top: "30%",
    alignItems: "center",
  },
  circleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  circleSubText: {
    fontSize: 12,
    color: COLORS.black,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.darkColorPrim,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  reviewContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.darkColorPrim,
  },
  reviewText: {
    fontSize: 16,
    color: "#808080",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 20,
  },
});

export default Statistics;
