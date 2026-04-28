import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
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
import Svg, { Line, Path, Polyline } from "react-native-svg";
import { colors, fonts } from "../../../styles/global";

type AvatarColor = "turq" | "verde" | "rosa" | "amarillo";

const AVATAR_COLORS: Record<
  AvatarColor,
  { bg: string; text: string; border: string; shadow: string }
> = {
  turq: {
    bg: "#E8F8FC",
    text: "#007A8F",
    border: "#00AECC",
    shadow: "#007A8F"
  },
  verde: {
    bg: "#F0FAF0",
    text: "#3A7A18",
    border: "#7BC441",
    shadow: "#4A7A1E"
  },
  rosa: {
    bg: "#FDF0F8",
    text: "#A01D59",
    border: "#E5297E",
    shadow: "#A01D59"
  },
  amarillo: {
    bg: "#FFFBE6",
    text: "#7A6200",
    border: "#F5C800",
    shadow: "#B89600"
  }
};

interface ConvInfo {
  nombre: string;
  subtitulo: string;
  avatarLetra: string;
  avatarColor: AvatarColor;
  online: boolean;
  contexto?: string;
}

type MensajeTipo = "maestra" | "padre" | "fecha";

interface Mensaje {
  id: string;
  tipo: MensajeTipo;
  texto?: string;
  hora?: string;
}

const CONV_INFO: Record<string, ConvInfo> = {
  sandra: {
    nombre: "Mtra. Sandra García",
    subtitulo: "Abejas · Casa de niños",
    avatarLetra: "S",
    avatarColor: "turq",
    online: true,
    contexto: "Sobre Sofía Ramírez · Abejas"
  },
  rebeca: {
    nombre: "Mtra. Rebeca Ortiz",
    subtitulo: "Halcones · Taller 1",
    avatarLetra: "R",
    avatarColor: "verde",
    online: false,
    contexto: "Sobre Diego Ramírez · Halcones"
  },
  admin: {
    nombre: "Dirección Tlatoani",
    subtitulo: "Administración escolar",
    avatarLetra: "D",
    avatarColor: "rosa",
    online: false
  },
  "sandra-excursion": {
    nombre: "Mtra. Sandra García",
    subtitulo: "Sofía · Excursión botánica",
    avatarLetra: "S",
    avatarColor: "turq",
    online: true,
    contexto: "Sobre Sofía Ramírez · Excursión"
  },
  "admin-festival": {
    nombre: "Dirección Tlatoani",
    subtitulo: "Festival de otoño",
    avatarLetra: "T",
    avatarColor: "amarillo",
    online: false
  }
};

