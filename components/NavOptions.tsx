import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { Icon } from "react-native-elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StackList } from "./HomeNavigation";
import { selectOrigin } from "../app/slices/navigationSlice";
import tailwind from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const NavOptions = () => {
  const navigation = useNavigation<HomeScreenProp>();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={navData}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          disabled={!origin}
          onPress={() => navigation.navigate(item.screen)}
          style={tailwind`pr-2 pl-14 pt-7 pb-10 bg-gray-200 mr-2 mb-5 w-60 rounded-md`}
        >
          <View style={tailwind.style(!origin && "opacity-20")}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 120, height: 120, resizeMode: "contain" }}
            />
            <Text style={tailwind`mt-2 text-lg font-bold`}>{item.title}</Text>
            <Icon
              style={tailwind`p-2 bg-blue-500 rounded-full w-10 mt-6 ml-9`}
              type="antdesign"
              color="white"
              name="arrowright"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

type NavData = {
  id: string;
  title: string;
  image: string;
  screen: keyof StackList;
}[];

export const navData: NavData = [
  {
    id: "123",
    title: "Get A Mechanic",
    image: "https://cdn-icons-png.freepik.com/512/6417/6417601.png",
    screen: "MapScreen",
  },
];

export type HomeScreenProp = NativeStackNavigationProp<StackList, "HomeScreen">;

export default NavOptions;
