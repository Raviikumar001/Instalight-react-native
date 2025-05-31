import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@/cache";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

console.log(process.env.EXPO_PUBLIC_CONVEX_URL);
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const publishablekey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishablekey) {
  throw new Error(
    "Missing Publishable key, Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in you env. ",
  );
}

export default function ClerkAndConvexProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishablekey}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <ClerkLoaded>{children}</ClerkLoaded>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
