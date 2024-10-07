import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import TopBarBtn from "./TopBarBtn";

const ProfileInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    const fetchFirstName = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem("firstName");
        if (storedFirstName) {
          setFirstName(storedFirstName);
        }
      } catch (error) {
        console.error("Error fetching firstName:", error);
      }
    };

    fetchFirstName();
  }, []);

  useEffect(() => {
    const fetchLastName = async () => {
      try {
        const storedLastName = await AsyncStorage.getItem("lastName");
        if (storedLastName) {
          setLastName(storedLastName);
        }
      } catch (error) {
        console.error("Error fetching firstname:", error);
      }
    };

    fetchLastName();
  }, []);
  return (
    <View className="pt-8 px-4 flex flex-row justify-between">
      <View className="flex flex-row gap-2">
        <TouchableOpacity className="bg-gray-100 w-[42px] h-[42px] rounded-full flex items-center justify-center">
          <Ionicons name="person" size={25} />
        </TouchableOpacity>
        <View className="">
          <Text className="text-white font-medium">Welcome,</Text>
          <Text className="text-white text-[15px] font-semibold">
            {firstName} {lastName}
          </Text>
        </View>
      </View>

      <TopBarBtn isNotificationShown={true} />
    </View>
  );
};

export default ProfileInfo;
