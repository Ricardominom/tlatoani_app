import { AnimalIcon, getGrupo } from "@/src/components/ui/AnimalKit";
import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";
import TabBar from "../../components/ui/TlatoaniTabIcons";
import { colors, fonts } from "../../styles/global";

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

interface Conversacion {
  id: string;
  nombre: string;
  subtitulo: string;
  preview: string;
  hora: string;
  noLeidos: number;
  online: boolean;
  tipo: "maestra" | "admin";
  hijoSalon?: string;
  avatarLetra: string;
  avatarColor: AvatarColor;
}

const CONVERSACIONES: Conversacion[] = [
  {
    id: "sandra",
    nombre: "Mtra. Sandra García",
    subtitulo: "Sofía · Abejas",
    preview: "¡Claro! Podemos vernos el miércoles…",
    hora: "9:03am",
    noLeidos: 1,
    online: true,
    tipo: "maestra",
    hijoSalon: "abejas",
    avatarLetra: "S",
    avatarColor: "turq"
  },
  {
    id: "admin",
    nombre: "Dirección Tlatoani",
    subtitulo: "Administración escolar",
    preview: "Su colegiatura de mayo vence en 3 días…",
    hora: "8:45am",
    noLeidos: 2,
    online: false,
    tipo: "admin",
    avatarLetra: "D",
    avatarColor: "rosa"
  },
  {
    id: "rebeca",
    nombre: "Mtra. Rebeca Ortiz",
    subtitulo: "Diego · Halcones",
    preview: "Gracias por confirmar, hasta el lunes.",
    hora: "Ayer",
    noLeidos: 0,
    online: false,
    tipo: "maestra",
    hijoSalon: "halcones",
    avatarLetra: "R",
    avatarColor: "verde"
  },
  {
    id: "sandra-excursion",
    nombre: "Mtra. Sandra García",
    subtitulo: "Sofía · Abejas · Excursión",
    preview: "Recuerda la autorización firmada para mañana.",
    hora: "Lun 21",
    noLeidos: 0,
    online: true,
    tipo: "maestra",
    hijoSalon: "abejas",
    avatarLetra: "S",
    avatarColor: "turq"
  },
  {
    id: "admin-festival",
    nombre: "Dirección Tlatoani",
    subtitulo: "Festival de otoño",
    preview: "¡Gracias por su participación en el festival!",
    hora: "Vie 18",
    noLeidos: 0,
    online: false,
    tipo: "admin",
    avatarLetra: "T",
    avatarColor: "amarillo"
  }
];

