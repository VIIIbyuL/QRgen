import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, FlatList, Text, View } from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore"; // Add DocumentData import
import { db, auth } from "../firebase";
import { TouchableOpacity } from "react-native";
import { Linking } from "react-native";
import { orderBy } from "firebase/firestore"; 

export default function ModalScreen() {
  const [scannedCodes, setScannedCodes] = useState<DocumentData[]>([]); // Update type of scannedCodes
  const isURL = (text: string) => {
    const regexp = /^(https?:\/\/)/i;
    return regexp.test(text);
  };
  const openURL = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  useEffect(() => {
    const fetchScannedCodes = async () => {
      if (auth.currentUser) {
        const q = query(
          collection(db, `users/${auth.currentUser.uid}/scannedCodes`),
          orderBy("timestamp", "desc") // Order by timestamp in descending order
        );
        const querySnapshot = await getDocs(q);
        const codes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setScannedCodes(codes);
      }
    };

    fetchScannedCodes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanner Information</Text>
      <View style={styles.separator} />
      <FlatList
        data={scannedCodes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              {isURL(item.data) ? (
                <TouchableOpacity onPress={() => openURL(item.data)}>
                  <Text
                    style={[
                      styles.cardText,
                      { color: "blue", textDecorationLine: "underline" },
                    ]}
                  >
                    {item.data}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.cardText}>{item.data}</Text>
              )}
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.cardText}>
                Scanned at: {item.timestamp.toDate().toLocaleString()}
              </Text>
            </View>
          </View>
        )}
      />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white", // or any color you prefer
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10, // rounded corners
    // Shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: { height: 3, width: 3 },
    // Elevation for Android
    elevation: 5,
  },
  cardContent: {
    // Style for the content above 'Scanned at'
    // Add styles as needed
  },
  cardFooter: {
    marginTop: "auto", // Pushes the footer to the bottom
    paddingTop: 10, // Spacing between content and footer
    // Add additional styling as needed
  },
  cardText: {
    color: "black", // or any color you prefer
    fontSize: 16,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    width: "80%",
  },
});
