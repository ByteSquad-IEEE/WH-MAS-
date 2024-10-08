import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserData = async (newData) => {
    try {
      const updatedData = { ...userData, ...newData };
      await AsyncStorage.setItem("userData", JSON.stringify(updatedData));
      setUserData(updatedData);
      return true;
    } catch (error) {
      console.error("Error updating user data:", error);
      return false;
    }
  };

  const updateWalletBalance = async (newBalance) => {
    return await updateUserData({ wallet_balance: newBalance });
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      setUserData(null);
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        isLoading,
        updateUserData,
        updateWalletBalance,
        clearUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
