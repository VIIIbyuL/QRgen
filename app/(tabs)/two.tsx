import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";

export default function TabTwoScreen() {
  const [input, setInput] = useState<string>("");
  const [value, setValue] = useState<string>("");

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Generator</Text>
          {value ? (
            <QRCode
              value={value}
              size={300}
              color="white"
              backgroundColor="black"
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText} darkColor="black">
                No QR code to display
              </Text>
            </View>
          )}
          <TextInput
            placeholder="Enter text to generate QR code"
            style={styles.textinput}
            onChangeText={(text) => {
              setInput(text);
            }}
          ></TextInput>

          <Button
            title="Generate"
            color={"tomato"}
            onPress={() => {
              setValue(input);
            }}
          ></Button>
          <Button
            title="Clear"
            color="blue"
            onPress={() => {
              setValue("");
            }}
          ></Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  placeholderContainer: {
    height: 300, // Same height as QR code
    width: 300, // Same width as QR code
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
    backgroundColor: "black", // Same background color as QR code
    borderRadius: 10, // If your QR code container has rounded corners
  },
  placeholderText: {
    color: "white", // Text color
    fontSize: 16, // Adjust as needed
    textAlign: "center", // Center text
    paddingHorizontal: 20, // Add some padding if needed
  },
  textinput: {
    height: 50,
    borderColor: "#007AFF", // iOS blue color
    borderWidth: 2,
    borderRadius: 10, // Rounded corners
    width: 300, // Responsive width
    padding: 15,
    marginVertical: 20,
    color: "#333", // Darker text color for better readability
    backgroundColor: "#FFF", // White background
    fontSize: 16, // Slightly larger font size
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F7", // Light gray background
    padding: 20, // Padding around the screen
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#007AFF", // iOS blue color
  },

  button: {
    alignItems: "center",
    backgroundColor: "#007AFF", // iOS blue color
    padding: 15,
    borderRadius: 10, // Rounded corners
    width: "80%", // Responsive width
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF", // White text
    fontSize: 16,
    fontWeight: "bold",
  },

  qrCodeContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: "#FFF", // White background for QR code
    borderRadius: 10, // Rounded corners
  },
});
