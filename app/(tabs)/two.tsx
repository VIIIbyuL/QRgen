import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { addDoc, collection } from "firebase/firestore"; // Import addDoc and collection functions
import { auth, db } from "../../firebase";
import { Text, View } from "../../components/Themed";

export default function TabTwoScreen() {
  const [input, setInput] = useState("");
  const [value, setValue] = useState("");

  const handleDB = async () => {
    if (auth.currentUser) {
      try {
        const docRef = await addDoc(
          collection(db, `users/${auth.currentUser.uid}/generatedQR`),
          {
            value: input,
            timestamp: new Date(),
          },
        );
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

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
              <Text style={styles.placeholderText} darkColor="rgba(0,0,0,0.9)">
                No QR code to display
              </Text>
            </View>
          )}
          <TextInput
            placeholderTextColor="grey"
            placeholder="Enter text to generate QR code"
            style={styles.textinput}
            onChangeText={setInput}
            value={input}
          />
          <Button
            title="Generate"
            color="tomato"
            onPress={() => {
              setValue(input);

              handleDB();

              setInput("");
            }}
          />
          <Button
            title="Clear"
            color="blue"
            onPress={() => {
              setValue("");
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  placeholderContainer: {
    height: 300,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 10,
  },
  placeholderText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  textinput: {
    height: 50,
    borderColor: "#007AFF",
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    padding: 15,
    marginVertical: 20,
    color: "#333",
    backgroundColor: "#FFF",
    fontSize: 16,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F7",
    padding: 20,
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#007AFF",
  },
});
