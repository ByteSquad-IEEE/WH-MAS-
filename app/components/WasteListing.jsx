import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WasteListing = () => {
  const [wasteList, setWasteList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const getAllWasteList = async () => {
    const base_url = "https://whmas-admin.vercel.app";
    try {
      const response = await axios.get(
        `${base_url}/wh-mas/api/products/get-all`
      );

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

  const getAllImages = async () => {
    const base_url = "https://whmas-admin.vercel.app";
    try {
      const response = await axios.get(`${base_url}/wh-mas/api/images/get-all`);
      if (response.data.message.success) {
        const imageArray = Object.values(response.data.message.success);
        setImageList(imageArray);
      } else {
        setError("No data available");
      }
    } catch (error) {
      console.log("Error fetching Images:", error);
    }
  };

  useEffect(() => {
    getAllWasteList();
    getAllImages();
  }, []);

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
      <Image
        source={{ uri: imageList.map((img) => img.base64)[item.image1] }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.name}</Text>
      <Text className="text-sm font-bold text-gray-500">
        Location: {item.location}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
      <Text style={styles.infoText}>Date: {item.datestamp}</Text>
      <Text className="text-lg font-bold text-gray-500">
        Price: ₦{item.price}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={wasteList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="mt-4"
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wasteCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
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
