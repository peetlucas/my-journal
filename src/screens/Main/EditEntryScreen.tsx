import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";

type EditEntryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EditEntry"
>;

type EditEntryScreenRouteProp = {
  entryId: number;
};

const EditEntryScreen = () => {
  const navigation = useNavigation<EditEntryScreenNavigationProp>();
  const route = useRoute();
  const { entryId } = route.params as EditEntryScreenRouteProp; // Type assertion

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchEntry = async () => {
      const token = await SecureStore.getItemAsync("token");
      try {
        const response = await axios.get(
          `http://localhost:5000/journal/${entryId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { title, content, category, date } = response.data;
        setTitle(title);
        setContent(content);
        setCategory(category);
        setDate(date);
      } catch (error) {
        console.error("Fetch entry error:", error);
        // Handle error display or recovery
      }
    };
    fetchEntry();
  }, [entryId]);

  const handleUpdateEntry = async () => {
    const token = await SecureStore.getItemAsync("token");
    try {
      await axios.put(
        `http://localhost:5000/journal/${entryId}`,
        { title, content, category, date },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigation.navigate("JournalEntries");
    } catch (error) {
      console.error("Update entry error:", error);
      // Handle error display or recovery
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Entry</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Content"
      />
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Category"
      />
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Date (YYYY-MM-DD)"
      />
      <Button title="Update" onPress={handleUpdateEntry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default EditEntryScreen;
