import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DeliveryImg from "../assets/icon/undraw_delivery_truck_vt6p.svg";
import TopBarBtn from "./components/TopBarBtn";

const DeliveryScreen = () => {
  const [deliveries, setDeliveries] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const base_url = "https://whmas-admin.vercel.app";

  const getAllDeliveries = async () => {
    try {
      const response = await axios.get(`${base_url}/wh-mas/api/parcel/get-all`);
      const resData = response.data;
      const deliveryData = resData.message.success;
      setDeliveries(deliveryData); // Store the fetched data
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getAllDeliveries();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getAllDeliveries();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "ongoing":
        return <MaterialIcons name="pending" size={24} color="#1DB954" />;
      case "done":
        return (
          <Ionicons name="checkmark-circle-outline" size={20} color="#4CAF50" />
        );
      case "not started":
        return <Ionicons name="hourglass-outline" size={20} color="#FFA726" />;
      default:
        return (
          <Ionicons name="help-circle-outline" size={20} color="#757575" />
        );
    }
  };

  return (
    <SafeAreaView className="px-4 flex-1 flex">
      {/* Top Bar */}
      <View className="flex items-center my-4 relative flex-row justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons name="chevron-back" size={25} color="#1DB954" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-primary">Deliveries</Text>
        <TopBarBtn />
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#1DB954" />
        </View>
      ) : deliveries.length === 0 ? (
        /* Empty State */
        <View className="flex items-center justify-center mt-10">
          <DeliveryImg width={200} height={200} />
          <Text className="text-center text-sm w-72 text-gray-400 font-medium">
            Your delivery list is empty! Begin buying or selling waste to see
            all your deliveries here.
          </Text>
        </View>
      ) : (
        /* Delivery List */
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="flex gap-4">
            {Object.values(deliveries).map((item) => (
              <View
                key={item.id}
                className="flex justify-between p-4 bg-white border-primary border-0.5 mb-4 rounded-lg"
              >
                <Text className="text-black font-bold text-base mb-3.5">
                  Delivery ID: {item.parcel_tracking_id}
                </Text>
                <View className="flex flex-row items-center mb-3">
                  {getStatusIcon(item.delivery_status)}
                  <Text className="ml-2 text-sm text-gray-500">
                    Status: {item.delivery_status}
                  </Text>
                </View>
                <View className="flex flex-row items-center mb-3">
                  <Ionicons name="location-outline" size={20} color="#757575" />
                  <Text className="ml-2 text-sm text-gray-500">
                    Location: {item.current_location}
                  </Text>
                </View>
                <View className="flex flex-row items-center">
                  <Ionicons name="calendar-outline" size={20} color="#757575" />
                  <Text className="ml-2 text-sm text-gray-500">
                    Date: {item.datestamp}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default DeliveryScreen;
