import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";

const options = [
  {
    id: "1",
    name: "Statistics",
    icon: { uri: "https://cdn-icons-png.flaticon.com/512/2920/2920323.png" },
    screen: "Statistics",
  },
  {
    id: "2",
    name: "Reports",
    icon: { uri: "https://cdn-icons-png.flaticon.com/512/1553/1553118.png" },
    screen: "Reports",
  },
  {
    id: "3",
    name: "Earning",
    icon: { uri: "https://cdn-icons-png.flaticon.com/512/2685/2685027.png" },
    screen: "Earning",
  },
  {
    id: "4",
    name: "Traffic",
    icon: { uri: "https://cdn-icons-png.flaticon.com/512/1006/1006585.png" },
    screen: "Traffic",
  },
];

const HomeNav = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Image source={item.icon} style={styles.optionIcon} />
      <Text style={styles.optionName}>{item.name}</Text>
      <TouchableOpacity style={styles.arrowButton}>
        <Text style={styles.arrowText}>{">"}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home</Text>
      <TextInput style={styles.searchBar} placeholder="Search" />
      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  searchBar: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    margin: 10,
    backgroundColor: "#FFFFFF",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  optionIcon: {
    width: 40,
    height: 40,
  },
  optionName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeNav;
