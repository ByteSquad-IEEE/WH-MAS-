import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TopBarBtn from "./components/TopBarBtn";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const getAllTransactions = async () => {
    const base_url = "https://whmas-admin.vercel.app";
    try {
      setError(null);
      const response = await axios.get(
        `${base_url}/wh-mas/api/transactions/get-all`
      );
      const resData = response.data.message.success;
      const transactionArray = Array.isArray(resData)
        ? resData
        : Object.values(resData);
      setTransactions(transactionArray);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load transactions. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllTransactions();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#1DB954" />
        </View>
      );
    }

    if (error) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 mb-4">{error}</Text>
          <TouchableOpacity
            onPress={onRefresh}
            className="bg-primary py-2 px-4 rounded-md"
          >
            <Text className="text-white">Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (transactions.length === 0) {
      return (
        <View className="flex items-center justify-center mt-10">
          <Text className="text-center text-sm w-72 text-gray-400 font-medium">
            Your transaction list is empty! Begin making transactions to see
            them listed here.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex gap-4">
          {transactions.map((item) => (
            <View
              key={item.id}
              className="flex justify-between p-4 border border-gray-200 rounded-md mb-2 bg-white"
            >
              <Text className="text-black font-bold text-base">
                Transaction ID: {item.transaction_id}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                Amount: ₦{item.amount}
              </Text>
              <Text className="text-sm text-gray-500">
                Status:{" "}
                <Text
                  className={`font-semibold ${
                    item.status === "success"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item.status}
                </Text>
              </Text>
              <Text className="text-sm text-gray-500">
                Date: {item.datestamp} {item.timestamp}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView className="px-4 mt-6 flex-1 flex">
      <View className="flex items-center my-4 relative flex-row justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons name="chevron-back" size={25} color="#1DB954" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-primary">Transactions</Text>
        <TopBarBtn />
      </View>

      {renderContent()}
    </SafeAreaView>
  );
};

export default Transaction;
