import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationImg from "../assets/icon/undraw_add_files_re_v09g.svg";
import TopBarBtn from "./components/TopBarBtn";

const Inventory = () => {
  return (
    <SafeAreaView className="px-4 flex-1 flex">
      <View className="flex items-center mt-4 relative flex-row justify-between ">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons name="chevron-back" size={25} color="#1DB954" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-primary">Inventory</Text>
        <TopBarBtn />
      </View>

      <View className="flex items-center justify-center mt-10">
        <NotificationImg width={200} height={200} />
        <Text className="text-center text-sm w-72 text-gray-400 font-medium">
          Your inventory is currently empty. Create an ad to start adding items
          and manage your listings.
        </Text>
        <TouchableOpacity className="mt-8 bg-primary rounded-full flex items-center flex-row  px-2 py-1" onPress={() => router.push("sell")}>
          <Ionicons name="add-circle-outline" size={40} color="#fff" />
          <Text className="text-white mx-3 font-semibold">Create Ad</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Inventory;
