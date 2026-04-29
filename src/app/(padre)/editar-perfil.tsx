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
import Svg, { Path } from "react-native-svg";
import { colors, fonts, radii, spacing } from "../../styles/global";

const PADRE_INICIAL = {
  nombre: "Familia Mino",
  correo: "rdmm.291191@gmail.com",
  telefono: "222 345 6789"
};

export default function EditarPerfil() {
  const router = useRouter();
  const [nombre, setNombre] = useState(PADRE_INICIAL.nombre);
  const [correo, setCorreo] = useState(PADRE_INICIAL.correo);
  const [telefono, setTelefono] = useState(PADRE_INICIAL.telefono);
  const [guardado, setGuardado] = useState(false);

  const handleGuardar = () => {
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
        <Text style={styles.titulo}>Editar datos</Text>
        <TouchableOpacity
          style={[styles.guardarBtn, guardado && styles.guardarBtnOk]}
          onPress={handleGuardar}
        >
          <Text style={[styles.guardarTxt, guardado && styles.guardarTxtOk]}>
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
        <View style={styles.avatarSec}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarLetra}>
                {nombre.trim().charAt(0).toUpperCase() || "?"}
              </Text>
            </View>
            <View style={styles.avatarEdit}>
              <Svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
              >
                <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </Svg>
            </View>
          </View>
          <Text style={styles.avatarHint}>Toca para cambiar foto</Text>
        </View>

        <View style={styles.form}>
          <CampoTexto
            label="Nombre de la familia"
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ej. Familia Ramírez"
            autoCapitalize="words"
          />
          <CampoTexto
            label="Correo electrónico"
            value={correo}
            onChangeText={setCorreo}
            placeholder="correo@ejemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <CampoTexto
            label="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
            placeholder="222 000 0000"
            keyboardType="phone-pad"
            isLast
          />
        </View>

        <Text style={styles.nota}>
          Los cambios serán revisados por la administración del colegio antes de
          actualizarse.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
interface CampoProps {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "words" | "sentences";
  isLast?: boolean;
}

function CampoTexto({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  autoCapitalize = "sentences",
  isLast
}: CampoProps) {
  return (
    <View style={[styles.campo, isLast && styles.campoLast]}>
      <Text style={styles.campoLabel}>{label}</Text>
      <TextInput
        style={styles.campoInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#C0C0C0"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        returnKeyType="done"
      />
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
  guardarBtnOk: {
    backgroundColor: colors.verde,
    shadowColor: "#3A7A18"
  },
  guardarTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 16,
    color: "#5A4800"
  },
  guardarTxtOk: { color: "#fff" },
  scroll: { flex: 1 },
  scrollContent: {
    padding: spacing.md,
    gap: 16,
    paddingBottom: 40
  },
  avatarSec: { alignItems: "center", paddingVertical: 8 },
  avatarWrap: { position: "relative", marginBottom: 8 },
  avatarCircle: {
    width: 112,
    height: 112,
    borderRadius: 999,
    backgroundColor: colors.lightAmarillo,
    borderWidth: 3,
    borderColor: colors.primarioAmarillo,
    shadowColor: colors.secundarioAmarillo,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  avatarLetra: {
    fontFamily: fonts.fontBlack,
    fontSize: 48,
    color: "#7A6200"
  },
  avatarEdit: {
    width: 35,
    height: 35,
    borderRadius: 999,
    backgroundColor: "#2D2D2D",
    borderWidth: 2,
    borderColor: colors.card,
    position: "absolute",
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  avatarHint: {
    fontFamily: fonts.fontSemibold,
    fontSize: 14,
    color: "#AAA"
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
  campoLabel: {
    fontFamily: fonts.fontExtra,
    fontSize: 12,
    color: "#AAA",
    letterSpacing: 0.8,
    textTransform: "uppercase"
  },
  campoInput: {
    fontFamily: fonts.fontBold,
    fontSize: 18,
    color: colors.texto,
    paddingVertical: 2
  },
  nota: {
    fontFamily: fonts.fontSemibold,
    fontSize: 13,
    color: "#C0C0C0",
    textAlign: "center",
    lineHeight: 17,
    paddingHorizontal: 8
  }
});
