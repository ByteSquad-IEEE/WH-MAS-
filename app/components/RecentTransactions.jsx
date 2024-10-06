import { View, Text, ScrollView } from 'react-native'
import React from 'react'

const RecentTransactions = () => {
  return (
    <View className="mx-4 mt-4 border border-[#D9D9D9] rounded-lg">
      <View className="p-2">
        <Text className="text-lg text-black">Recent Transactions</Text>
      </View>
      <ScrollView>
        
      </ScrollView>
    </View>
  );
}

export default RecentTransactions