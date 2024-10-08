import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import TopBarBtn from "./TopBarBtn";

const ProfileInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData !== null) {
        const user = JSON.parse(userData);
        console.log("User data:", user);
        return user;
      } else {
        console.log("No user data found");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserData();
      if (user) {
        setFirstName(user.first_name);
        setLastName(user.last_name);
      }
    };

    fetchUserData();
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
