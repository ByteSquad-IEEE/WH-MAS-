import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DeliveryTruckImg from "../../assets/icon/undraw_delivery_truck_vt6p.svg";

const RecentTransactions = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const base_url = "https://whmas-admin.vercel.app";

  const getRecentTransactions = async () => {
    try {
      const response = await axios.get(
        `${base_url}/wh-mas/api/transactions/get-all`
      );
      const resData = response.data;
      console.log(resData);
      const deliveryData = resData.message.success;

      const deliveryArray = Array.isArray(deliveryData)
        ? deliveryData
        : Object.values(deliveryData);
      const recent = deliveryArray.slice(0, 2);
      setRecentTransactions(recent);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecentTransactions();
  }, []);

  return (
    <SafeAreaView>
      <View className="mx-4 mt-4 border border-[#D9D9D9] rounded-lg">
        <View className="py-2 px-4">
          <Text className="text-lg text-black">Recent Transaction</Text>
        </View>
        {loading ? (
          <View className="flex items-center justify-center py-4">
            <ActivityIndicator size="large" color="#1DB954" />
          </View>
        ) : recentTransactions.length === 0 ? (
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
              {recentTransactions.map((item) => (
                <View
                  key={item.id}
                  className="flex justify-between p-4 border-b border-gray-300 mb-2"
                >
                  <Text className="text-black font-bold text-base">
                    Transaction ID: {item.transaction_id}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    Status: {item.status}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    Date: {item.datestamp}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => router.push("/transaction")}>
              <Text className="px-4 py-2 text-primary underline">View all</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default RecentTransactions;
