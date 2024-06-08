import React, { useEffect, useReducer, useMemo, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Alert, LogBox } from "react-native";
import axios from "axios";

// Screen imports
import WelcomeScreen from "./screens/WelcomeScreen";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Reset from "./screens/Reset";
import PhoneNumber from "./screens/PhoneNumber";
import Otp from "./screens/Otp";
import PersonalDocuments from "./screens/PersonalDocument";
import AddVehicle from "./screens/AddVehicle";
import ShopDetailsForProfile from "./screens/ShopDetailsForProfile";
import VehicleDocuments from "./screens/VehicleDocuments";
import SubscriptionPlan from "./screens/SubscriptionPlan";
import MapViewNearby from "./screens/MapViewNearby";
import DriverProfileScreen from "./screens/DriverProfileScreen";
import RideDetailsScreen from "./screens/RideDetailsScreen";
import CancelRideScreen from "./screens/CancelRideScreen";
import CarOwnerProfileScreen from "./screens/CarOwnerProfileScreen";
import MechanicProfileScreen from "./screens/MechanicProfileScreen";
import SparePartsProfileScreen from "./screens/SparePartsProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SwitchServiceTypeScreen from "./screens/SwitchServiceTypeScreen";
import MyVehicleScreen from "./screens/MyVehicleScreen";
import VehicleDetailsScreen from "./screens/VehicleDetailsScreen";
import MyWalletScreen from "./screens/MyWalletScreen";
import AddMoneyToWalletScreen from "./screens/AddMoneyToWalletScreen";
import ShopListScreen from "./screens/ShopListScreen";
import OfferDetailsScreen from "./screens/OfferDetailsScreen";
import OffersScreen from "./screens/OffersScreen";
import ShopDetailScreen from "./screens/ShopDetailScreen";
import HomeNav from "./screens/HomeNav";
import Statistics from "./screens/Statistics";
import Reports from "./screens/Reports";
import Earning from "./screens/Earning";
import Traffic from "./screens/Traffic";
import Gated from "./screens/Gated";
import BankDetails from "./screens/BankDetails";
import SwitchServiceType from "./screens/SwitchServiceType";
import ThankYouCard from "./screens/ThankYouCard";

const BASE_URL = "https://newcaraid.onrender.com/api/";
const LOCAL_BASE_URL ="https://newcaraid.onrender.com/api/";

