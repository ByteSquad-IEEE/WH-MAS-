import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const WHMASCash = () => {
  return (
    <View className="px-4 mt-14">
      <LinearGradient
        colors={["#038E4C", "#53E88B", "#53E88B"]}
        locations={[0, 1, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
        className="rounded-xl p-4"
      >
        <View className="flex items-center flex-row gap-2">
          <View className="bg-gray-100 w-[42px] h-[42px] rounded-full flex items-center justify-center">
            <Ionicons name="wallet" size={25} color="#1DB954" />
          </View>
          <Text className="text-white font-bold text-[18px]">WHMAS Cash</Text>
        </View>
        <View className="flex flex-row justify-between mt-6">
          <View>
            <Text className="text-white font-bold">Available Cash</Text>
            <Text className="text-white font-bold text-xl mt-1">NGN. 0.00</Text>
          </View>
          <TouchableOpacity className="border border-white flex items-center flex-row justify-center p-3 rounded-xl">
            <Ionicons name="download-outline" size={25} color="#fff" />
            <Text className="text-white font-bold ml-2">Withdraw</Text>
          </TouchableOpacity>
        </View>
        <View className="border-t border-white py-3 mt-3">

          <TouchableOpacity className="flex flex-row items-center">
            <Ionicons name="time-outline" size={25} color="#fff" />
            <Text className="text-white ml-2 font-bold">
              Transaction History
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default WHMASCash;

const styles = StyleSheet.create({
  gradient: {
    height: 200,
    width: "100%",
  },
});
