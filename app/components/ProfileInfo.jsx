import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const ProfileInfo = () => {
  return (
    <View className="pt-8 px-4 flex flex-row justify-between">
      <View className="flex flex-row gap-2">
        <TouchableOpacity className="bg-gray-100 w-[42px] h-[42px] rounded-full flex items-center justify-center">
          <Ionicons name="person" size={25} />
        </TouchableOpacity>
        <View className="">
          <Text className="text-white font-medium">Welcome,</Text>
          <Text className="text-white text-[15px] font-semibold">
            David Nzube
          </Text>
        </View>
      </View>

      <View className="flex flex-row gap-2">
        <TouchableOpacity className="bg-gray-100 w-[42px] h-[42px] rounded-full flex items-center justify-center">
          <Ionicons name="notifications-outline" size={25} />
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-100 w-[42px] h-[42px] rounded-full flex items-center justify-center">
          <Ionicons name="settings-outline" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProfileInfo