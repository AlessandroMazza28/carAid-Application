import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../constants/colors";
import MapView, { Marker } from "react-native-maps";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { AuthContext } from "../App";

const MapViewNearby = ({ navigation }) => {
  const today = new Date().toDateString();

  const [menuVisible, setMenuVisible] = useState(false);
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [sharedFare, setSharedFare] = useState(null);
  const [currentDate, setCurrentDate] = useState(today);

  const LOCAL_BASE_URL = "http://192.168.1.4:9090/api/";

  const userLocation = {
    latitude: 31.265580739922147,
    longitude: 29.998229724273717,
  };

  const [userLocationName, setUserLocationName] = useState("Your Location");
  const [selectedMarkerName, setSelectedMarkerName] =
    useState("Selected Location");

  const { state, fetchRandomMechanicProfiles } = useContext(AuthContext);
  const { userRole } = state;

  const navigateToProfile = () => {
    navigation.navigate("SwitchServiceTypeScreen");
  };

  const openMenu = () => {
    setSelectedOptions([]);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    cancelSearch();
    setMenuVisible(false);
  };

  const closeOrderModal = () => {
    setOrderModalVisible(false);
  };

  const selectOption = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([option]); // Only allow one option to be selected
    } else {
      setSelectedOptions([]); // Deselect the option if it is already selected
    }
  };

  const startSearch = async () => {
    setSearching(true);

    if (selectedOptions.includes("Spare Parts Shop")) {
      setMenuVisible(false);
      setSearching(false);

      try {
        const response = await axios.get(`${LOCAL_BASE_URL}profile/getRandomSparePartsShops`);
        const sparePartsShops = response.data;
        navigation.navigate("ShopListScreen", { sparePartsShops });
      } catch (error) {
        console.error("Error fetching spare parts shops:", error);
      }
      return;
    }

    try {
      await fetchRandomMechanicProfiles();
      setTimeout(() => {
        const randomizedMarkers = state.randomMechanicProfiles.map((profile) => ({
          latitude: 31.26558 + (Math.random() - 0.5) * 0.02,
          longitude: 29.99823 + (Math.random() - 0.5) * 0.02,
          id: profile._id, // Store the mechanic's ID with the marker
        }));
        setMarkers(randomizedMarkers);
        setMenuVisible(false);
        setSearching(false);
      }, 3000);
    } catch (error) {
      console.error("Error fetching random mechanic profiles:", error);
      setSearching(false);
    }
  };

  const cancelSearch = () => {
    setSearching(false);
    setMenuVisible(false);
  };

  const handleSearchPress = () => {
    if (selectedOptions.length > 0 && !searching) {
      startSearch();
    }
  };

  const calculateDistance = (marker) => {
    const R = 6371;
    const dLat = ((marker.latitude - userLocation.latitude) * Math.PI) / 180;
    const dLon = ((marker.longitude - userLocation.longitude) * Math.PI) / 180;
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos((userLocation.latitude * Math.PI) / 180) *
        Math.cos((marker.latitude * Math.PI) / 180) *
        (1 - Math.cos(dLon))) /
        2;
    const distance = R * 2 * Math.asin(Math.sqrt(a));
    return distance.toFixed(2);
  };

  const onMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setMenuVisible(true);
  };

  const handleOrderPress = () => {
    const distance = calculateDistance(selectedMarker);
    const fare = (distance * 5).toFixed(2);
    setSharedFare(fare); // Set the shared fare

    setMenuVisible(false);
    setOrderModalVisible(true);
  };

  const handleProfilePress = () => {
    closeOrderModal();
    navigation.navigate("DriverProfileScreen", { mechanicId: selectedMarker.id, fare: sharedFare, date: currentDate });
  };

  const handleRideDetailsPress = () => {
    closeOrderModal();
    if (selectedMarker) {
      const distance = calculateDistance(selectedMarker);
      const fare = (distance * 5).toFixed(2);
      const name = "Jessica Bob";
      const date = "2 May'19 at 2:20 pm";
      console.log("fare before navigating:", fare);
      console.log("Navigating with:", { cost: fare, name, date, mechanicId: selectedMarker.id });

      navigation.navigate("RideDetailsScreen", { cost: fare, name, date });
    }
  };

  const handleCancelPress = () => {
    closeOrderModal();
    navigation.navigate("CancelRideScreen", { clearMarkers });
    openMenu();
    cancelSearch();
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error clearing user token", error);
    }
  };

  const renderOrderModalContent = () => {
    if (selectedMarker) {
      const distance = calculateDistance(selectedMarker);
      const timeToArrive = `${((distance / 30) * 60).toFixed(2)} mins`;

      return (
        <>
          <TouchableOpacity onPress={closeOrderModal}>
            <Text style={styles.closeButton}>X</Text>
          </TouchableOpacity>
          <View style={styles.topContainerOrder}>
            <Text style={styles.timeToArriveOrder}>{timeToArrive}</Text>
            <Image
              source={{ uri: "https://www.gravatar.com/avatar/?d=mp" }}
              style={styles.userImageOrder}
            />
            <Text style={styles.distanceTextOrder}>{distance} mi</Text>
            <TouchableOpacity onPress={handleProfilePress}>
              <Image
                source={{
                  uri: "https://static.vecteezy.com/system/resources/thumbnails/016/416/792/small_2x/phone-call-icon-in-black-colors-telephone-signs-illustration-png.png",
                }}
                style={styles.callIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/3114/3114553.png",
                }}
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleProfilePress}
            >
              <Image
                source={{ uri: "https://www.gravatar.com/avatar/?d=mp" }}
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleCancelPress}
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/66/66847.png",
                }}
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Cancel Trip</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.arrivedButton, styles.disabledButton]}
            disabled={true}
          >
            <Text style={styles.arrivedButtonText}>ARRIVED</Text>
          </TouchableOpacity>
        </>
      );
    }
    return null;
  };

  const renderModalContent = () => {
    if (selectedMarker) {
      const distance = calculateDistance(selectedMarker);
      const fare = (distance * 5).toFixed(2);
      const rate = 4.5;
      const timeToArrive = `${((distance / 30) * 60).toFixed(2)} mins`;

      return (
        <>
          <View style={styles.topContainer}>
            <TouchableOpacity onPress={closeMenu}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
            <Text style={styles.timeToArrive}>{timeToArrive}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{distance} km</Text>
            <Text style={styles.infoText}>${fare}</Text>
            <Text style={styles.infoText}>{rate} stars</Text>
          </View>
          <Text style={styles.distanceText}>{userLocationName}</Text>
          <Text style={styles.distanceText}>{selectedMarkerName}</Text>
          <TouchableOpacity
            style={[
              styles.menuItem,
              styles.searchButton,
              selectedOptions.length === 0 && styles.disabledButton,
            ]}
            onPress={handleOrderPress}
            disabled={searching || selectedOptions.length === 0}
          >
            <Text style={styles.searchButton}>Tap to Order</Text>
          </TouchableOpacity>
        </>
      );
    }
    return (
      <>
        <TouchableOpacity onPress={closeMenu}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
        <Text style={styles.FindingService}>Finding Service</Text>
        <TouchableOpacity
          onPress={() => selectOption("Mechanic")}
          style={[
            styles.menuItem,
            selectedOptions.includes("Mechanic") && styles.selectedOption,
          ]}
        >
          <Text style={styles.menuItemText}>Mechanic Nearby</Text>
          <Text style={styles.subText}>More mechanics than usual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectOption("Spare Parts Shop")}
          style={[
            styles.menuItem,
            selectedOptions.includes("Spare Parts Shop") &&
              styles.selectedOption,
          ]}
        >
          <Text style={styles.menuItemText}>Spare Shop Nearby</Text>
          <Text style={styles.subText}>More Shops than usual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            styles.searchButton,
            selectedOptions.length === 0 && styles.disabledButton,
          ]}
          onPress={handleSearchPress}
          disabled={searching || selectedOptions.length === 0}
        >
          <Text style={styles.searchButton}>Search</Text>
        </TouchableOpacity>
        {searching && (
          <TouchableOpacity
            style={[styles.menuItem, styles.cancelButton]}
            onPress={cancelSearch}
          >
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        )}
        {searching && (
          <ActivityIndicator size="large" color={COLORS.darkColorPrim} />
        )}
        {markers.length > 0 && (
          <Text style={styles.foundText}>
            {markers.length} services found nearby
          </Text>
        )}
      </>
    );
  };

  const clearMarkers = () => {
    setMarkers([]);
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const userToken = await SecureStore.getItemAsync("userToken");
        if (userToken) {
          axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;
        }
      } catch (error) {
        console.error("Error fetching user token", error);
      }
    };

    fetchToken();

    return () => {
      console.log("MapViewNearby component will unmount");
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapType="standard"
        initialRegion={{
          ...userLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={userLocation}
          title="User Location"
          description={userLocationName}
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker}
            title={`Marker ${index + 1}`}
            description={selectedMarkerName}
            onPress={() => onMarkerPress(marker)}
          />
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={navigateToProfile}
      >
        <Image
          source={{ uri: "https://www.gravatar.com/avatar/?d=mp" }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Text style={styles.titleToday}>{today}</Text>

      <Modal visible={menuVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>{renderModalContent()}</View>
        </View>
      </Modal>

      <Modal
        visible={orderModalVisible} 
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>{renderOrderModalContent()}</View>
        </View>
      </Modal>

      {/* Menu Button */}
      {userRole.role === "Car Owner" && (
      <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
        <Text style={styles.menuButtonText}>Search</Text>
      </TouchableOpacity>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingBottom: "15%",
    backgroundColor: COLORS.white, // Assuming light background color
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20, // Padding from the bottom
    paddingHorizontal: 20, // Horizontal padding
  },
  modalContent: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white, // Assuming light background color
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  profileButton: {
    position: "absolute",
    top: "8%",
    right: "5%",
    zIndex: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  closeButton: {
    position: "absolute",
    top: -10,
    fontSize: 24,
    color: COLORS.darkColorPrim,
  },
  titleToday: {
    position: "absolute",
    top: "8%",
    fontSize: 18,
    color: COLORS.darkGrey,
    backgroundColor: COLORS.white,
    width: 180,
    textAlign: "center",
    padding: "3%",
    borderRadius: 35,
    marginLeft: 105,
    zIndex: 10,
  },
  FindingService: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: COLORS.darkColorPrim,
  },
  menuButton: {
    position: "absolute",
    bottom: "5%",
    alignSelf: "center",
    backgroundColor: COLORS.darkColorPrim,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  menuButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  menuItem: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: 5,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
  },
  subText: {
    fontSize: 14,
    color: COLORS.black,
  },
  selectedOption: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.darkColorPrim,
  },
  searchButton: {
    backgroundColor: COLORS.darkColorPrim,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
  },
  disabledButton: {
    opacity: 0.5,
  },
  cancelButton: {
    backgroundColor: "red",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
  },
  topContainer: {
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: -35,
    marginBottom: -15,
  },
  infoRow: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  timeToArrive: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.darkColorPrim,
    marginRight: 110,
  },
  infoText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  distanceText: {
    fontSize: 16,
    textAlign: "center",
  },
  topContainerOrder: {
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: -35,
    marginBottom: -15,
  },
  timeToArriveOrder: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
    marginRight: 5,
  },
  userImageOrder: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  distanceTextOrder: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 5,
  },
  callIcon: {
    width: 30,
    height: 30,
  },
  CallTextOrder: {
    fontSize: 16,
    color: COLORS.darkColorPrim,
    textAlign: "center",
    marginVertical: 5,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.lineColor,
    marginVertical: 10,
  },
  buttonContainer: {
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: -35,
    marginBottom: -15,
  },
  iconButton: {
    alignItems: "center",
  },
  icon: {
    borderRadius: 25,
    width: 30,
    height: 30,
  },
  buttonText: {
    fontSize: 14,
    marginTop: 5,
  },
  arrivedButton: {
    backgroundColor: COLORS.darkColorPrim,
    padding: 15,
    borderRadius: 5,
    textAlign: "center",
    alignContent: "center",
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 25,
  },
  arrivedButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    alignContent: "center",
  },
  foundText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

export default MapViewNearby;
