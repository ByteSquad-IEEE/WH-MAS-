import { Ionicons } from "@expo/vector-icons";
// import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
// import { Text } from "react-native";

const TabIcon = ({ icon, name, focused, color }) => {
  return (
    <View className="items-center justify-center gap-2 bg-[BBD1D8]">
      <Ionicons name={icon} size={30} color={color} />
      <Text
        className={`${
          focused ? "font-semibold text-primary" : "font-regular"
        } text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#1DB954",
          tabBarInactiveTintColor: "#BBD1D8",
          tabBarStyle: {
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Home",
            headerShown: false,
            // Fixed typo from "tanBarIcon" to "tabBarIcon"
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon="home"
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="buy"
          options={{
            title: "Buy",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="cart" color={color} name="Buy" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="sell"
          options={{
            title: "Sell",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon="swap-horizontal"
                color={color}
                name="Sell"
                focused={focused}
              />
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="wallet"
          options={{
            title: "Wallet",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon="wallet"
                color={color}
                name="Cash"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon="person"
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
