import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Paystack, paystackProps } from "react-native-paystack-webview";

function Pay() {
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);

  return (
    <View style={{ flex: 1 }}>
      <Paystack
        paystackKey="your-public-key-here"
        billingEmail="paystackwebview@something.com"
        amount={"25000.00"}
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          // handle response here
        }}
        ref={paystackWebViewRef}
      />

      <TouchableOpacity
        onPress={() => paystackWebViewRef.current.startTransaction()}
      >
        <Text>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}
