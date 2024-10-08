import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DeliveryTruckImg from "../../assets/icon/undraw_delivery_truck_vt6p.svg";
import { router } from "expo-router";

const RecentDeliveries = () => {
  const [recentDeliveries, setRecentDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const base_url = "https://whmas-admin.vercel.app";

  const getRecentDeliveries = async () => {
    try {
      const response = await axios.get(`${base_url}/wh-mas/api/parcel/get-all`);
      const resData = response.data;
      const deliveryData = resData.message.success;

      // Convert to array if it's an object
      const deliveryArray = Array.isArray(deliveryData)
        ? deliveryData
        : Object.values(deliveryData);

      // Only get the first two deliveries
      const recent = deliveryArray.slice(0, 2);
      setRecentDeliveries(recent);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecentDeliveries();
  }, []);

  return (
    <View className="mx-4 mt-4 border border-[#D9D9D9] rounded-lg">
      <View className="py-2 px-4">
        <Text className="text-lg text-black">Recent Deliveries</Text>
      </View>
      {loading ? (
        <View className="flex items-center justify-center py-4">
          <ActivityIndicator size="large" color="#1DB954" />
        </View>
      ) : recentDeliveries.length === 0 ? (
        <View className="flex items-center justify-center mt-3">
          <DeliveryTruckImg width={100} height={100} />
          <Text className="text-gray-400 font-medium text-center px-5">
            Your delivery list is empty! Begin buying or selling waste to see
            your recent deliveries here.
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            style={{ maxHeight: 200 }}
            showsVerticalScrollIndicator={false}
            className="pb-2"
          >
            {recentDeliveries.map((item) => (
              <View
                key={item.id}
                className="flex justify-between p-4 border-b border-gray-300 mb-2"
              >
                <Text className="text-black font-bold text-base">
                  Delivery ID: {item.parcel_tracking_id}
                </Text>
                <Text className="text-sm text-gray-500">
                  Status: {item.delivery_status}
                </Text>
                <Text className="text-sm text-gray-500">
                  Date: {item.datestamp}
                </Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => router.push("/delivery")}>
            <Text className="px-4 py-2 text-primary underline">View all</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default RecentDeliveries;
