import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const TopBarBtn = ({ isNotificationShown }) => {
  return (
    <View className="flex flex-row gap-2">
      {isNotificationShown && (
        <TouchableOpacity className="bg-gray-100 w-[42px] h-[42px] rounded-full flex items-center justify-center">
          <Ionicons name="notifications-outline" size={25} />
        </TouchableOpacity>
      )}
      <TouchableOpacity className="bg-gray-100 w-[42px] h-[42px] rounded-full flex items-center justify-center relative">
        <Ionicons name="cart-outline" size={25} />
        <Text className="absolute -top-1.5 right-0 bg-red-600 text-white px-1 rounded-full">
          0
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopBarBtn;
