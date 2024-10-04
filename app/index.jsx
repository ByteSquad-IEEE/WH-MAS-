import { useNavigation } from "expo-router";
import { useCallback } from "react";
import {
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

// SplashScreen.preventAutoHideAsync();

const Start = () => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
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
    fontFamily: "Poppins_700Bold", // Changed to bold
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
