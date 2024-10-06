import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

const FilterAndSort = () => {
  return (
    <View className="mt-4 flex flex-row">
      <TouchableOpacity className="bg-white w-20 p-2 mr-4 rounded-lg flex items-center flex-row">
        <Ionicons name="filter" size={24} color="black" />
        <Text className="font-semibold ml-2">Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-white w-20 p-2 rounded-lg flex items-center flex-row">
        <FontAwesome name="sort" size={24} color="black" />
        <Text className="font-semibold ml-2">Sort</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterAndSort;
