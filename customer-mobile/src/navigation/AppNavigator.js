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
import FilterScreen from "../screens/FilterScreen";
import ResortDetailScreen from "../screens/ResortDetailScreen";
import AIChatScreen from "../screens/AIChatScreen";
import ResortResultScreen from "../screens/ResortResultScreen";
import PricingScreen from "../screens/PricingScreen";
import GalleryScreen from "../screens/GalleryScreen";
import AmenitiesScreen from "../screens/AmenitiesScreen";
import ReviewsScreen from "../screens/ReviewsScreen";
import BookingFormScreen from "../screens/BookingFormScreen";
import BookingPaymentScreen from "../screens/BookingPaymentScreen";
import BookingConfirmScreen from "../screens/BookingConfirmScreen";
import BookingDetailsScreen from "../screens/BookingDetailsScreen";
import RateReviewScreen from "../screens/RateReviewScreen";
import ReceiptScreen from "../screens/ReceiptScreen";
import { colors } from "../constants/theme";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabConfig = {
  Home: { label: "Home", icon: "home", iconOutline: "home-outline" },
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
        <Stack.Screen name="Search" component={ExploreScreen} options={popTransition} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={popTransition} />
        <Stack.Screen name="ResortDetail" component={ResortDetailScreen} options={popTransition} />
        <Stack.Screen name="AIChat" component={AIChatScreen} options={popTransition} />
        <Stack.Screen name="ResortResult" component={ResortResultScreen} options={popTransition} />
        <Stack.Screen name="Pricing" component={PricingScreen} options={popTransition} />
        <Stack.Screen name="Gallery" component={GalleryScreen} options={popTransition} />
        <Stack.Screen name="Amenities" component={AmenitiesScreen} options={popTransition} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} options={popTransition} />
        <Stack.Screen name="BookingForm" component={BookingFormScreen} options={popTransition} />
        <Stack.Screen name="BookingPayment" component={BookingPaymentScreen} options={popTransition} />
        <Stack.Screen name="BookingConfirm" component={BookingConfirmScreen} options={popTransition} />
        <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} options={popTransition} />
        <Stack.Screen name="RateReview" component={RateReviewScreen} options={popTransition} />
        <Stack.Screen name="Receipt" component={ReceiptScreen} options={popTransition} />
        <Stack.Screen
          name="Filter"
          component={FilterScreen}
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
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
