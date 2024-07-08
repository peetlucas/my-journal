import React from "react";
import { View, Text, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  return (
    <View>
      <Text>Login Screen</Text>
      <Button
        title="Go to Journal Entries"
        onPress={() => navigation.navigate("JournalEntries")}
      />
    </View>
  );
};

export default LoginScreen;
