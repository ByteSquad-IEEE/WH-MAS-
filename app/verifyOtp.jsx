import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import axios from "axios";
import { router, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import OtpImg from "../assets/icon/undraw_mail_sent_re_0ofv 1.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OtpInput = ({ code, setCode }) => {
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.otpContainer}>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={styles.otpInput}
          maxLength={1}
          keyboardType="numeric"
          value={code[index]}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
};

const VerifyOtp = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const getStoredEmail = async () => {
    try {
      const email = await AsyncStorage.getItem("userEmail");
      return email;
    } catch (error) {
      console.error("Error retrieving email:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    const base_url = "https://whmas-admin.vercel.app";
    const email = await getStoredEmail();
    const otp = otpCode.join("");
    console.log(email, otp)

    if (!email) {
      console.error("No email found in storage");
      return;
    }
    try {
      const response = await axios.post(`${base_url}/wh-mas/api/confirm-otp`, {
        otp,
        email,
      });

      const resData = response.data;
      console.log(resData);
      Alert.alert("Success", "Otp verification Successful!", [
        { text: "OK", onPress: () => router.push("/dashboard") },
      ]);
    } catch (error) {
      console.log("Error submitting Data:", error);
      Alert.alert("Error", "Otp verification failed. Please try again.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onLayout={onLayoutRootView}
    >
      <ImageBackground
        source={require("../assets/authBgPatternImg.png")}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          className="w-12"
        >
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <View className="flex items-center justify-center">
          <OtpImg className="" />
        </View>
      </ImageBackground>

      <View style={styles.form}>
        <Text className="text-center" style={styles.headerText}>
          OTP Verification
        </Text>
        <Text className="text-center" style={styles.subHeaderText}>
          Enter the OTP sent to your email address
        </Text>

        <OtpInput code={otpCode} setCode={setOtpCode} />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Didn't get a code?{" "}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("register")}
          >
            Resend
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 10,
    display: "flex",
    backgroundColor: "green",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: "flex-start",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  header: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    height: 290,
  },
  headerText: {
    color: "#000",
    fontSize: 25,
    fontFamily: "Poppins_700Bold",
  },
  subHeaderText: {
    color: "#000",
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
  },
  form: {
    marginTop: -45,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    elevation: 5,
    width: "90%",
    display: "flex",
    gap: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
  },
  button: {
    backgroundColor: "#00C853",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    fontFamily: "Poppins_400Regular",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins_400Regular",
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  linkText: {
    color: "#00C853",
    fontWeight: "bold",
  },
});

export default VerifyOtp;