const MENSAJES_POR_CONV: Record<string, Mensaje[]> = {
  sandra: [
    { id: "f1", tipo: "fecha", texto: "Lunes 20 de octubre" },
    {
      id: "m1",
      tipo: "maestra",
      texto:
        "Hola, buenos días familia Ramírez. Quería comentarles que Sofía ha estado un poco distraída esta semana durante las actividades de lenguaje. No es nada grave, pero me gustaría platicar con ustedes.",
      hora: "9:15am"
    },
    { id: "f2", tipo: "fecha", texto: "Hoy" },
    {
      id: "m2",
      tipo: "padre",
      texto:
        "Buenos días maestra Sandra. Gracias por avisarnos. ¿Podríamos hablar esta semana? ¿Qué horario le queda mejor?",
      hora: "8:42am"
    },
    {
      id: "m3",
      tipo: "maestra",
      texto:
        "¡Claro! Podemos vernos el miércoles después de clase, de 1:15 a 1:45pm. O si prefieren, podemos hacer una videollamada. 😊",
      hora: "9:03am"
    },
    {
      id: "m4",
      tipo: "padre",
      texto:
        "Perfecto, el miércoles en persona está muy bien. Ahí estaremos. ¡Gracias maestra!",
      hora: "9:10am"
    }
  ],
  rebeca: [
    { id: "f1", tipo: "fecha", texto: "Ayer" },
    {
      id: "m1",
      tipo: "maestra",
      texto:
        "Buenos días. Solo quería confirmar que Diego llegó bien y está muy contento hoy.",
      hora: "9:00am"
    },
    {
      id: "m2",
      tipo: "padre",
      texto: "¡Qué bueno saberlo, gracias maestra Rebeca!",
      hora: "9:05am"
    },
    {
      id: "m3",
      tipo: "maestra",
      texto: "Gracias por confirmar, hasta el lunes.",
      hora: "9:10am"
    }
  ],
  admin: [
    { id: "f1", tipo: "fecha", texto: "Hoy" },
    {
      id: "m1",
      tipo: "maestra",
      texto:
        "Estimada familia, le recordamos que su colegiatura de mayo vence en 3 días. Por favor realice su pago a tiempo para evitar recargos.",
      hora: "8:45am"
    },
    {
      id: "m2",
      tipo: "maestra",
      texto:
        "Puede realizar su pago en ventanilla, por transferencia o a través de la app. ¿Tiene alguna duda?",
      hora: "8:46am"
    }
  ],
  "sandra-excursion": [
    { id: "f1", tipo: "fecha", texto: "Lun 21" },
    {
      id: "m1",
      tipo: "maestra",
      texto:
        "Recordatorio: mañana es la excursión al jardín botánico. Por favor no olvide la autorización firmada y el lunch.",
      hora: "2:30pm"
    },
    {
      id: "m2",
      tipo: "padre",
      texto: "Entendido maestra, mañana la llevamos lista. ¡Gracias!",
      hora: "3:00pm"
    },
    {
      id: "m3",
      tipo: "maestra",
      texto: "Recuerda la autorización firmada para mañana.",
      hora: "3:05pm"
    }
  ],
  "admin-festival": [
    { id: "f1", tipo: "fecha", texto: "Vie 18" },
    {
      id: "m1",
      tipo: "maestra",
      texto:
        "Estimada familia, fue un placer tenerlos en el Festival de Otoño. Esperamos que hayan disfrutado la presentación de sus hijos.",
      hora: "4:00pm"
    },
    {
      id: "m2",
      tipo: "padre",
      texto: "¡Muchas gracias! Estuvo muy bonito el evento.",
      hora: "4:30pm"
    },
    {
      id: "m3",
      tipo: "maestra",
      texto: "¡Gracias por su participación en el festival!",
      hora: "4:35pm"
    }
  ]
};

function FechaChip({ texto }: { texto: string }) {
  return (
    <View style={styles.fechaChipWrap}>
      <View style={styles.fechaChip}>
        <Text style={styles.fechaChipTxt}>{texto}</Text>
      </View>
    </View>
  );
}

function ContextoBurbuja({ texto }: { texto: string }) {
  return (
    <View style={styles.contextoBurbuja}>
      <Text style={styles.contextoLbl}>Conversación privada</Text>
      <Text style={styles.contextoTxt}>{texto}</Text>
    </View>
  );
}

function NotaFormal() {
  return (
    <View style={styles.notaFormal}>
      <Svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#3A7A18"
        strokeWidth="2"
      >
        <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </Svg>
      <Text style={styles.notaFormalTxt}>
        Este canal es formal y queda registrado. Los mensajes son visibles solo
        entre tú y la maestra.
      </Text>
    </View>
  );
}

function BurbujaMaestra({
  msg,
  avatarLetra,
  col
}: {
  msg: Mensaje;
  avatarLetra: string;
  col: (typeof AVATAR_COLORS)[AvatarColor];
}) {
  return (
    <View style={styles.burbujaRowMaestra}>
      <View
        style={[
          styles.burbujaAv,
          { backgroundColor: col.bg, borderColor: col.border }
        ]}
      >
        <Text style={[styles.burbujaAvTxt, { color: col.text }]}>
          {avatarLetra}
        </Text>
      </View>
      <View style={styles.burbujaContenidoMaestra}>
        <Text style={styles.burbujaTxt}>{msg.texto}</Text>
        <Text style={styles.burbujaHoraMaestra}>{msg.hora} ✓✓</Text>
      </View>
    </View>
  );
}

