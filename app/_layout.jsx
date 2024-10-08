import { PortalProvider } from "@gorhom/portal";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { CartProvider } from "./CartContext";
import { UserProvider } from "./useContext";

const _layout = () => {
  return (
    <UserProvider>
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
              <Stack.Screen
                name="notifications"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="inventory" options={{ headerShown: false }} />
              <Stack.Screen name="delivery" options={{ headerShown: false }} />
              <Stack.Screen
                name="transaction"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="paymentwebview"
                options={{ headerShown: false }}
              />
            </Stack>
            <Toast />
          </PortalProvider>
        </GestureHandlerRootView>
      </CartProvider>
    </UserProvider>
  );
};

export default _layout;
