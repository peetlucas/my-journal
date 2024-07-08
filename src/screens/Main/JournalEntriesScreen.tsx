// JournalEntriesScreen.tsx

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { RootStackParamList } from "../../types/navigation"; // Adjust path as per your project structure

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  category: string;
  date: Date;
}

const JournalEntriesScreen = () => {
  const navigation = useNavigation();
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const token = await SecureStore.getItemAsync("token");
      try {
        const response = await axios.get<JournalEntry[]>(
          "http://localhost:5000/journal",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEntries(response.data);
      } catch (error) {
        console.error("Fetch entries error:", error);
        // Handle error display or recovery
      }
    };
    fetchEntries();
  }, []);

  const renderItem = ({ item }: { item: JournalEntry }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.content}</Text>
      <Text>{item.category}</Text>
      <Text>{new Date(item.date).toDateString()}</Text>
      <Button
        title="Edit"
        onPress={() => navigation.navigate("EditEntry", { id: item.id })}
      />
      <Button title="Delete" onPress={() => handleDelete(item.id)} />
    </View>
  );

  const handleDelete = async (id: number) => {
    const token = await SecureStore.getItemAsync("token");
    try {
      await axios.delete(`http://localhost:5000/journal/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Delete entry error:", error);
      // Handle error display or recovery
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="Add Entry"
        onPress={() => navigation.navigate("AddEntry")}
      />
      <Button title="Summary" onPress={() => navigation.navigate("Summary")} />
      <Button
        title="Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default JournalEntriesScreen;