function BurbujaPadre({ msg }: { msg: Mensaje }) {
  return (
    <View style={styles.burbujaRowPadre}>
      <View style={styles.burbujaContenidoPadre}>
        <Text style={styles.burbujaTxtPadre}>{msg.texto}</Text>
        <View style={styles.burbujaHoraPadreRow}>
          <Text style={styles.burbujaHoraPadre}>{msg.hora}</Text>
          <Svg
            width={12}
            height={12}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9A7800"
            strokeWidth="2.5"
          >
            <Polyline points="20 6 9 17 4 12" />
          </Svg>
        </View>
      </View>
    </View>
  );
}

function EscribiendoIndicator({
  avatarLetra,
  col
}: {
  avatarLetra: string;
  col: (typeof AVATAR_COLORS)[AvatarColor];
}) {
  return (
    <View style={styles.burbujaRowMaestra}>
      <View
        style={[
          styles.burbujaAv,
          { backgroundColor: col.bg, borderColor: col.border }
        ]}
      >
        <Text style={[styles.burbujaAvTxt, { color: col.text }]}>
          {avatarLetra}
        </Text>
      </View>
      <View style={styles.escribiendoBurbuja}>
        <View style={styles.dotAnim} />
        <View style={[styles.dotAnim, { opacity: 0.6 }]} />
        <View style={[styles.dotAnim, { opacity: 0.3 }]} />
      </View>
    </View>
  );
}

