import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import AppNavigator from "./navigators/AppNavigator";
import store from "./store/store";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
