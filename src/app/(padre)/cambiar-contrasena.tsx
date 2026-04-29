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
import Svg, { Path, Rect } from "react-native-svg";
import { colors, fonts, radii, spacing } from "../../styles/global";

export default function CambiarContrasena() {
  const router = useRouter();
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [verActual, setVerActual] = useState(false);
  const [verNueva, setVerNueva] = useState(false);
  const [verConfirmar, setVerConfirmar] = useState(false);
  const [guardado, setGuardado] = useState(false);

  const noCoinciden = confirmar.length > 0 && nueva !== confirmar;
  const puedeGuardar =
    actual.length > 0 && nueva.length >= 6 && nueva === confirmar;

  const handleGuardar = () => {
    if (!puedeGuardar) return;
    setGuardado(true);
    setTimeout(() => {
      setGuardado(false);
      router.back();
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Svg
            width={25}
            height={25}
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.texto}
            strokeWidth="2.5"
          >
            <Path d="M19 12H5" />
            <Path d="M12 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.titulo}>Cambiar contraseña</Text>
        <TouchableOpacity
          style={[
            styles.guardarBtn,
            !puedeGuardar && styles.guardarBtnOff,
            guardado && styles.guardarBtnOk
          ]}
          onPress={handleGuardar}
          activeOpacity={puedeGuardar ? 0.7 : 1}
        >
          <Text
            style={[
              styles.guardarTxt,
              !puedeGuardar && styles.guardarTxtOff,
              guardado && styles.guardarTxtOk
            ]}
          >
            {guardado ? "Listo ✓" : "Guardar"}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.iconoSec}>
          <View style={styles.iconoCircle}>
            <Svg
              width={52}
              height={52}
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.texto}
              strokeWidth="2"
            >
              <Rect x="3" y="11" width="18" height="11" rx="2" />
              <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </Svg>
          </View>
          <Text style={styles.iconoTitulo}>Actualiza tu contraseña</Text>
          <Text style={styles.iconoSub}>
            Usa al menos 6 caracteres con letras y números.
          </Text>
        </View>

        <View style={styles.form}>
          <CampoPassword
            label="Contraseña actual"
            value={actual}
            onChangeText={setActual}
            visible={verActual}
            onToggle={() => setVerActual((v) => !v)}
          />
          <CampoPassword
            label="Nueva contraseña"
            value={nueva}
            onChangeText={setNueva}
            visible={verNueva}
            onToggle={() => setVerNueva((v) => !v)}
          />
          <CampoPassword
            label="Confirmar nueva contraseña"
            value={confirmar}
            onChangeText={setConfirmar}
            visible={verConfirmar}
            onToggle={() => setVerConfirmar((v) => !v)}
            isLast
            error={noCoinciden}
          />
        </View>

        {noCoinciden && (
          <Text style={styles.errorTxt}>Las contraseñas no coinciden.</Text>
        )}

        {nueva.length > 0 && nueva.length < 6 && (
          <Text style={styles.errorTxt}>
            La contraseña debe tener al menos 6 caracteres.
          </Text>
        )}

        <Text style={styles.nota}>
          Por seguridad, cerraremos tu sesión en otros dispositivos al cambiar
          la contraseña.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
interface CampoPasswordProps {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  visible: boolean;
  onToggle: () => void;
  isLast?: boolean;
  error?: boolean;
}

function CampoPassword({
  label,
  value,
  onChangeText,
  visible,
  onToggle,
  isLast,
  error
}: CampoPasswordProps) {
  return (
    <View
      style={[
        styles.campo,
        isLast && styles.campoLast,
        error && styles.campoError
      ]}
    >
      <Text style={[styles.campoLabel, error && styles.campoLabelError]}>
        {label}
      </Text>
      <View style={styles.campoRow}>
        <TextInput
          style={styles.campoInput}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          placeholderTextColor="#C0C0C0"
          placeholder="••••••••"
        />
        <TouchableOpacity
          onPress={onToggle}
          style={styles.ojito}
          activeOpacity={0.6}
        >
          <Svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke={visible ? colors.texto : "#C0C0C0"}
            strokeWidth="2"
          >
            {visible ? (
              <>
                <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <Path d="M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
              </>
            ) : (
              <>
                <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <Path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <Path d="M1 1l22 22" />
              </>
            )}
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.fondo },
  header: {
    backgroundColor: colors.card,
    paddingTop: 65,
    paddingBottom: 14,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center"
  },
  titulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 22,
    color: colors.texto,
    flex: 1
  },
  guardarBtn: {
    backgroundColor: colors.primarioAmarillo,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: radii.pill,
    shadowColor: colors.secundarioAmarillo,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3
  },
  guardarBtnOff: {
    backgroundColor: "#F0F0F0",
    shadowColor: "transparent",
    elevation: 0
  },
  guardarBtnOk: {
    backgroundColor: colors.verde,
    shadowColor: "#3A7A18"
  },
  guardarTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 14,
    color: "#5A4800"
  },
  guardarTxtOff: { color: "#C0C0C0" },
  guardarTxtOk: { color: "#fff" },
  scroll: { flex: 1 },
  scrollContent: {
    padding: spacing.md,
    gap: 16,
    paddingBottom: 40
  },
  iconoSec: { alignItems: "center", paddingVertical: 8, gap: 8 },
  iconoCircle: {
    width: 100,
    height: 100,
    borderRadius: 999,
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center"
  },
  iconoTitulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 22,
    color: colors.texto
  },
  iconoSub: {
    fontFamily: fonts.fontSemibold,
    fontSize: 15,
    color: "#AAA",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 16
  },
  form: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    overflow: "hidden"
  },
  campo: {
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
    gap: 5
  },
  campoLast: { borderBottomWidth: 0 },
  campoError: { backgroundColor: "#FFF5F5" },
  campoLabel: {
    fontFamily: fonts.fontExtra,
    fontSize: 12,
    color: "#AAA",
    letterSpacing: 0.8,
    textTransform: "uppercase"
  },
  campoLabelError: { color: colors.rojo },
  campoRow: { flexDirection: "row", alignItems: "center" },
  campoInput: {
    fontFamily: fonts.fontBold,
    fontSize: 18,
    color: colors.texto,
    flex: 1,
    paddingVertical: 2
  },
  ojito: { padding: 4 },
  errorTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 14,
    color: colors.rojo,
    paddingHorizontal: 4
  },
  nota: {
    fontFamily: fonts.fontSemibold,
    fontSize: 12,
    color: "#C0C0C0",
    textAlign: "center",
    lineHeight: 17,
    paddingHorizontal: 8
  }
});
