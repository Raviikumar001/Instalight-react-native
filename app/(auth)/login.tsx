import { View, Text, Image, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
export default function Login() {
  return (
    <View style={styles.container}>
      {/* Brand Section */}

      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>Instalight</Text>
        <Text style={styles.tagline}>Don&apos;t miss anything</Text>
      </View>

      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/images/wishes.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      {/* Login Section */}

      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => console.log("continu with google")}
          activeOpacity={0.9}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color={COLORS.surface} />
          </View>

          <Text style={styles.googleButtonText}>Continue with google</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  );
}
