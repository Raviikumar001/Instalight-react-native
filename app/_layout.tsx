import { Stack } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/cache";

const publishablekey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishablekey) {
  throw new Error(
    "Missing Publishable key, Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in you env. ",
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishablekey}>
      <ClerkLoaded>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            <Stack screenOptions={{ headerShown: false }}>
              {/* <Stack.Screen name="index" options={{ title: "Feed" }}></Stack.Screen>
          <Stack.Screen
            name="notifications"
            options={{ title: "Notifications", headerShown: false }}
          /> */}
            </Stack>
          </SafeAreaView>
        </SafeAreaProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
