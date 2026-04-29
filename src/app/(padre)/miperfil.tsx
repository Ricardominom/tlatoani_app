import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Svg, { Circle, Line, Path, Polyline, Rect } from "react-native-svg";
import TabBar from "../../components/ui/TlatoaniTabIcons";
import { colors, fonts, radii, spacing } from "../../styles/global";

const PADRE = {
  inicial: "R",
  nombre: "Familia Mino",
  correo: "rdmm.291191@gmail.com",
  telefono: "222 345 6789",
  escuela: "Tlatoani Montessori",
  ciclo: "Ciclo 2025–2026"
};

const NOTIFICACIONES = [
  {
    id: "avisos",
    label: "Avisos importantes",
    sub: "Comunicados del maestro",
    bg: "#FFFBE6",
    iconColor: "#B89600"
  },
  {
    id: "comida",
    label: "Comida compartida",
    sub: "Recordatorios de turno",
    bg: "#FFFBE6",
    iconColor: "#B89600"
  },
  {
    id: "colegiatura",
    label: "Colegiatura",
    sub: "Alertas de pago",
    bg: "#FFF0F0",
    iconColor: "#C62828"
  },
  {
    id: "calendario",
    label: "Eventos y calendario",
    sub: "Suspensiones y juntas",
    bg: "#F5F5F5",
    iconColor: "#888"
  },
  {
    id: "galeria",
    label: "Galería",
    sub: "Fotos y videos nuevos",
    bg: "#F5F5F5",
    iconColor: "#888"
  }
];

function NotifIcon({ id, color }: { id: string; color: string }) {
  switch (id) {
    case "avisos":
      return (
        <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
        >
          <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </Svg>
      );
    case "comida":
      return (
        <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
        >
          <Path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <Path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        </Svg>
      );
    case "colegiatura":
      return (
        <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
        >
          <Rect x="1" y="4" width="22" height="16" rx="2" />
          <Line x1="1" y1="10" x2="23" y2="10" />
        </Svg>
      );
    case "calendario":
      return (
        <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
        >
          <Rect x="3" y="3" width="18" height="18" rx="2" />
          <Line x1="3" y1="9" x2="21" y2="9" />
          <Line x1="9" y1="21" x2="9" y2="9" />
        </Svg>
      );
    case "galeria":
      return (
        <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
        >
          <Rect x="3" y="3" width="18" height="18" rx="2" />
          <Circle cx="8.5" cy="8.5" r="1.5" />
          <Polyline points="21 15 16 10 5 21" />
        </Svg>
      );
    default:
      return null;
  }
}

