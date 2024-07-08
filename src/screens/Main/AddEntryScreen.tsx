import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { RootStackParamList } from "../../types/navigation";

type AddEntryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddEntry"
>;

const AddEntryScreen = () => {
  const navigation = useNavigation<AddEntryScreenNavigationProp>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to current date

  const handleAddEntry = async () => {
    const token = await SecureStore.getItemAsync("token");
    try {
      await axios.post(
        "http://localhost:5000/entries",
        { title, content, category, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigation.navigate("JournalEntries");
    } catch (error) {
      console.error("Add entry error:", error);
      // Handle error display or recovery
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Add Entry" onPress={handleAddEntry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default AddEntryScreen;
