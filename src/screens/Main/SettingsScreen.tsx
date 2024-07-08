// SettingsScreen.tsx

import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    navigation.navigate("Login" as never);
  };

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button title="Logout" onPress={handleLogout} />
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

export default SettingsScreen;
