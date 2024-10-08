import { View, Text, ScrollView } from "react-native";
import React from "react";
import TransactionImg from "../../assets/icon/undraw_credit_card_re_blml.svg"; // Make sure the path is correct

const RecentTransactions = () => {
  return (
    <View className="mx-4 mt-4 border border-[#D9D9D9] rounded-lg">
      <View className="py-2 px-4">
        <Text className="text-lg text-black">Recent Transactions</Text>
      </View>
      <ScrollView
        style={{ maxHeight: 200 }}
        showsVerticalScrollIndicator={false}
        className="pb-2"
      >
        <View className="flex items-center justify-center mt-3">
          <TransactionImg width={100} height={100} className="" />
          <Text className="text-gray-400 font-medium text-center px-5">
            No Transaction made yet! Start buying or selling waste to track your
            recent transactions.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default RecentTransactions;
