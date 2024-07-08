import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import JournalEntriesScreen from "../screens/Main/JournalEntriesScreen";
import AddEntryScreen from "../screens/Main/AddEntryScreen";
import EditEntryScreen from "../screens/Main/EditEntryScreen";
import SummaryScreen from "../screens/Main/SummaryScreen";
import SettingsScreen from "../screens/Main/SettingsScreen";

const Stack = createStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator initialRouteName="JournalEntries">
    <Stack.Screen name="JournalEntries" component={JournalEntriesScreen} />
    <Stack.Screen name="AddEntry" component={AddEntryScreen} />
    <Stack.Screen name="EditEntry" component={EditEntryScreen} />
    <Stack.Screen name="Summary" component={SummaryScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

export default MainNavigator;
