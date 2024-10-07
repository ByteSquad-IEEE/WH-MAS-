import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../CartContext";

const TopBarBtn = ({ isNotificationShown, style }) => {
  const { cartItems, cartCount, updateCart } = useCart();
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  const handleCartPress = useCallback(() => {
    updateCart();
    bottomSheetRef.current?.expand();
  }, [updateCart]);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemTitle}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>₦{item.price}</Text>
        <Text style={styles.cartItemQuantity}>Quantity: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <>
      <View className="flex flex-row gap-2" style={style}>
        {isNotificationShown && (
          <TouchableOpacity className="bg-gray-100 w-[42px] h-[42px] rounded-full flex items-center justify-center">
            <Ionicons name="notifications-outline" size={25} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className="bg-gray-100 w-[42px] h-[42px] rounded-full flex items-center justify-center relative"
          onPress={handleCartPress}
        >
          <Ionicons name="cart-outline" size={25} />
          <Text className="absolute -top-1.5 right-0 bg-red-600 text-white px-1 rounded-full">
            {cartCount}
          </Text>
        </TouchableOpacity>
      </View>

      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          style={styles.bottomSheet}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.bottomSheetIndicator}
        >
          <View style={styles.bottomSheetContainer}>
            <View style={styles.bottomSheetContent}>
              <Text style={styles.bottomSheetTitle}>Your Cart</Text>
              {cartItems.length > 0 ? (
                <FlatList
                  data={cartItems}
                  renderItem={renderCartItem}
                  keyExtractor={(item) => item.id.toString()}
                  contentContainerStyle={styles.cartList}
                />
              ) : (
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
              )}
            </View>

            <View style={styles.checkoutContainer}>
              <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    zIndex: 1000,
  },
  bottomSheetBackground: {
    backgroundColor: "white",
  },
  bottomSheetIndicator: {
    backgroundColor: "#A0A0A0",
  },
  bottomSheetContent: {
    flex: 1,
    padding: 16,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cartList: {
    flexGrow: 1,
  },
  cartItem: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: 16,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cartItemInfo: {
    marginLeft: 12,
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemPrice: {
    fontSize: 14,
    color: "#1DB954",
    marginTop: 4,
  },
  cartItemQuantity: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  emptyCartText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginTop: 24,
  },

  bottomSheetContainer: {
    flex: 1,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 16,
    paddingBottom: 80, // Add padding to account for checkout button
  },
  cartList: {
    flexGrow: 1,
  },
  checkoutContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  checkoutButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TopBarBtn;
