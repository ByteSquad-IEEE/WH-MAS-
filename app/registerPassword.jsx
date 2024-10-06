import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
import axios from "axios";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";

// SplashScreen.preventAutoHideAsync();

const FloatingLabelInput = ({ label, value, onChangeText, keyboardType }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: "absolute",
    left: 0,
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: ["#aaa", "#000"],
    }),
  };

  return (
    <View style={{ paddingTop: 18 }}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        value={value}
        style={styles.input}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType={keyboardType}
        placeholder={isFocused ? "" : label}
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

const RegisterPassword = ({ route }) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const saveEmailToStorage = async (email) => {
    try {
      await AsyncStorage.setItem("userEmail", email);
      console.log("Email saved successfully");
    } catch (error) {
      console.error("Error saving email:", error);
    }
  };

  const handleSubmit = async () => {
    if (!password || !confirm_password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirm_password) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    const base_url = "https://whmas-admin.vercel.app";
    console.log("Sending Data:", params, password, confirm_password);

    const paramsData = {
      ...params,
      password,
      confirm_password,
    };
    console.log(paramsData);
    try {
      const response = await axios.post(
        `${base_url}/wh-mas/api/register`,
        paramsData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Registration successful:", response.data);
      await saveEmailToStorage(params.email);
      Alert.alert("Success", "Registration completed successfully!", [
        { text: "OK", onPress: () => router.push("/verifyOtp") },
      ]);
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message
      );
      Alert.alert("Error", "Registration failed. Please try again.");
    }
  };

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

  return (
    <SafeAreaView>
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
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Register</Text>
          <Text style={styles.subHeaderText}>Create your WHMAS account.</Text>
        </ImageBackground>
  
        <View style={styles.form}>
          <FloatingLabelInput
            label="Create Password"
            value={password}
            onChangeText={setPassword}
            keyboardType="password"
            secureTextEntry={true}
          />
  
          <FloatingLabelInput
            label="Confirm Password"
            value={confirm_password}
            onChangeText={setConfirmPassword}
            keyboardType="password"
            secureTextEntry={true}
          />
  
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  header: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    height: 290,
  },
  headerText: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
  },
  subHeaderText: {
    color: "#fff",
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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#727272",
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    fontFamily: "Poppins_400Regular",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
  inputRow: {
    flexDirection: "row",
  },
  halfInput: {
    flex: 1,
    paddingRight: 10,
  },
  pickerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#727272",
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
    fontFamily: "Poppins_400Regular",
  },
  pickerItem: {
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

export default RegisterPassword;