export default function MiPerfil() {
  const router = useRouter();

  const [notifStates, setNotifStates] = useState<Record<string, boolean>>({
    avisos: true,
    comida: true,
    colegiatura: true,
    calendario: true,
    galeria: false
  });

  const toggleNotif = (id: string) => {
    setNotifStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Mi perfil</Text>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editTxt}>Editar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.perfilHero}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarLetra}>{PADRE.inicial}</Text>
            </View>
            <View style={styles.avatarEdit}>
              <Svg
                width={16}
                height={16}
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
          <Text style={styles.perfilNombre}>{PADRE.nombre}</Text>
          <Text style={styles.perfilCorreo}>{PADRE.correo}</Text>
          <View style={styles.perfilTelRow}>
            <Svg
              width={11}
              height={11}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#AAA"
              strokeWidth="2"
            >
              <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </Svg>
            <Text style={styles.perfilTel}>{PADRE.telefono}</Text>
          </View>
          <View style={styles.perfilBadges}>
            <View style={styles.badgeEscuela}>
              <Svg
                width={10}
                height={10}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3A7A18"
                strokeWidth="2"
              >
                <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </Svg>
              <Text style={styles.badgeEscuelaTxt}>{PADRE.escuela}</Text>
            </View>
            <View style={styles.badgeCiclo}>
              <Text style={styles.badgeCicloTxt}>{PADRE.ciclo}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sep}>Notificaciones</Text>
        <View style={styles.card}>
          {NOTIFICACIONES.map((notif, index) => (
            <View
              key={notif.id}
              style={[
                styles.notifRow,
                index === NOTIFICACIONES.length - 1 && styles.notifRowLast
              ]}
            >
              <View style={styles.notifLeft}>
                <View
                  style={[styles.notifIcono, { backgroundColor: notif.bg }]}
                >
                  <NotifIcon id={notif.id} color={notif.iconColor} />
                </View>
                <View>
                  <Text style={styles.notifLbl}>{notif.label}</Text>
                  <Text style={styles.notifSub}>{notif.sub}</Text>
                </View>
              </View>
              <Switch
                value={notifStates[notif.id]}
                onValueChange={() => toggleNotif(notif.id)}
                trackColor={{ false: "#E0E0E0", true: colors.primarioAmarillo }}
                thumbColor="#fff"
                ios_backgroundColor="#E0E0E0"
              />
            </View>
          ))}
        </View>

        <Text style={styles.sep}>Cuenta</Text>
        <View style={styles.cuentaCard}>
          <TouchableOpacity
            style={styles.cuentaItem}
            onPress={() => router.push("/(padre)/editar-perfil" as any)}
          >
            <View style={[styles.cuentaIcono, { backgroundColor: "#F5F5F5" }]}>
              <Svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#555"
                strokeWidth="2.2"
              >
                <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <Circle cx="12" cy="7" r="4" />
              </Svg>
            </View>
            <Text style={styles.cuentaLbl}>Editar datos personales</Text>
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D0D0D0"
              strokeWidth="2.5"
            >
              <Polyline points="9 18 15 12 9 6" />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cuentaItem}
            onPress={() => router.push("/(padre)/cambiar-contrasena" as any)}
          >
            <View style={[styles.cuentaIcono, { backgroundColor: "#F5F5F5" }]}>
              <Svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#555"
                strokeWidth="2.2"
              >
                <Rect x="3" y="11" width="18" height="11" rx="2" />
                <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </Svg>
            </View>
            <Text style={styles.cuentaLbl}>Cambiar contraseña</Text>
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D0D0D0"
              strokeWidth="2.5"
            >
              <Polyline points="9 18 15 12 9 6" />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cuentaItem}
            onPress={() => router.push("/(padre)/soporte" as any)}
          >
            <View style={[styles.cuentaIcono, { backgroundColor: "#F5F5F5" }]}>
              <Svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#555"
                strokeWidth="2.2"
              >
                <Circle cx="12" cy="12" r="3" />
                <Path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
              </Svg>
            </View>
            <Text style={styles.cuentaLbl}>Soporte y ayuda</Text>
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D0D0D0"
              strokeWidth="2.5"
            >
              <Polyline points="9 18 15 12 9 6" />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cuentaItem, styles.cuentaItemLast]}>
            <View style={[styles.cuentaIcono, { backgroundColor: "#FFF0F0" }]}>
              <Svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.rojo}
                strokeWidth="2.2"
              >
                <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <Polyline points="16 17 21 12 16 7" />
                <Line x1="21" y1="12" x2="9" y2="12" />
              </Svg>
            </View>
            <Text style={[styles.cuentaLbl, { color: colors.rojo }]}>
              Cerrar sesión
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>Tlatoani App · v1.0.0</Text>
      </ScrollView>

      <TabBar />
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
    justifyContent: "space-between"
  },
  titulo: { fontFamily: fonts.fontBlack, fontSize: 20, color: colors.texto },
  editBtn: {
    backgroundColor: colors.halconesLight,
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: radii.pill
  },
  editTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 14,
    color: colors.halcones
  },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing.md, gap: 8, paddingBottom: 30 },

  perfilHero: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 18,
    alignItems: "center",
    gap: 6
  },
  avatarWrap: { position: "relative", marginBottom: 4 },
  avatarCircle: {
    width: 92,
    height: 92,
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
  avatarLetra: { fontFamily: fonts.fontBlack, fontSize: 38, color: "#7A6200" },
  avatarEdit: {
    width: 32,
    height: 32,
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
  perfilNombre: {
    fontFamily: fonts.fontBlack,
    fontSize: 28,
    color: colors.texto,
    textAlign: "center"
  },
  perfilCorreo: {
    fontFamily: fonts.fontSemibold,
    fontSize: 14,
    color: "#AAA",
    textAlign: "center"
  },
  perfilTelRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  perfilTel: { fontFamily: fonts.fontBold, fontSize: 14, color: "#888" },
  perfilBadges: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 4
  },
  badgeEscuela: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F0FAF0",
    paddingVertical: 4,
    paddingHorizontal: 11,
    borderRadius: radii.pill
  },
  badgeEscuelaTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 10,
    color: "#3A7A18"
  },
  badgeCiclo: {
    backgroundColor: colors.halconesLight,
    paddingVertical: 4,
    paddingHorizontal: 11,
    borderRadius: radii.pill
  },
  badgeCicloTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 10,
    color: colors.halconesS
  },

  sep: {
    fontFamily: fonts.fontExtra,
    fontSize: 11,
    color: "#C0C0C0",
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingHorizontal: 2,
    marginTop: 4
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    overflow: "hidden"
  },

  notifRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F5F5F5"
  },
  notifRowLast: { borderBottomWidth: 0 },
  notifLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  notifIcono: {
    width: 54,
    height: 54,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  notifLbl: { fontFamily: fonts.fontExtra, fontSize: 16, color: colors.texto },
  notifSub: {
    fontFamily: fonts.fontSemibold,
    fontSize: 12,
    color: "#AAA",
    marginTop: 1
  },

  cuentaCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    overflow: "hidden"
  },
  cuentaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 13,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F5F5F5"
  },
  cuentaItemLast: { borderBottomWidth: 0 },
  cuentaIcono: {
    width: 52,
    height: 52,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  cuentaLbl: {
    fontFamily: fonts.fontExtra,
    fontSize: 16,
    color: colors.texto,
    flex: 1
  },

  version: {
    fontFamily: fonts.fontSemibold,
    fontSize: 10,
    color: "#C0C0C0",
    textAlign: "center",
    paddingVertical: 8
  }
});