export default function Chat() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const convId = id ?? "sandra";

  const conv = CONV_INFO[convId] ?? CONV_INFO["sandra"];
  const mensajes = MENSAJES_POR_CONV[convId] ?? [];
  const col = AVATAR_COLORS[conv.avatarColor];

  const [texto, setTexto] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Svg
            width={40}
            height={40}
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.texto}
            strokeWidth="2.5"
          >
            <Polyline points="15 18 9 12 15 6" />
          </Svg>
        </TouchableOpacity>

        <View
          style={[
            styles.headerAvatar,
            {
              backgroundColor: col.bg,
              borderColor: col.border,
              shadowColor: col.shadow
            }
          ]}
        >
          <Text style={[styles.headerAvatarTxt, { color: col.text }]}>
            {conv.avatarLetra}
          </Text>
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.headerNombre}>{conv.nombre}</Text>
          <View style={styles.headerSubRow}>
            {conv.online && <View style={styles.onlineDot} />}
            <Text style={styles.headerSub}>{conv.subtitulo}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.chatBody}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({ animated: false })
        }
      >
        {conv.contexto && <ContextoBurbuja texto={conv.contexto} />}
        <NotaFormal />

        {mensajes.map((msg) => {
          if (msg.tipo === "fecha")
            return <FechaChip key={msg.id} texto={msg.texto!} />;
          if (msg.tipo === "maestra")
            return (
              <BurbujaMaestra
                key={msg.id}
                msg={msg}
                avatarLetra={conv.avatarLetra}
                col={col}
              />
            );
          if (msg.tipo === "padre")
            return <BurbujaPadre key={msg.id} msg={msg} />;
          return null;
        })}

        {conv.online && (
          <EscribiendoIndicator avatarLetra={conv.avatarLetra} col={col} />
        )}
      </ScrollView>

      <View style={styles.inputArea}>
        <TouchableOpacity style={styles.attachBtn} activeOpacity={0.8}>
          <Svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#888"
            strokeWidth="2.2"
          >
            <Path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </Svg>
        </TouchableOpacity>

        <TextInput
          style={styles.inputField}
          placeholder="Escribe un mensaje…"
          placeholderTextColor="#C0C0C0"
          value={texto}
          onChangeText={setTexto}
          multiline
        />

        <TouchableOpacity
          style={[styles.sendBtn, !texto.trim() && styles.sendBtnDisabled]}
          activeOpacity={0.8}
        >
          <Svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke={texto.trim() ? "#5A4800" : "#C0C0C0"}
            strokeWidth="2.5"
          >
            <Line x1="22" y1="2" x2="11" y2="13" />
            <Path d="M22 2L15 22L11 13L2 9Z" />
          </Svg>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F2F2F2" },

  header: {
    backgroundColor: "#fff",
    paddingTop: 65,
    paddingBottom: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  headerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
    flexShrink: 0
  },
  headerAvatarTxt: { fontFamily: fonts.fontBlack, fontSize: 20 },
  headerInfo: { flex: 1 },
  headerNombre: {
    fontFamily: fonts.fontBlack,
    fontSize: 20,
    color: colors.texto
  },
  headerSubRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 1
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#7BC441"
  },
  headerSub: { fontFamily: fonts.fontBold, fontSize: 12, color: "#AAA" },

  chatBody: { flex: 1 },
  chatContent: { padding: 12, paddingBottom: 16, gap: 8 },

  fechaChipWrap: { alignItems: "center", marginVertical: 4 },
  fechaChip: {
    backgroundColor: "#E8E8E8",
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 20
  },
  fechaChipTxt: { fontFamily: fonts.fontExtra, fontSize: 11, color: "#C0C0C0" },

  contextoBurbuja: {
    backgroundColor: "#FFFBE6",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#F5C800",
    borderStyle: "dashed",
    padding: 10,
    alignSelf: "center",
    maxWidth: "90%"
  },
  contextoLbl: {
    fontFamily: fonts.fontExtra,
    fontSize: 11,
    color: "#B89600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 3
  },
  contextoTxt: {
    fontFamily: fonts.fontBold,
    fontSize: 13,
    color: "#7A6200",
    lineHeight: 16
  },

  notaFormal: {
    backgroundColor: "#F0FAF0",
    borderRadius: 10,
    padding: 8,
    paddingHorizontal: 10,
    alignSelf: "center",
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6
  },
  notaFormalTxt: {
    fontFamily: fonts.fontBold,
    fontSize: 11,
    color: "#3A7A18",
    lineHeight: 14,
    flex: 1
  },

  burbujaRowMaestra: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
    alignSelf: "flex-start",
    maxWidth: "85%"
  },
  burbujaAv: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  burbujaAvTxt: { fontFamily: fonts.fontBlack, fontSize: 12 },
  burbujaContenidoMaestra: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    padding: 10,
    paddingHorizontal: 12,
    borderWidth: 0.5,
    borderColor: "#EBEBEB"
  },
  burbujaTxt: {
    fontFamily: fonts.fontSemibold,
    fontSize: 16,
    color: "#333",
    lineHeight: 18
  },
  burbujaHoraMaestra: {
    fontFamily: fonts.fontSemibold,
    fontSize: 11,
    color: "#C0C0C0",
    marginTop: 4,
    textAlign: "right"
  },

  burbujaRowPadre: { alignSelf: "flex-end", maxWidth: "90%" },
  burbujaContenidoPadre: {
    backgroundColor: colors.primarioAmarillo,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    padding: 10,
    paddingHorizontal: 12,
    shadowColor: colors.secundarioAmarillo,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3
  },
  burbujaTxtPadre: {
    fontFamily: fonts.fontBold,
    fontSize: 16,
    color: "#5A4800",
    lineHeight: 18
  },
  burbujaHoraPadreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 3,
    marginTop: 4
  },
  burbujaHoraPadre: {
    fontFamily: fonts.fontSemibold,
    fontSize: 11,
    color: "#9A7800"
  },

  escribiendoBurbuja: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    padding: 10,
    paddingHorizontal: 14,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    flexDirection: "row",
    gap: 4,
    alignItems: "center"
  },
  dotAnim: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C0C0C0"
  },

  inputArea: {
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#EBEBEB",
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  attachBtn: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  inputField: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 14,
    fontFamily: fonts.fontBold,
    fontSize: 12,
    color: colors.texto,
    maxHeight: 100
  },
  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: 18,
    backgroundColor: colors.primarioAmarillo,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.secundarioAmarillo,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
    flexShrink: 0
  },
  sendBtnDisabled: {
    backgroundColor: "#F0F0F0",
    shadowColor: "transparent",
    elevation: 0
  }
});
