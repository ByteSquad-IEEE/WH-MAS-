import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileInfo from "../components/ProfileInfo";
import WHMASCash from "../components/WHMASCash";
import QuickActions from "../components/QuickActions";
import RecentTransactions from "../components/RecentTransactions";

const Home = () => {
  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../../assets/DashbaordGreenBg.png")}
        className="h-[230px] w-full"
      >
        <ProfileInfo />
        <WHMASCash />
        <QuickActions />
        <RecentTransactions />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;
