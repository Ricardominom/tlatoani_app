import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import CarruselAnimales from "../../components/ui/CarruselAnimales";
import { useAuth } from "../../context/AuthContext";
import { colors, fonts, radii, spacing } from "../../styles/global";

export default function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Escribe tu correo y contraseña");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      router.replace("/(padre)/home");
    } catch (error: any) {
      const msg = error?.response?.data?.message;
      setError(msg ?? "Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topSection}>
          <Svg width={135} height={135} viewBox="0 0 100 100">
            <Circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke={colors.primarioAmarillo}
              strokeWidth="8"
            />
            <Circle
              cx="50"
              cy="50"
              r="31"
              fill="none"
              stroke={colors.verde}
              strokeWidth="8"
            />
            <Path
              d="M50 32 a18 18 0 1 1 -0.01 0"
              fill="none"
              stroke={colors.lobos}
              strokeWidth="8"
              strokeLinecap="round"
            />
            <Circle cx="50" cy="50" r="8" fill={colors.halcones} />
          </Svg>

          <View style={styles.logoTexts}>
            <Text style={styles.logoColegio}>COLEGIO</Text>
            <Text style={styles.logoTlatoani}>tlatoani</Text>
            <Text style={styles.logoMontessori}>Montessori</Text>
          </View>

          <CarruselAnimales />

          <View style={styles.bottomSection}>
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Correo electrónico</Text>
              <TextInput
                style={[
                  styles.fieldInput,
                  emailFocused && styles.fieldInputActive
                ]}
                placeholder="tu@correo.com"
                placeholderTextColor={colors.texto3}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Contraseña</Text>
              <TextInput
                style={[
                  styles.fieldInput,
                  passwordFocused && styles.fieldInputActive
                ]}
                placeholder="••••••••"
                placeholderTextColor={colors.texto3}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
            </View>

            <TouchableOpacity>
              <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            {error !== "" && <Text style={styles.errorTxt}>{error}</Text>}

            <TouchableOpacity
              style={[styles.btnLogin, loading && styles.btnLoginOff]}
              activeOpacity={0.85}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.btnLoginTxt}>
                {loading ? "Entrando..." : "Entrar"}
              </Text>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerTxt}>o continúa con</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.btnGoogle} activeOpacity={0.85}>
              <Svg width={18} height={18} viewBox="0 0 24 24">
                <Path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <Path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <Path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <Path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </Svg>
              <Text style={styles.btnGoogleTxt}>Continuar con Google</Text>
            </TouchableOpacity>

            <Text style={styles.footerTxt}>
              ¿Primera vez?{""}
              <Text style={styles.footerLink}>Contacta a la escuela</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.card
  },
  scroll: {
    flexGrow: 1,
    width: "100%"
  },
  topSection: {
    backgroundColor: colors.card,
    paddingTop: 64,
    paddingBottom: 28,
    // paddingHorizontal: spacing.xl,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
    gap: 14
  },
  logoTexts: {
    alignItems: "center"
    // marginTop: 4
  },
  logoColegio: {
    fontFamily: fonts.fontBold,
    fontSize: 12,
    color: "#C0C0C0",
    letterSpacing: 1.5
  },
  logoTlatoani: {
    fontFamily: fonts.fontBlack,
    fontSize: 56,
    color: colors.texto,
    letterSpacing: -0.5
  },
  logoMontessori: {
    fontFamily: fonts.fontBold,
    fontSize: 12,
    color: colors.verde,
    letterSpacing: 1.2
    // marginTop: 2
  },
  animalsRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4
  },
  animalChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F5F5F5",
    borderRadius: radii.pill,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: "#EBEBEB"
  },
  animalName: {
    fontFamily: fonts.fontBold,
    fontSize: 9,
    color: "#999"
  },
  bottomSection: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#FAFAFA",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: 36,
    gap: 14
  },
  fieldWrap: {
    gap: 5
  },
  fieldLabel: {
    fontFamily: fonts.fontExtra,
    fontSize: 16,
    color: colors.texto
  },
  fieldInput: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: "#EBEBEB",
    borderRadius: radii.md,
    paddingVertical: 13,
    paddingHorizontal: 14,
    fontFamily: fonts.fontSemibold,
    fontSize: 16,
    color: colors.texto
  },
  fieldInputActive: {
    borderColor: colors.primarioAmarillo,
    backgroundColor: colors.lightAmarillo
  },
  forgot: {
    fontFamily: fonts.fontBold,
    fontSize: 12,
    color: colors.halcones,
    textAlign: "right",
    marginTop: -4
  },
  btnLogin: {
    backgroundColor: colors.primarioAmarillo,
    borderRadius: radii.lg,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: colors.secundarioAmarillo,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    marginTop: 2
  },
  btnLoginTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 18,
    color: "#5A4800"
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  dividerLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: "#E8E8E8"
  },
  dividerTxt: {
    fontFamily: fonts.fontBold,
    fontSize: 12,
    color: "#C0C0C0"
  },
  btnGoogle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: "#EBEBEB",
    borderRadius: radii.lg,
    paddingVertical: 13
  },
  btnGoogleTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 13,
    color: colors.texto
  },
  footerTxt: {
    fontFamily: fonts.fontSemibold,
    fontSize: 11,
    color: "#C0C0C0",
    textAlign: "center",
    marginTop: 4
  },
  footerLink: {
    fontFamily: fonts.fontExtra,
    color: colors.primarioAmarillo
  },
  btnLoginOff: {
    opacity: 0.6
  },
  errorTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 13,
    color: colors.rojo,
    textAlign: "center",
    marginTop: -4
  }
});
