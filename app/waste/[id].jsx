import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import axios from "axios";

const WasteDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [waste, setWaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchWasteDetails();
  }, [id]);

  const fetchWasteDetails = async () => {
    const base_url = "https://whmas-admin.vercel.app";
    try {
      const [wasteResponse, imagesResponse] = await Promise.all([
        axios.get(`${base_url}/wh-mas/api/products/get-all`),
        axios.get(`${base_url}/wh-mas/api/images/get-all`),
      ]);

      if (wasteResponse.data.message.success) {
        const wasteArray = Object.values(wasteResponse.data.message.success);
        const selectedWaste = wasteArray.find(
          (item) => item.id.toString() === id
        );

        if (selectedWaste && imagesResponse.data.message.success) {
          const imageArray = Object.values(imagesResponse.data.message.success);
          const wasteImage = imageArray[selectedWaste.image1]?.base64;

          setWaste(selectedWaste);
          setImage(wasteImage);
        }
      }
    } catch (error) {
      console.error("Error fetching waste details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00C853" />
      </View>
    );
  }

  if (!waste) {
    return (
      <View style={styles.errorContainer}>
        <Text>Waste item not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Entypo name="chevron-left" size={24} color="#333" />
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{waste.name}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>₦{waste.price}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>New</Text>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <Entypo name="location-pin" size={16} color="#666" />
          <Text style={styles.locationText}>{waste.location}</Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{waste.description}</Text>

        <View style={styles.dateContainer}>
          <Entypo name="calendar" size={14} color="#666" />
          <Text style={styles.dateText}>Posted on {waste.datestamp}</Text>
        </View>

        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Seller</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 1,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1DB954",
  },
  statusBadge: {
    backgroundColor: "#1DB954",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 16,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dateText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
  },
  contactButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  contactButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WasteDetails;
