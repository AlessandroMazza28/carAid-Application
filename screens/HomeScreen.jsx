import { Image, View } from "react-native";
import { setDestination, setOrigin } from "../app/slices/navigationSlice";

// import { GOOGLE_MAPS_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import NavFavorites from "../components/NavFavorites";
import NavOptions from "../components/NavOptions";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tailwind from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>




      
      <View style={tailwind`p-5`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://drive.google.com/file/d/1b6CgM7RcwJ9-9IOdTfXtu5YHfQPxIMl6/view?usp=sharing",
          }}
        />
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder="Where From?"
          enablePoweredByContainer={false}
          minLength={2}
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details?.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          query={{
            key: "GOOGLE_MAPS_API_KEY",
            language: "en",
          }}
          styles={{
            container: {
              flex: 0,
              borderColor: "#999",
              borderRadius: 10,
              elevation: 2,
              backgroundColor: "#999",
              opacity: 1,
              marginBottom: 10,
            },
          }}
        />
        <NavOptions />
        <NavFavorites shouldSetOrigin />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
