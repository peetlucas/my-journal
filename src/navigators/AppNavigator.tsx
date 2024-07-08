import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import LoginScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import JournalEntriesScreen from "../screens/Main/JournalEntriesScreen";
import AddEntryScreen from "../screens/Main/AddEntryScreen";
import EditEntryScreen from "../screens/Main/EditEntryScreen";
import SummaryScreen from "../screens/Main/SummaryScreen";
import SettingsScreen from "../screens/Main/SettingsScreen";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="JournalEntries" component={JournalEntriesScreen} />
        <Stack.Screen name="AddEntry" component={AddEntryScreen} />
        <Stack.Screen
          name="EditEntry"
          component={EditEntryScreen}
          initialParams={{ entryId: -1 }}
        />
        <Stack.Screen name="Summary" component={SummaryScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
