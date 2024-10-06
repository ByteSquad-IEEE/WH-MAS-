import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const QuickActions = () => {
  return (
    <View className="mx-4 mt-4 border border-[#D9D9D9] rounded-lg flex flex-row justify-center items-center">
      <View className="p-2">
        <TouchableOpacity className="flex items-center">
          <View className="bg-[#53e88c42] p-2 rounded-md">
            <Ionicons name="add-circle-outline" size={40} color="#1DB954" />
          </View>
          <Text className="mt-1 font-bold text-xs">Create Ad</Text>
        </TouchableOpacity>
      </View>
      <View className="p-2">
        <TouchableOpacity className="flex items-center">
          <View className="bg-[#53e88c42] p-2 rounded-md">
            <Ionicons name="archive" size={40} color="#1DB954" />
          </View>
          <Text className="mt-1 font-bold text-xs">Inventory</Text>
        </TouchableOpacity>
      </View>
      <View className="p-2">
        <TouchableOpacity className="flex items-center">
          <View className="bg-[#53e88c42] p-2 rounded-md">
            <Ionicons name="swap-horizontal" size={39} color="#1DB954" />
          </View>
          <Text className="mt-1 font-bold text-xs">Marketplace</Text>
        </TouchableOpacity>
      </View>
      <View className="p-2">
        <TouchableOpacity className="flex items-center">
          <View className="bg-[#53e88c42] p-2 rounded-md">
            <FontAwesome name="truck" size={40} color="#1DB954" />
          </View>
          <Text className="mt-1 font-bold text-xs">Delivery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuickActions;

const styles = StyleSheet.create({});
