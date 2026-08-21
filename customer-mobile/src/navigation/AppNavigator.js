import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import VerifyOtpScreen from "../screens/VerifyOtpScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import BookingsScreen from "../screens/BookingsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import { colors } from "../constants/theme";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabConfig = {
  Home: { label: "Home", icon: "home", iconOutline: "home-outline" },
  Search: { label: "Search", icon: "search", iconOutline: "search-outline" },
  Bookings: { label: "Bookings", icon: "calendar", iconOutline: "calendar-outline" },
  Profile: { label: "Profile", icon: "person", iconOutline: "person-outline" },
};

function TabBarItem({ routeName, focused }) {
  const cfg = tabConfig[routeName];
  return (
    <View style={[styles.tabItem, focused && styles.tabItemActive]}>
      <Ionicons
        name={focused ? cfg.icon : cfg.iconOutline}
        size={20}
        color={focused ? colors.deep : colors.textMuted}
      />
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
        {cfg.label}
      </Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabBarItem routeName={route.name} focused={focused} />
        ),
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: "#EEEFF1",
          height: 78,
          paddingTop: 8,
          paddingBottom: 10,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={ExploreScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const smoothTransition = {
  animation: "fade_from_bottom",
  animationDuration: 900,
};

const popTransition = {
  animation: "fade",
  animationDuration: 800,
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, ...smoothTransition }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} options={popTransition} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={popTransition} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} options={popTransition} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={popTransition} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={popTransition} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 68,
    height: 42,
    borderRadius: 24,
    gap: 2,
  },
  tabItemActive: {
    backgroundColor: colors.secondary,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textMuted,
  },
  tabLabelActive: {
    color: colors.deep,
    fontWeight: "700",
  },
});
