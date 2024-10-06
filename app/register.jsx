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
import Config from "react-native-config";

import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SelectList } from "react-native-dropdown-select-list";
import { SafeAreaView } from "react-native-safe-area-context";

// SplashScreen.preventAutoHideAsync();

const data = [
  { key: "1", value: "Waste Buyer" },
  { key: "2", value: "Waste Seller" },
];

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

const RegisterScreen = () => {
  const router = useRouter();
  // const navigation = useNavigation();
  const [selected, setSelected] = useState([]);
  // const [selectedRole, setSelectedRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

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

  const base_url = "https://whmas-admin.vercel.app";
  // console.log("Base URL:", base_url);

  // Inside RegisterScreen
  const handleNext = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !state ||
      !city ||
      !address ||
      !phone ||
      !selected
    ) {
      Alert.alert("Error", "Please fill in all fields and select a role.");
      return;
    }

    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      state,
      city,
      address,
      phone_number: phone,
      user_role: selected,
    };

    router.push({
      pathname: "/registerPassword",
      params: userData,
    });
  };

  // const handleSubmit = async () => {
  //   if (
  //     !firstName ||
  //     !lastName ||
  //     !email ||
  //     !state ||
  //     !city ||
  //     !address ||
  //     !phone ||
  //     !selected
  //   ) {
  //     Alert.alert("Error", "Please fill in all fields and select a role.");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(`${base_url}/wh-mas/api/register`, {
  //       first_name: firstName,
  //       last_Name: lastName,
  //       email,
  //       state,
  //       city,
  //       address,
  //       phone_number: phone,
  //       user_role: selected,
  //     });
  //     const resData = response.data;
  //     console.log(resData);
  //   } catch (error) {
  //     console.log("Failed to submit data:", error);
  //     Alert.alert("Error", "Registration failed. Please try again.");
  //   }
  // };

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
          <View style={styles.inputRow}>
            <View style={styles.halfInput}>
              <FloatingLabelInput
                label="First name"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.halfInput}>
              <FloatingLabelInput
                label="Last name"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <FloatingLabelInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <View style={styles.inputRow}>
            <View style={styles.halfInput}>
              <FloatingLabelInput
                label="State"
                value={state}
                onChangeText={setState}
              />
            </View>
            <View style={styles.halfInput}>
              <FloatingLabelInput
                label="City"
                value={city}
                onChangeText={setCity}
              />
            </View>
          </View>

          <FloatingLabelInput
            label="Address"
            value={address}
            onChangeText={setAddress}
          />

          <FloatingLabelInput
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <View style={styles.pickerContainer}>
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
              search={false}
              placeholder="Select Role"
              fontFamily="Poppins_400Regular"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate("login")}
            >
              Sign In
            </Text>
          </Text>
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
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    height: 255,
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
    marginTop: -50,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    elevation: 5,
    width: "90%",
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
    fontFamily: "Poppins_700Bold",
  },
  inputRow: {
    flexDirection: "row",
  },
  halfInput: {
    flex: 1,
    paddingRight: 10,
  },
  pickerContainer: {
    marginTop: 5,
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

export default RegisterScreen;
