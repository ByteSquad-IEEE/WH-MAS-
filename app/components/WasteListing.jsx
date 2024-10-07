import Entypo from "@expo/vector-icons/Entypo";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

  const handleWastePress = (wasteItem) => {
    router.push({
      pathname: "/waste/[id]",
      params: { id: wasteItem.id },
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleWastePress(item)}
      style={styles.wasteCard}
    >
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>New</Text>
      </View>

      <Image
        source={{ uri: imageList.map((img) => img.base64)[item.image1] }}
        style={styles.image}
      />

      <TouchableOpacity style={styles.favoriteButton}>
        <Entypo name="heart-outlined" size={20} color="#FF4081" />
      </TouchableOpacity>

      <Text style={styles.title}>{item.name}</Text>

      <View style={styles.locationContainer}>
        <Entypo name="location-pin" size={16} color="#666" />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.dateContainer}>
        <Entypo name="calendar" size={14} color="#666" />
        <Text style={styles.dateText}>{item.datestamp}</Text>
      </View>

      <View style={styles.priceTag}>
        <Text style={styles.priceText}>₦{item.price}</Text>
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.detailsButton}>
          <Entypo name="dots-three-vertical" size={10} color="#1DB954" />
          <Text style={styles.detailsText}>Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
    paddingVertical: 10,
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
    padding: 10,
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
    marginBottom: 3,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 6,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  statusBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#1DB954",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "white",
    padding: 6,
    borderRadius: 20,
    zIndex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dateText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
  },
  priceTag: {
    backgroundColor: "#E8F5E9",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 8,
  },
  priceText: {
    color: "#1DB954",
    fontWeight: "bold",
    fontSize: 16,
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 8,
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsText: {
    marginLeft: 4,
    color: "#1DB954",
    fontSize: 14,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  contactText: {
    marginLeft: 4,
    color: "#1DB954",
    fontSize: 14,
  },
});

export default WasteListing;
