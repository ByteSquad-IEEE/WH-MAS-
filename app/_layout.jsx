import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { PortalProvider } from "@gorhom/portal";
import { CartProvider } from "./CartContext";

const _layout = () => {
  return (
<CartProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PortalProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="start" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen
              name="registerPassword"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="verifyOtp" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <Toast />
        </PortalProvider>
      </GestureHandlerRootView>
</CartProvider>
  );
};

export default _layout;
