import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DeliveryImg from "../assets/icon/undraw_delivery_truck_vt6p.svg";
import TopBarBtn from "./components/TopBarBtn";

const DeliveryScreen = () => {
  return (
    <SafeAreaView className="px-4 flex-1 flex">
      <View className="flex items-center mt-4 relative flex-row justify-between ">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons name="chevron-back" size={25} color="#1DB954" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-primary">Deliveries</Text>
        <TopBarBtn />
      </View>

      <View className="flex items-center justify-center mt-10">
        <DeliveryImg width={200} height={200} />
        <Text className="text-center text-sm w-72 text-gray-400 font-medium">
          Your delivery list is empty! Begin buying or selling waste to see your
          all your deliveries here.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryScreen;
