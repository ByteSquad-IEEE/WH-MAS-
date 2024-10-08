import React, { useState, useEffect } from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

const FilterAndSort = ({ onSort, activeSort, itemCount }) => {
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const sortOptions = [
    { id: "nameAsc", label: "Name (A-Z)", key: "name", direction: "asc" },
    { id: "nameDesc", label: "Name (Z-A)", key: "name", direction: "desc" },
    {
      id: "categoryAsc",
      label: "Category (A-Z)",
      key: "category",
      direction: "asc",
    },
    {
      id: "categoryDesc",
      label: "Category (Z-A)",
      key: "category",
      direction: "desc",
    },
    {
      id: "priceAsc",
      label: "Price (Low to High)",
      key: "price",
      direction: "asc",
    },
    {
      id: "priceDesc",
      label: "Price (High to Low)",
      key: "price",
      direction: "desc",
    },
    {
      id: "dateDesc",
      label: "Newest First",
      key: "datestamp",
      direction: "desc",
    },
    {
      id: "dateAsc",
      label: "Oldest First",
      key: "datestamp",
      direction: "asc",
    },
  ];

  const handleSortOption = (option) => {
    onSort(option);
    setSortModalVisible(false);
  };

  const activeSortLabel =
    sortOptions.find((opt) => opt.id === activeSort)?.label || "Sort";

  return (
    <>
      <View style={styles.container}>
        <View style={styles.itemCountContainer}>
          <Text style={styles.itemCountText}>{itemCount} items</Text>
        </View>
        <TouchableOpacity
          style={[styles.sortButton, activeSort && styles.activeSortButton]}
          onPress={() => setSortModalVisible(true)}
        >
          <FontAwesome
            name="sort"
            size={24}
            color={activeSort ? "#1DB954" : "black"}
          />
          <Text
            style={[styles.buttonText, activeSort && styles.activeButtonText]}
          >
            {activeSortLabel}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={sortModalVisible}
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort By</Text>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.sortOption,
                  activeSort === option.id && styles.activeSortOption,
                ]}
                onPress={() => handleSortOption(option)}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    activeSort === option.id && styles.activeSortOptionText,
                  ]}
                >
                  {option.label}
                </Text>
                {activeSort === option.id && (
                  <Ionicons name="checkmark" size={24} color="#1DB954" />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSortModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  itemCountContainer: {
    flex: 1,
  },
  itemCountText: {
    fontSize: 16,
    color: "#666",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  activeSortButton: {
    backgroundColor: "#E8F5E9",
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
  },
  activeButtonText: {
    color: "#1DB954",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sortOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  activeSortOption: {
    backgroundColor: "#E8F5E9",
  },
  sortOptionText: {
    fontSize: 16,
  },
  activeSortOptionText: {
    color: "#1DB954",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#1DB954",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default FilterAndSort;
