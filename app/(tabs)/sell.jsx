import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import NotificationImg from "../assets/icon/undraw_add_files_re_v09g.svg";
import TopBarBtn from "../components/TopBarBtn";

const Sell = () => {
  return (
    <SafeAreaView className="px-4 flex-1 flex">
      <View className="flex items-center mt-4 relative flex-row justify-between ">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons name="chevron-back" size={25} color="#1DB954" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-primary">Create your Ad</Text>
        <TopBarBtn />
      </View>

      <View className="flex items-center justify-center mt-4">
        <Text className="text-center text-sm w-80 text-gray-400 font-medium">
          Share your waste items with the community! Provide details, set your
          price, and reach potential buyers to help turn waste into value.
        </Text>
        <Text className="mx-3 font-semibold text-primary mt-10">New Ad</Text>

        
      </View>
    </SafeAreaView>
  );
};

export default Sell;
