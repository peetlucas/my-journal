import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Footer Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    backgroundColor: "#f1f1f1",
  },
  text: {
    textAlign: "center",
  },
});

export default Footer;
