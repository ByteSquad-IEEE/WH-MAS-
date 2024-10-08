import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import * as ImageManipulator from "expo-image-manipulator";
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const Sell = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [condition, setCondition] = useState(null);
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);

  const dataCategory = [
    { key: "1", value: "Plastics" },
    { key: "2", value: "Metals" },
    { key: "2", value: "Electronics" },
    { key: "2", value: "Organic Waste" },
    { key: "2", value: "Others" },
  ];
  const dataCondition = [
    { key: "1", value: "New" },
    { key: "2", value: "Used" },
    { key: "2", value: "Recyclable" },
  ];

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const user = JSON.parse(userData);
        console.log("User data:", user);
        return user;
      } else {
        console.log("No user data found");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
      return null;
    }
  };

  useEffect(() => {
    const checkId = async () => {
      const user = await getUserData();
      if (user.id) {
        setUserId(user.id);
      }
    };
    checkId();
  }, []);

const optimizeImage = async (uri) => {
  try {
    const manipulateResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    return manipulateResult.uri;
  } catch (error) {
    console.error("Error optimizing image:", error);
    // Return original URI if optimization fails
    return uri;
  }
};


  const convertImageToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  };

  const pickImage = async () => {
    if (images.length >= 5) {
      Toast.show({
        type: "error",
        text1: "Maximum Images",
        text2: "You can only upload up to 5 images",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async () => {
    if (images.length < 3) {
      Toast.show({
        type: "error",
        text1: "3 images required",
        text2: "Please upload at least 3 images",
      });
      return;
    }

    if (
      !title ||
      !description ||
      !category ||
      !condition ||
      !price ||
      !location
    ) {
      Toast.show({
        type: "error",
        text1: "Missing Information",
        text2: "Please fill in all required fields",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const optimizedImages = await Promise.all(
        images.slice(0, 3).map((uri) => optimizeImage(uri))
      );

      Toast.show({
        type: "info",
        text1: "Uploading",
        text2: "Sending your ad to the server...",
      });

      const base64Images = await Promise.all(
        optimizedImages.map((uri) => convertImageToBase64(uri))
      );

      if (base64Images.includes(null)) {
        throw new Error("Failed to convert images to base64");
      }

      const apiData = {
        image1: base64Images[0],
        image2: base64Images[1],
        image3: base64Images[2],
        name: title,
        description,
        category,
        condition,
        price,
        location,
        user_id: userId,
      };
      const base_url = "https://whmas-admin.vercel.app";
      const response = await axios.post(
        `${base_url}/wh-mas/api/create-product-ad`,
        apiData,
      );
      console.log(response.data);
      Toast.show({
        type: "success",
        text1: "Ad Created",
        text2: "Your ad has been successfully created",
      });

      router.push("/inventory");
    } catch (error) {
        console.error("Error creating ad:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response?.data?.message || "Failed to create ad",
        });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#1DB954" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} className="text-primary flex-1">
            Create Your Ad
          </Text>
        </View>

        <Text className="px-4 text-gray-400 font-medium">
          Share your waste items with the community! Provide details, set your
          price, and reach potential buyers to help turn waste into value.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Ad Title"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <SelectList
                setSelected={(val) => setCategory(val)}
                data={dataCategory}
                save="value"
                search={false}
                placeholder="Select Category"
                fontFamily="Poppins_400Regular"
                boxStyles={styles.picker}
              />
            </View>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Condition</Text>
            <View style={styles.pickerContainer}>
              <SelectList
                setSelected={(val) => setCondition(val)}
                data={dataCondition}
                save="value"
                search={false}
                placeholder="Select Condition"
                fontFamily="Poppins_400Regular"
                boxStyles={styles.picker}
              />
            </View>
          </View>

          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <View style={styles.imageSection}>
            <View className="flex flex-row items-center ">
              <Text style={styles.label}>Add Image</Text>
              <Text className="text-gray-400 font-medium mb-2 ml-2">
                (3 required)
              </Text>
            </View>
            <TouchableOpacity onPress={pickImage} style={styles.addImageButton}>
              <Ionicons name="camera" size={24} color="#1DB954" />
              <Text style={styles.addImageText}>Add Image</Text>
            </TouchableOpacity>
            <ScrollView horizontal style={styles.imagePreviewScroll}>
              {images.map((uri, index) => (
                <View key={index} style={styles.imagePreviewContainer}>
                  <Image source={{ uri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    onPress={() => removeImage(index)}
                    style={styles.removeImageButton}
                  >
                    <Ionicons name="close-circle" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />

          <View className="mt-4">
            <Text className="text-gray-500 mb-1">
              *Note: Ensure all information is accurate before submitting.
            </Text>
            {isSubmitting ? (
              <ActivityIndicator size="large" color="#00C853" />
            ) : (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Create Ad</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    fontFamily: "Poppins_400Regular",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins_400Regular",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  form: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  imageSection: {
    marginBottom: 16,
  },
  addImageButton: {
    borderWidth: 1,
    borderColor: "#1DB954",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  addImageText: {
    color: "#1DB954",
    fontSize: 16,
    marginLeft: 8,
  },
  imagePreviewScroll: {
    flexDirection: "row",
  },
  imagePreviewContainer: {
    marginRight: 8,
    position: "relative",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "white",
    borderRadius: 12,
  },
  submitButton: {
    backgroundColor: "#34C759",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Sell;