const Stack = createNativeStackNavigator();
export const AuthContext = createContext();

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            user: action.user,
            vehicles: action.vehicles,
            currentSubscription: action.currentSubscription,
            userRole: action.user,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            user: action.user,
            vehicles: action.vehicles,
            currentSubscription: action.currentSubscription,
            userRole: action.user,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            user: null,
            vehicles: [],
            userRole: null,
          };
        case "SET_BALANCE":
          return { ...prevState, balance: action.balance };
        case "SET_DOCUMENTS":
          return { ...prevState, documents: action.documents };
        case "COMPLETE_INITIAL_FLOW":
          return { ...prevState, initialFlowCompleted: true };
        case "ADD_VEHICLE":
          return {
            ...prevState,
            vehicles: [...prevState.vehicles, action.vehicle],
          };
        case "SET_VEHICLE_DETAILS":
          return { ...prevState, vehicle: action.vehicle };
        case "SET_BANK_CARDS":
          return { ...prevState, bankCards: action.bankCards };
        case "SET_RANDOM_PROFILES":
          return { ...prevState, randomProfiles: action.randomProfiles };
        case "SET_RANDOM_MECHANIC_PROFILES":
          return { ...prevState, randomMechanicProfiles: action.profiles };
        case "SET_MECHANIC_PROFILE":
          return { ...prevState, mechanicProfile: action.profile };
        case "SET_RANDOM_SPARE_PARTS_SHOPS":
          return { ...state, randomSparePartsShops: action.payload };

        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
      vehicles: [],
      documents: [],
      currentSubscription: null,
      balance: 0,
      vehicle: null,
      bankCards: [],
      randomProfiles: [],
      randomMechanicProfiles: [],
      mechanicProfile: null,
      randomSparePartsShops: [],
      userRole: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync("userToken");
        if (userToken) {
          console.log("Token retrieved:", userToken);
      
          const userResponse = await axios.get(
            `${LOCAL_BASE_URL}profile/getProfile`,
            {
              headers: { Authorization: `Bearer ${userToken}` },
            }
          );
          const user = userResponse.data;
          console.log("User profile:", user);

          const vehiclesResponse = await axios.get(
            `${LOCAL_BASE_URL}vehicle/getAllVehiclesForUser`,
            {
              headers: { Authorization: `Bearer ${userToken}` },
            }
          );
          const vehicles = vehiclesResponse.data;
          console.log("User vehicles:", vehicles);

          let currentSubscription = null;
          try {
            const subscriptionResponse = await axios.get(
              `${LOCAL_BASE_URL}subscription/mySubscription`,
              {
                headers: { Authorization: `Bearer ${userToken}` },
              }
            );
            currentSubscription = subscriptionResponse.data;
          } catch (error) {
            if (error.response && error.response.status === 404) {
              console.log("No active subscription found");
            } else {
              console.error("Failed to fetch current subscription", error);
            }
          }

          dispatch({
            type: "RESTORE_TOKEN",
            token: userToken,
            user,
            vehicles,
            currentSubscription,
          });
        } else {
          dispatch({ type: "RESTORE_TOKEN", token: null });
        }
      } catch (e) {
        console.error("Failed to load token", e);
        dispatch({ type: "RESTORE_TOKEN", token: null });
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        try {
          console.log("signIn: Attempting to sign in with data", data);
          const response = await axios.post(`https://newcaraid.onrender.com/api/users/login`, data);
          console.log("signIn: Response received", response);

          const token = response.data.accessToken;
          console.log("signIn: Token received", token);
          await SecureStore.setItemAsync("userToken", token);

          const userResponse = await axios.get(
            `${LOCAL_BASE_URL}profile/getProfile`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("signIn: User response received", userResponse);

          const user = userResponse.data;
          // console.log("userdata", user);
          // console.log("userRole", user.role);

          const vehiclesResponse = await axios.get(
            `${LOCAL_BASE_URL}vehicle/getAllVehiclesForUser`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("signIn: Vehicles response received", vehiclesResponse);

          const vehicles = vehiclesResponse.data;
          console.log("signIn: Vehicles fetched", vehicles);

          let currentSubscription = null;
          try {
            const subscriptionResponse = await axios.get(
              `${LOCAL_BASE_URL}subscription/mySubscription`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            currentSubscription = subscriptionResponse.data;
          } catch (error) {
            if (error.response && error.response.status === 404) {
              console.log("No active subscription found");
            } else {
              console.error("Failed to fetch current subscription", error);
            }
          }

          dispatch({
            type: "SIGN_IN",
            token,
            user,
            vehicles,
            currentSubscription,
          });
        } catch (error) {
          console.error("Failed to sign in", error);
          if (error.response) {
            console.error("Error Response Data:", error.response.data);
            console.error("Error Response Status:", error.response.status);
            console.error("Error Response Headers:", error.response.headers);
          } else if (error.request) {
            console.error("Error Request:", error.request);
          } else {
            console.error("Error Message:", error.message);
          }
        }
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (userData) => {
        console.log("signUp called with data:", userData);
        try {
          const response = await axios.post(
            "https://newcaraid.onrender.com/api/users/register",
            userData,
            {
              headers: {
                "Content-Type": "application/json",
              },
              timeout: 10000,
            }
          );
          console.log("Full server response:", response.data);
          Alert.alert(
            "Success",
            "Account created successfully. Please log in."
          );
        } catch (error) {
          if (error.response) {
            console.error("Response error data:", error.response.data);
            console.error("Response error status:", error.response.status);
            console.error("Response error headers:", error.response.headers);
            Alert.alert(
              "Error",
              error.response.data.message || "Something went wrong"
            );
          } else if (error.request) {
            console.error("Request error data:", error.request);
            Alert.alert("Error", "No response received from server");
          } else {
            console.error("Error message:", error.message);
            Alert.alert("Error", error.message);
          }
          console.error("API error:", error.config);
        }
      },
      addVehicle: async (vehicleData) => {
        try {
          const response = await axios.post(
            `${LOCAL_BASE_URL}vehicle/addNewVehicle`,
            vehicleData,
            {
              headers: { Authorization: `Bearer ${state.userToken}` },
            }
          );
          const newVehicle = response.data;

          dispatch({
            type: "ADD_VEHICLE",
            vehicle: newVehicle,
            currentSubscription: state.currentSubscription,
          });
          Alert.alert("Success", "Vehicle registered successfully.");
          return newVehicle;
        } catch (error) {
          console.error("Failed to register vehicle:", error);
          Alert.alert("Error", "Failed to register vehicle. Please try again.");
          throw error;
        }
      },
      createWallet: async () => {
        try {
          const response = await axios.post(
            `${LOCAL_BASE_URL}wallet/createWalletForUser`,
            {},
            {
              headers: { Authorization: `Bearer ${state.userToken}` },
            }
          );
          const wallet = response.data;
          console.log("Wallet created:", wallet);
        } catch (error) {
          console.error("Failed to create wallet:", error);
          Alert.alert("Error", "Failed to create wallet. Please try again.");
        }
      },
      uploadUserDocument: async (uri, documentType, name) => {
        const formData = new FormData();
        formData.append("file", {
          uri: uri,
          name: name,
          type: "application/pdf", // Ensure this matches the actual file type
        });
        formData.append("documentType", documentType);

        try {
          console.log("Uploading document with formData:", formData);
          const response = await axios.post(
            `${LOCAL_BASE_URL}upload/upload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${state.userToken}`,
              },
            }
          );
          console.log("Upload response:", response.data);
        } catch (error) {
          console.error("Upload error:", error);
          throw error;
        }
      },

      fetchUserDocuments: async () => {
        try {
          const response = await axios.get(
            `${LOCAL_BASE_URL}upload/documents`,
            {
              headers: { Authorization: `Bearer ${state.userToken}` },
            }
          );

          const documents = response.data.files || []; // Ensure this matches your backend response
          dispatch({ type: "SET_DOCUMENTS", documents });
          console.log("Documents fetched:", documents);
          return documents; // Return the fetched documents
        } catch (error) {
          console.error("Failed to fetch documents:", error);
          Alert.alert("Error", "Failed to fetch documents. Please try again.");
          return [];
        }
      },

      uploadVehicleDocument: async (uri, documentType, name, vehicleId) => {
        const formData = new FormData();
        formData.append("file", {
          uri,
          name,
          type: "application/pdf",
        });
        formData.append("documentType", documentType);

        try {
          const response = await axios.post(
            `${LOCAL_BASE_URL}upload/documents/${vehicleId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${state.userToken}`,
              },
            }
          );
          console.log("Upload response:", response.data);
        } catch (error) {
          console.error("Upload error:", error);
          Alert.alert("Error", "Failed to upload document. Please try again.");
          throw error;
        }
      },
      fetchVehicleDocuments: async (vehicleId) => {
        try {
          const response = await axios.get(
            `${LOCAL_BASE_URL}upload/vehicle-documents/${vehicleId}`,
            {
              headers: { Authorization: `Bearer ${state.userToken}` },
            }
          );
          const documents = response.data.files || [];
          dispatch({ type: "SET_DOCUMENTS", documents });
          console.log("Documents fetched:", documents);
          return documents;
        } catch (error) {
          console.error("Failed to fetch documents:", error);
          Alert.alert("Error", "Failed to fetch documents. Please try again.");
          return [];
        }
      },

      fetchVehicleDetails: async (vehicleId) => {
        try {
          const response = await axios.get(
            `${LOCAL_BASE_URL}vehicle/getVehicle/${vehicleId}`,
            {
              headers: { Authorization: `Bearer ${state.userToken}` },
            }
          );
          const vehicle = response.data;
          dispatch({ type: "SET_VEHICLE_DETAILS", vehicle });
        } catch (error) {
          console.error("Failed to fetch vehicle details:", error);
        }
      },

      addUserBankDetails: async (bankDetails) => {
        try {
          const endpoint = `${LOCAL_BASE_URL}bank/addUserBankDetails`;
          console.log("Adding bank details to:", endpoint);
          console.log("Bank Details:", bankDetails);
          const response = await axios.post(endpoint, bankDetails, {
            headers: { Authorization: `Bearer ${state.userToken}` },
          });
          console.log("Response:", response.data);
          Alert.alert("Success", "Bank details added successfully.");
        } catch (error) {
          if (error.response) {
            console.error("Error Response Data:", error.response.data);
            console.error("Error Response Status:", error.response.status);
            console.error("Error Response Headers:", error.response.headers);
          } else if (error.request) {
            console.error("Error Request:", error.request);
          } else {
            console.error("Error Message:", error.message);
          }
          throw error;
        }
      },

      getAllSubscriptionPlans: async () => {
        try {
          const response = await axios.get(
            `${LOCAL_BASE_URL}subscription/getAllSubscriptionPlan`,
            {
              headers: { Authorization: `Bearer ${state.userToken}` },
            }
          );
          console.log("getAllSubscriptionPlans response:", response.data);
          return response.data;
        } catch (error) {
          console.error("Error fetching subscription plans:", error);
          throw error;
        }
      },

      subscribeUser: async (planId) => {
        try {
          const response = await axios.post(
            `${LOCAL_BASE_URL}subscription/subscribe`,
            { planId },
            {
              headers: { Authorization: `Bearer ${state.userToken}` },
            }
          );

          const updatedSubscriptionResponse = await axios.get(
            `${LOCAL_BASE_URL}subscription/mySubscription`,
            {
              headers: { Authorization: `Bearer ${state.userToken}` },
            }
          );
          const updatedSubscription = updatedSubscriptionResponse.data;

          dispatch({
            type: "SIGN_IN",
            token: state.userToken,
            user: state.user,
            vehicles: state.vehicles,
            currentSubscription: updatedSubscription,
          });

          return response.data;
        } catch (error) {
          console.error("Error subscribing user:", error);
          throw error;
        }
      },

      createWallet: async () => {
        try {
          const response = await axios.post(
            `${LOCAL_BASE_URL}wallet/createWalletForUser`,
            {},
            {
              headers: { Authorization: `Bearer ${state.userToken}` },
            }
          );
          console.log("Wallet created:", response.data);
        } catch (error) {
          if (error.response && error.response.status === 200) {
            console.log("Wallet already exists");
          } else {
            console.error("Failed to create wallet:", error);
            Alert.alert("Error", "Failed to create wallet. Please try again.");
          }
        }
      },
      getBalance: async () => {
        try {
          const response = await axios.get(
            `${LOCAL_BASE_URL}wallet/getWalletBalance`,
            {
              headers: { Authorization: `Bearer ${state.userToken}` },
            }
          );
          const balance = response.data.balance;
          dispatch({ type: "SET_BALANCE", balance });
          console.log("User balance:", balance);
        } catch (error) {
          console.error("Failed to fetch balance:", error);
          Alert.alert("Error", "Failed to fetch balance. Please try again.");
        }
      },

      addBalance: async (amount) => {
        try {
          const response = await axios.post(
            `${LOCAL_BASE_URL}wallet/addFunds`,
            { amount },
            {
              headers: { Authorization: `Bearer ${state.userToken}` },
            }
          );
          const balance = response.data.balance;
          dispatch({ type: "SET_BALANCE", balance });
          console.log("Balance added:", balance);
        } catch (error) {
          console.error("Failed to add balance:", error);
          Alert.alert("Error", "Failed to add balance. Please try again.");
        }
      },

      fetchAllUsersCount: async () => {
        try {
          const response = await axios.get(
            `${LOCAL_BASE_URL}profile/getAllUsersCount`,
            {
              headers: { Authorization: `Bearer ${state.userToken}` },
            }
          );
          const count = response.data.count;
          console.log("All users count:", count);
          return count;
        } catch (error) {
          console.error("Error fetching all users count:", error);
          throw error;
        }
      },

      fetchRandomProfiles: async () => {
        try {
          const response = await axios.get(
            `${LOCAL_BASE_URL}profile/getRandomProfiles`,
            {
              headers: { Authorization: `Bearer ${state.userToken}` },
            }
          );
          const randomProfiles = response.data;
          dispatch({ type: "SET_RANDOM_PROFILES", randomProfiles });
        } catch (error) {
          console.error("Error fetching random profiles:", error);
          throw error;
        }
      },

      fetchBankDetails: async () => {
        try {
          const response = await axios.get(
            `${LOCAL_BASE_URL}bank/getBankDetails`,
            {
              headers: { Authorization: `Bearer ${state.userToken}` },
            }
          );
          const bankCards = response.data;
          dispatch({ type: "SET_BANK_CARDS", bankCards });
          return bankCards;
        } catch (error) {
          console.error("Failed to fetch bank details:", error);
          Alert.alert(
            "Error",
            "Failed to fetch bank details. Please try again."
          );
        }
      },

      fetchRandomMechanicProfiles: async () => {
        try {
          const response = await axios.get(
            `${LOCAL_BASE_URL}profile/getRandomMechanicProfiles`,
            {
              headers: { Authorization: `Bearer ${state.userToken}` },
            }
          );
          const randomMechanicProfiles = response.data;
          dispatch({
            type: "SET_RANDOM_MECHANIC_PROFILES",
            profiles: randomMechanicProfiles,
          });
        } catch (error) {
          console.error("Error fetching random mechanic profiles:", error);
          throw error;
        }
      },

      fetchMechanicProfile: async (mechanicId) => {
        try {
          const response = await axios.get(
            `${LOCAL_BASE_URL}profile/getMechanicProfile/${mechanicId}`,
            {
              headers: { Authorization: `Bearer ${state.userToken}` },
            }
          );
          const profile = response.data;
          dispatch({ type: "SET_MECHANIC_PROFILE", profile });
          return profile;
        } catch (error) {
          console.error("Failed to fetch mechanic profile:", error);
          throw error;
        }
      },
    }),
    [state.userToken]
  );

  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ state, dispatch, ...authContext }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="WelcomeScreen">
            {state.userToken == null ? (
              <>
                <Stack.Screen
                  name="WelcomeScreen"
                  component={WelcomeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Signup"
                  component={Signup}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Reset"
                  component={Reset}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PhoneNumber"
                  component={PhoneNumber}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Otp"
                  component={Otp}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="MapViewNearby"
                  component={MapViewNearby}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="Reset"
                  component={Reset}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="CancelRideScreen"
                  component={CancelRideScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DriverProfileScreen"
                  component={DriverProfileScreen}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="RideDetailsScreen"
                  component={RideDetailsScreen}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="CarOwnerProfileScreen"
                  component={CarOwnerProfileScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="MechanicProfileScreen"
                  component={MechanicProfileScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SparePartsProfileScreen"
                  component={SparePartsProfileScreen}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="SettingsScreen"
                  component={SettingsScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SwitchServiceTypeScreen"
                  component={SwitchServiceTypeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="VehicleDetailsScreen"
                  component={VehicleDetailsScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="MyVehicleScreen"
                  component={MyVehicleScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="MyWalletScreen"
                  component={MyWalletScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AddMoneyToWalletScreen"
                  component={AddMoneyToWalletScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ShopListScreen"
                  component={ShopListScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ShopDetailScreen"
                  component={ShopDetailScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="OfferDetailsScreen"
                  component={OfferDetailsScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="OffersScreen"
                  component={OffersScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="HomeNav"
                  component={HomeNav}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Statistics"
                  component={Statistics}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Reports"
                  component={Reports}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Earning"
                  component={Earning}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Traffic"
                  component={Traffic}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="PersonalDocuments"
                  component={PersonalDocuments}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="VehicleDocuments"
                  component={VehicleDocuments}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SubscriptionPlan"
                  component={SubscriptionPlan}
                  options={{ headerShown: false }}
                />

                <Stack.Screen name="Gated" component={Gated} />
                <Stack.Screen
                  name="BankDetails"
                  component={BankDetails}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AddVehicle"
                  component={AddVehicle}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SwitchServiceType"
                  component={SwitchServiceType}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ThankYouCard"
                  component={ThankYouCard}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ShopDetailsForProfile"
                  component={ShopDetailsForProfile}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}
