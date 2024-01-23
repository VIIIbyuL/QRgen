import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Linking, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out");
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out: ", error);
      });
  };

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleOpenLink = () => {
    // Check if the scanned text is a valid URL
    if (text.match(/https?:\/\/.+/)) {
      Linking.openURL(text).catch((err) =>
        Alert.alert("Invalid URL", "The scanned text is not a valid URL."),
      );
    } else {
      Alert.alert("Not a URL", "The scanned text is not a URL.");
    }
  };

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
    Alert.alert(
      "Scanned Content",
      `Type: ${type}\nData: ${data}`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false },
    );

    // Store in Firestore
    if (auth.currentUser) {
      addDoc(collection(db, `users/${auth.currentUser.uid}/scannedCodes`), {
        type: type,
        data: data,
        timestamp: new Date(),
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inlineView}>
        <Text style={styles.maintext}>Email: {auth.currentUser?.email}</Text>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>

      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>

      <Button title={"Scan"} onPress={() => setScanned(false)} color="tomato" />

      <Button
        title={"Open"}
        onPress={() => {
          Linking.openURL(text)
            .then(() => {
              console.log("URL opened successfully");
            })
            .catch((err) => {
              console.error("Error occurred while opening the URL:", err);
              Alert.alert("Error", "Unable to open the link.");
            });
        }}
        color="blue"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F7", // Light gray background
    alignItems: "center",
    justifyContent: "center",
    padding: 20, // Padding around the screen
    height: "100%",
    width: "100%",
  },
  maintext: {
    fontSize: 18,
    margin: 20,
    color: "#333", // Darker text color for better readability
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 10, // Rounded corners
    backgroundColor: "#FFF", // White background
    marginBottom: 20,
  },
  inlineView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF", // iOS blue color
    padding: 15,
    borderRadius: 10, // Rounded corners
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#FFF", // White text
    fontSize: 16,
    fontWeight: "bold",
  },
});
