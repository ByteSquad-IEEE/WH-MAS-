import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileInfo from "../components/ProfileInfo";
import QuickActions from "../components/QuickActions";
import RecentDeliveries from "../components/RecentDeliveries";
import RecentTransactions from "../components/RecentTransactions";
import WHMASCash from "../components/WHMASCash";

const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          source={require("../../assets/DashbaordGreenBg.png")}
          className="h-[230px] w-full"
        >
          <ProfileInfo />
          <WHMASCash />
        </ImageBackground>
        <QuickActions />
        <RecentTransactions />
        <RecentDeliveries />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
