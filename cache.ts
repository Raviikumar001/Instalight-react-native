import { TokenCache } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItem(key);
        if (item) {
          console.log("key was used ");
        } else {
          console.log("No values stored under key:" + key);
        }
        return item;
      } catch (error) {
        console.error("secure store get item error:", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },

    saveToken: (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token);
    },
  };
};

export const tokenCache =
  Platform.OS !== "web" ? createTokenCache() : undefined;
