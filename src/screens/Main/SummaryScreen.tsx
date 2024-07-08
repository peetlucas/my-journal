import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

type Summary = {
  totalEntries: number;
  averageLength: number;
};

const SummaryScreen = () => {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const token = await SecureStore.getItemAsync("token");
      try {
        const response = await axios.get("http://localhost:5000/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(response.data);
      } catch (error) {
        console.error("Fetch summary error:", error);
        // Handle error display or recovery
      }
    };
    fetchSummary();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Summary</Text>
      {summary ? (
        <>
          <Text>Total Entries: {summary.totalEntries}</Text>
          <Text>Average Length: {summary.averageLength}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SummaryScreen;
