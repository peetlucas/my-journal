import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Header Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: "#f1f1f1",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Header;
