import { AppRegistry } from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import "./global.css";
import SplashScreen from "./src/screens/SplashScreen";
import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const { theme } = useTheme();

  if (showSplash) {
    return (
      <>
        <StatusBar style="dark" />
        <SplashScreen onFinish={() => setShowSplash(false)} />
      </>
    );
  }

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <AppNavigator />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

AppRegistry.registerComponent("main", () => App);
export default App;
