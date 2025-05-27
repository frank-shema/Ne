import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "#757575",
        tabBarStyle: {
          height: 80,
          paddingTop: 10,
          backgroundColor: "#000000",
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="cars"
        options={{
          title: "Cars",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="road-variant"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="leaf" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
