import React from "react";
import { ScrollView, Text, View } from "react-native";
import DeliveryTruckImg from "../../assets/icon/undraw_delivery_truck_vt6p.svg";

const RecentDeliveries = () => {
  return (
    <View className="mx-4 mt-4 border border-[#D9D9D9] rounded-lg">
      <View className="py-2 px-4">
        <Text className="text-lg text-black">Recent Deliveries</Text>
      </View>
      <ScrollView
        style={{ maxHeight: 200 }}
        showsVerticalScrollIndicator={false}
        className="pb-2"
      >
        <View className="flex items-center justify-center mt-3">
          <DeliveryTruckImg width={100} height={100}  />
          <Text className="text-gray-400 font-medium text-center px-6">
            No Deliveries made yet! Buy or Sell waste to see your recent
            deliveries
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default RecentDeliveries;