function ConvCard({
  conv,
  onPress
}: {
  conv: Conversacion;
  onPress: () => void;
}) {
  const col = AVATAR_COLORS[conv.avatarColor];
  const unread = conv.noLeidos > 0;

  return (
    <TouchableOpacity
      style={[styles.convCard, unread && styles.convCardUnread]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {unread && <View style={styles.unreadAccent} />}

      <View
        style={[
          styles.convAvatar,
          {
            backgroundColor: col.bg,
            borderColor: col.border,
            shadowColor: col.shadow
          }
        ]}
      >
        <Text style={[styles.convAvatarTxt, { color: col.text }]}>
          {conv.avatarLetra}
        </Text>

        {conv.online && <View style={styles.onlineDot} />}

        <View
          style={[
            styles.hijoBadge,
            {
              backgroundColor: conv.hijoSalon
                ? (getGrupo(conv.hijoSalon)?.color ?? "#ccc")
                : "#2D2D2D"
            }
          ]}
        >
          {conv.hijoSalon ? (
            <AnimalIcon salon={conv.hijoSalon} size={8} />
          ) : (
            <Svg
              width={8}
              height={8}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F5C800"
              strokeWidth="2.5"
            >
              <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </Svg>
          )}
        </View>
      </View>

      <View style={styles.convDatos}>
        <Text style={styles.convNombre}>{conv.nombre}</Text>
        <Text style={styles.convSub}>{conv.subtitulo}</Text>
        <Text
          style={[styles.convPreview, unread && styles.convPreviewUnread]}
          numberOfLines={1}
        >
          {conv.preview}
        </Text>
      </View>

      <View style={styles.convMeta}>
        <Text style={[styles.convHora, unread && styles.convHoraUnread]}>
          {conv.hora}
        </Text>
        {unread && (
          <View style={styles.unreadDot}>
            <Text style={styles.unreadDotTxt}>{conv.noLeidos}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function ListaConversaciones() {
  const router = useRouter();

  const sinLeer = CONVERSACIONES.filter((c) => c.noLeidos > 0);
  const recientes = CONVERSACIONES.filter((c) => c.noLeidos === 0);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitulo}>Mensajes</Text>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
            <Svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.texto}
              strokeWidth="2.2"
            >
              <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <Line x1="12" y1="8" x2="12" y2="12" />
              <Line x1="12" y1="12" x2="16" y2="12" />
            </Svg>
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrap}>
          <Svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C0C0C0"
            strokeWidth="2.2"
          >
            <Circle cx="11" cy="11" r="8" />
            <Line x1="21" y1="21" x2="16.65" y2="16.65" />
          </Svg>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar conversación…"
            placeholderTextColor="#C0C0C0"
            editable={false}
          />
        </View>
      </View>

      <ScrollView
        style={styles.feed}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {sinLeer.length > 0 && (
          <>
            <Text style={styles.sep}>Sin leer</Text>
            {sinLeer.map((conv) => (
              <ConvCard
                key={conv.id}
                conv={conv}
                onPress={() => router.push(`/(padre)/chat/${conv.id}` as any)}
              />
            ))}
          </>
        )}

        {recientes.length > 0 && (
          <>
            <Text style={styles.sep}>Recientes</Text>
            {recientes.map((conv) => (
              <ConvCard
                key={conv.id}
                conv={conv}
                onPress={() => router.push(`/(padre)/chat/${conv.id}` as any)}
              />
            ))}
          </>
        )}
      </ScrollView>

      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F2F2F2" },

  header: {
    backgroundColor: "#fff",
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
    gap: 12
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerTitulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 15,
    color: colors.texto
  },
  iconBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center"
  },

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderWidth: 1.5,
    borderColor: "#EBEBEB"
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.fontBold,
    fontSize: 12,
    color: colors.texto,
    padding: 0
  },

  feed: { flex: 1 },
  feedContent: {
    padding: 12,
    paddingBottom: 24,
    gap: 6
  },
  sep: {
    fontFamily: fonts.fontExtra,
    fontSize: 9,
    color: "#C0C0C0",
    letterSpacing: 0.7,
    textTransform: "uppercase",
    paddingVertical: 2,
    paddingHorizontal: 2
  },

  convCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 12,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    overflow: "hidden"
  },
  convCardUnread: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  unreadAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: "#00AECC"
  },

  convAvatar: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
    flexShrink: 0
  },
  convAvatarTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 17
  },
  onlineDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#7BC441",
    borderWidth: 2,
    borderColor: "#fff"
  },
  hijoBadge: {
    position: "absolute",
    bottom: -3,
    right: -3,
    width: 16,
    height: 16,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  convDatos: {
    flex: 1,
    minWidth: 0
  },
  convNombre: {
    fontFamily: fonts.fontBlack,
    fontSize: 13,
    color: colors.texto
  },
  convSub: {
    fontFamily: fonts.fontBold,
    fontSize: 10,
    color: "#AAA",
    marginTop: 1
  },
  convPreview: {
    fontFamily: fonts.fontSemibold,
    fontSize: 11,
    color: "#888",
    marginTop: 4
  },
  convPreviewUnread: {
    fontFamily: fonts.fontExtra,
    color: colors.texto
  },

  convMeta: {
    alignItems: "flex-end",
    gap: 5,
    flexShrink: 0
  },
  convHora: {
    fontFamily: fonts.fontBold,
    fontSize: 9,
    color: "#C0C0C0"
  },
  convHoraUnread: {
    color: "#00AECC"
  },
  unreadDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#00AECC",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#007A8F",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  unreadDotTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 9,
    color: "#fff"
  }
});
