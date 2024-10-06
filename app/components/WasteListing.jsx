import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WasteListing = () => {
  const [wasteList, setWasteList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing
  const [error, setError] = useState(null);

  const getAllWasteList = async () => {
    const base_url = "https://whmas-admin.vercel.app";
    try {
      const response = await axios.get(
        `${base_url}/wh-mas/api/products/get-all`
      );

      // Convert the object of objects to an array
      if (response.data.message.success) {
        const wasteArray = Object.values(response.data.message.success);
        setWasteList(wasteArray);
      } else {
        setError("No data available");
      }
    } catch (error) {
      console.log("Error fetching Data", error);
      setError("Failed to fetch waste list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllWasteList();
  }, []);

  // Function to refresh the list on pull
  const onRefresh = async () => {
    setRefreshing(true);
    await getAllWasteList();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#00C853" />
      </View>
    );
  }

  if (error || wasteList.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || "No waste items found"}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.wasteCard}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.infoText}>Price: ₦{item.price}</Text>
      <Text style={styles.infoText}>Location: {item.location}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.infoText}>Date: {item.datestamp}</Text>
    </View>
  );

  return (
      <FlatList
        data={wasteList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wasteCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 8,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default WasteListing;
