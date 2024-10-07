import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterAndSort from "../../components/FilterAndSort";
import TopBarBtn from "../../components/TopBarBtn";
import WasteListing from "../../components/WasteListing";

const BuyWaste = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView className="px-4 flex-1 flex">
        <View className="flex items-center mt-4 relative flex-row justify-between ">
          <TouchableOpacity onPress={() => router.back()} className="p-1">
            <Ionicons name="chevron-back" size={25} color="#1DB954" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-primary">Buy Waste</Text>
          <TopBarBtn />
        </View>
        <View className="mt-4 flex flex-row items-center w-auto bg-white rounded-full px-2">
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search waste materials or price..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            className="flex-1 ml-1"
          />
        </View>
        <FilterAndSort />
        <WasteListing />
    </SafeAreaView>
  );
};

export default BuyWaste;

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
});
