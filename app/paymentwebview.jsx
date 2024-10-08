// app/paymentwebview.js
import React from "react";
import { WebView } from "react-native-webview";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

const PaymentWebView = () => {
  // Use useLocalSearchParams instead of useSearchParams
  const { paymentLink } = useLocalSearchParams();

  if (!paymentLink) {
    return (
      <View style={styles.container}>
        <Text>No payment link provided</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: paymentLink }}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading payment page...</Text>
          </View>
        )}
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default PaymentWebView;
