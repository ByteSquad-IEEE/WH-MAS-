import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const [walletBalance, setWalletBalance] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      console.log("User data removed");
      router.push("/login");
    } catch (error) {
      console.error("Error removing user data:", error);
    }
  };

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData !== null) {
        const user = JSON.parse(userData);
        console.log("User data:", user);
        return user;
      } else {
        console.log("No user data found");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserData();
      if (user) {
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setWalletBalance(user.wallet_balance);
        setPhoneNumber(user.phone_number);
        setEmail(user.email);
        setAddress(user.address);
        setCity(user.city);
        setState(user.state);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ImageBackground
          source={require("../../assets/DashbaordGreenBg.png")}
          style={styles.headerBackground}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>

          {/* Edit Button */}
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={30} color="white" />
          </TouchableOpacity>

          {/* Profile Image and Info */}
          <View style={styles.profileHeader}>
            <Image
              source={require("../../assets/profileImage.png")}
              style={styles.profileImage}
            />
            <View style={styles.profileDetails}>
              <Text style={styles.userName}>
                {firstName} {lastName}
              </Text>
            </View>
          </View>

          {/* Contact Info */}
          <View style={styles.contactInfoContainer}>
            <View style={styles.contactInfo}>
              <Ionicons name="call-outline" size={20} color="#fff" />
              <Text style={styles.contactText}>{phoneNumber}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Ionicons name="mail-outline" size={20} color="#fff" />
              <Text style={styles.contactText}>{email}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Ionicons name="home-outline" size={20} color="#fff" />
              <Text style={styles.contactText}>
                {address}, {city}, {state}
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* Wallet and Orders Section */}
        <View style={styles.walletOrders}>
          <View style={styles.walletOrdersItem}>
            <Text style={styles.walletAmount}>NGN {walletBalance}</Text>
            <Text style={styles.walletLabel}>Wallet</Text>
          </View>
          <View style={styles.walletOrdersItem}>
            <Text style={styles.orderCount}>12</Text>
            <Text style={styles.walletLabel}>Completed Orders</Text>
          </View>
        </View>

        {/* Options Section */}
        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="pricetag-outline" size={24} color="#4CAF50" />
          <Text style={styles.optionText}>Your Wastes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="card-outline" size={24} color="#4CAF50" />
          <Text style={styles.optionText}>Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="share-social-outline" size={24} color="#4CAF50" />
          <Text style={styles.optionText}>Referal Program</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="settings-outline" size={24} color="#4CAF50" />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem} onPress={logoutUser}>
          <Ionicons name="log-out-outline" size={24} color="red" />
          <Text style={styles.optionText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerBackground: {
    height: 300,
    width: "100%",
    justifyContent: "flex-end",
    paddingBottom: 20,
    paddingTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  editButton: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  profileHeader: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: "#fff",
    borderWidth: 2,
  },
  profileDetails: {
    marginLeft: 20,
    alignItems: "flex-start",
  },
  userName: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  contactInfoContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  contactText: {
    marginLeft: 10,
    color: "#fff",
  },
  walletOrders: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  walletOrdersItem: {
    alignItems: "center",
  },
  walletAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  orderCount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  walletLabel: {
    fontSize: 14,
    color: "#777",
  },
  optionItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
  logoutItem: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
    color: "red",
  },
});

export default Profile;
