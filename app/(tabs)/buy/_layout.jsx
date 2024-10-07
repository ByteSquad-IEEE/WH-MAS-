import { Stack } from "expo-router";

export default function BuyLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{
            title: "Buy",
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            title: "Waste Details",
            presentation: "card",
          }}
        />
      </Stack>
    </>
  );
}
