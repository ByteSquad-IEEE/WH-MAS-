import { router, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Prevent the splash screen from auto-hiding
// SplashScreen.preventAutoHideAsync();

const Start = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null); // Initially set to null, not true

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  // Function to get user data from AsyncStorage
  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const user = JSON.parse(userData);
        console.log("User data:", user);
        return user;
      } else {
        console.log("No user data found");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
      return null;
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await getUserData();
      if (user && user.id) {
        setId(user.id);
        setIsLoggedIn(true);
        console.log("User is logged in, ID:", user.id);
        router.push("/dashboard");
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#00C853" />
      </View>
    );
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground
        source={require("../assets/start.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <Text style={styles.title}>WMHAS</Text>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.description}>
            Turn Waste into value. Buy, sell, and help create a waste-free
            world.
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("register")}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 128, 0, 0.5)",
  },
  title: {
    position: "absolute",
    top: 50,
    fontSize: 24,
    color: "white",
    right: 20,
    fontFamily: "Poppins_700Bold",
  },
  welcomeContainer: {
    width: "100%",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 80,
  },
  welcomeText: {
    fontSize: 36,
    color: "white",
    textAlign: "left",
    marginBottom: 10,
    fontFamily: "Poppins_700Bold",
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "left",
    marginBottom: 40,
    fontFamily: "Poppins_400Regular",
  },
  loginButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    width: "100%",
    borderRadius: 25,
    marginBottom: 15,
    alignSelf: "center",
  },
  buttonText: {
    color: "#1db954",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  registerButton: {
    backgroundColor: "transparent",
    borderColor: "#fff",
    borderWidth: 1,
    paddingVertical: 10,
    width: "100%",
    borderRadius: 25,
    alignSelf: "center",
  },
  registerText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
});

export default Start;
