import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Svg, {
  Circle,
  Ellipse,
  Line,
  Path,
  Polyline,
  Rect
} from "react-native-svg";
import TabBar from "../../components/ui/TlatoaniTabIcons";
import {
  colors,
  fonts,
  grupoColors,
  radii,
  spacing
} from "../../styles/global";

const HIJOS = [
  {
    id: "victoria",
    nombre: "Victoria",
    salon: "abejas",
    turno: {
      platillo: "Pasta boloñesa",
      fecha: "Jue 17 de octubre",
      diasRestantes: 12,
      ninos: 22
    }
  },
  {
    id: "diego",
    nombre: "Diego",
    salon: "halcones",
    turno: {
      platillo: "Arroz con pollo",
      fecha: "Mar 22 de octubre",
      diasRestantes: 17,
      ninos: 20
    }
  }
];

const PROXIMOS_TURNOS = [
  {
    quien: "Victoria Miño",
    platillo: "Pasta boloñesa",
    fecha: "Jue 17 oct",
    esPropio: true
  },
  {
    quien: "Mateo López",
    platillo: "Arroz con pollo",
    fecha: "Vie 18 oct",
    esPropio: false
  },
  {
    quien: "Valeria Torres",
    platillo: "Sopa de verduras",
    fecha: "Lun 21 oct",
    esPropio: false
  },
  {
    quien: "Emilio Vega",
    platillo: "Quesadillas",
    fecha: "Mar 22 oct",
    esPropio: false
  }
];

function AnimalIconSm({ salon, activo }: { salon: string; activo: boolean }) {
  const color = activo ? "#5A4800" : "#AAA";
  switch (salon) {
    case "abejas":
      return (
        <Svg width={12} height={12} viewBox="0 0 48 48" fill="none">
          <Ellipse cx="24" cy="34" rx="9" ry="12" fill={color} opacity="0.5" />
          <Rect
            x="15"
            y="29"
            width="18"
            height="3"
            rx="1"
            fill={color}
            opacity="0.6"
          />
          <Circle cx="24" cy="13" r="7" fill={color} opacity="0.5" />
          <Ellipse
            cx="11"
            cy="19"
            rx="7"
            ry="3.5"
            fill={color}
            opacity="0.35"
          />
          <Ellipse
            cx="37"
            cy="19"
            rx="7"
            ry="3.5"
            fill={color}
            opacity="0.35"
          />
        </Svg>
      );
    case "halcones":
      return (
        <Svg width={12} height={12} viewBox="0 0 48 48" fill="none">
          <Path
            d="M8 22 Q18 10 38 8 Q30 16 24 20Z"
            fill={color}
            opacity="0.5"
          />
          <Ellipse cx="24" cy="30" rx="7" ry="9" fill={color} opacity="0.4" />
          <Circle cx="8" cy="23" r="4" fill={color} opacity="0.4" />
        </Svg>
      );
    default:
      return null;
  }
}

export default function Comida() {
  const router = useRouter();
  const [hijoActivo, setHijoActivo] = useState(HIJOS[0].id);
  const hijo = HIJOS.find((h) => h.id === hijoActivo)!;
  const colores = grupoColors[hijo.salon as keyof typeof grupoColors];

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitulo}>Comida compartida</Text>
        </View>

        <View style={styles.hijosTabs}>
          {HIJOS.map((h) => {
            const activo = hijoActivo === h.id;
            const col = grupoColors[h.salon as keyof typeof grupoColors];
            return (
              <TouchableOpacity
                key={h.id}
                style={[
                  styles.hijoTab,
                  activo
                    ? {
                        backgroundColor: col.base,
                        shadowColor: col.dark,
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 1,
                        shadowRadius: 0,
                        elevation: 3
                      }
                    : styles.hijoTabOff
                ]}
                onPress={() => setHijoActivo(h.id)}
                activeOpacity={0.8}
              >
                <AnimalIconSm salon={h.salon} activo={activo} />
                <Text
                  style={[
                    styles.hijoTabTxt,
                    { color: activo ? col.textColor : "#AAA" }
                  ]}
                >
                  {h.nombre}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.turnoHero,
            {
              borderColor: colores.base,
              shadowColor: colores.dark
            }
          ]}
        >
          <View style={styles.turnoTop}>
            <View
              style={[
                styles.turnoBadge,
                {
                  backgroundColor: colores.light,
                  borderColor: colores.base
                }
              ]}
            >
              <AnimalIconSm salon={hijo.salon} activo={true} />
              <Text style={[styles.turnoBadgeTxt, { color: colores.dark }]}>
                Le toca a {hijo.nombre}
              </Text>
            </View>
            <View style={styles.turnoCountdown}>
              <Text style={[styles.turnoNum, { color: colores.base }]}>
                {hijo.turno.diasRestantes}
              </Text>
              <Text style={styles.turnoLbl}>días</Text>
            </View>
          </View>

          <View style={styles.turnoPlato}>
            <View
              style={[styles.turnoIcono, { backgroundColor: colores.light }]}
            >
              <Svg width={34} height={34} viewBox="0 0 64 64" fill="none">
                <Circle
                  cx="32"
                  cy="38"
                  r="18"
                  fill="#FFF3CC"
                  stroke={colores.base}
                  strokeWidth="2"
                />
                <Ellipse
                  cx="32"
                  cy="38"
                  rx="12"
                  ry="4"
                  fill={colores.base}
                  opacity="0.4"
                />
                <Path
                  d="M24 28 Q32 20 40 28"
                  stroke={colores.base}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <Rect
                  x="30"
                  y="14"
                  width="4"
                  height="10"
                  rx="2"
                  fill={colores.base}
                />
              </Svg>
            </View>
            <View style={styles.turnoInfo}>
              <Text style={styles.turnoPlatillo}>{hijo.turno.platillo}</Text>
              <Text style={[styles.turnoFecha, { color: colores.base }]}>
                {hijo.turno.fecha}
              </Text>
              <Text style={styles.turnoNinos}>
                Para {hijo.turno.ninos} niños del salón
              </Text>
            </View>
          </View>

          <View style={styles.turnoBtns}>
            <TouchableOpacity
              style={[
                styles.btnAgenda,
                {
                  backgroundColor: colores.base,
                  shadowColor: colores.dark
                }
              ]}
              activeOpacity={0.85}
            >
              <Svg
                width={12}
                height={12}
                viewBox="0 0 24 24"
                fill="none"
                stroke={colores.textColor}
                strokeWidth="2.2"
              >
                <Rect x="3" y="4" width="18" height="18" rx="2" />
                <Line x1="16" y1="2" x2="16" y2="6" />
                <Line x1="8" y1="2" x2="8" y2="6" />
                <Line x1="3" y1="10" x2="21" y2="10" />
              </Svg>
              <Text style={[styles.btnAgendaTxt, { color: colores.textColor }]}>
                Mi agenda
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnReceta}
              activeOpacity={0.85}
              onPress={() => router.push("/(padre)/receta" as any)}
            >
              <Svg
                width={12}
                height={12}
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.texto}
                strokeWidth="2.2"
              >
                <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <Polyline points="14 2 14 8 20 8" />
                <Line x1="9" y1="13" x2="15" y2="13" />
                <Line x1="9" y1="17" x2="15" y2="17" />
              </Svg>
              <Text style={styles.btnRecetaTxt}>Ver receta</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.accesosRow}>
          <TouchableOpacity style={styles.accesoCard} activeOpacity={0.7}>
            <View
              style={[
                styles.accesoIcono,
                { backgroundColor: colors.halconesLight }
              ]}
            >
              <Svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.halcones}
                strokeWidth="2.2"
              >
                <Rect x="3" y="4" width="18" height="18" rx="2" />
                <Line x1="16" y1="2" x2="16" y2="6" />
                <Line x1="8" y1="2" x2="8" y2="6" />
                <Line x1="3" y1="10" x2="21" y2="10" />
              </Svg>
            </View>
            <Text style={styles.accesoLbl}>Calendario</Text>
            <Text style={styles.accesoSub}>Ver mes completo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.accesoCard} activeOpacity={0.7}>
            <View
              style={[
                styles.accesoIcono,
                { backgroundColor: colors.verdeLight }
              ]}
            >
              <Svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.verde}
                strokeWidth="2.2"
              >
                <Path d="M9 11l3 3L22 4" />
                <Path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </Svg>
            </View>
            <Text style={styles.accesoLbl}>Menú completo</Text>
            <Text style={styles.accesoSub}>Todos los turnos</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sep}>Próximos turnos del salón</Text>
        <View style={styles.proximosCard}>
          {PROXIMOS_TURNOS.map((turno, index, arr) => (
            <View
              key={turno.quien}
              style={[
                styles.proximoItem,
                index === arr.length - 1 && styles.proximoItemLast
              ]}
            >
              <View style={styles.proximoLeft}>
                <Text style={styles.proximoQuien}>{turno.quien}</Text>
                <Text style={styles.proximoPlatillo}>{turno.platillo}</Text>
              </View>
              <View
                style={[
                  styles.proximoFechaBadge,
                  turno.esPropio && styles.proximoFechaBadgePropio
                ]}
              >
                <Text
                  style={[
                    styles.proximoFechaTxt,
                    turno.esPropio && styles.proximoFechaTxtPropio
                  ]}
                >
                  {turno.fecha}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.fondo
  },
  header: {
    backgroundColor: colors.card,
    paddingTop: 56,
    paddingBottom: 14,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
    gap: 12
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerTitulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 18,
    color: colors.texto
  },
  hijosTabs: {
    flexDirection: "row",
    gap: 8
  },
  hijoTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: radii.pill
  },
  hijoTabOff: {
    backgroundColor: "#F0F0F0"
  },
  hijoTabTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 10
  },

  scroll: { flex: 1 },
  scrollContent: {
    padding: spacing.md,
    gap: 8,
    paddingBottom: 30
  },

  turnoHero: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 2.5,
    padding: 16,
    gap: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4
  },
  turnoTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  turnoBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1.5,
    borderRadius: radii.pill,
    paddingVertical: 4,
    paddingHorizontal: 11
  },
  turnoBadgeTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 10
  },
  turnoCountdown: {
    alignItems: "flex-end"
  },
  turnoNum: {
    fontFamily: fonts.fontBlack,
    fontSize: 22,
    lineHeight: 24
  },
  turnoLbl: {
    fontFamily: fonts.fontBold,
    fontSize: 9,
    color: "#C0C0C0"
  },
  turnoPlato: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14
  },
  turnoIcono: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  turnoInfo: { flex: 1 },
  turnoPlatillo: {
    fontFamily: fonts.fontBlack,
    fontSize: 16,
    color: colors.texto,
    lineHeight: 20,
    marginBottom: 3
  },
  turnoFecha: {
    fontFamily: fonts.fontExtra,
    fontSize: 11
  },
  turnoNinos: {
    fontFamily: fonts.fontSemibold,
    fontSize: 10,
    color: "#888",
    marginTop: 2
  },
  turnoBtns: {
    flexDirection: "row",
    gap: 8
  },
  btnAgenda: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 11,
    borderRadius: 13,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3
  },
  btnAgendaTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 12
  },
  btnReceta: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 11,
    borderRadius: 13,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.texto,
    shadowColor: "#888",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3
  },
  btnRecetaTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 12,
    color: colors.texto
  },

  accesosRow: {
    flexDirection: "row",
    gap: 8
  },
  accesoCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 14,
    alignItems: "center",
    gap: 6
  },
  accesoIcono: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  accesoLbl: {
    fontFamily: fonts.fontExtra,
    fontSize: 10,
    color: colors.texto,
    textAlign: "center"
  },
  accesoSub: {
    fontFamily: fonts.fontSemibold,
    fontSize: 9,
    color: "#AAA",
    textAlign: "center"
  },

  sep: {
    fontFamily: fonts.fontExtra,
    fontSize: 9,
    color: "#C0C0C0",
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingHorizontal: 2,
    marginTop: 4
  },

  proximosCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 14
  },
  proximoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F5F5F5"
  },
  proximoItemLast: { borderBottomWidth: 0 },
  proximoLeft: { gap: 2 },
  proximoQuien: {
    fontFamily: fonts.fontExtra,
    fontSize: 12,
    color: colors.texto
  },
  proximoPlatillo: {
    fontFamily: fonts.fontSemibold,
    fontSize: 10,
    color: "#888"
  },
  proximoFechaBadge: {
    backgroundColor: colors.halconesLight,
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: radii.sm
  },
  proximoFechaBadgePropio: {
    backgroundColor: colors.lightAmarillo
  },
  proximoFechaTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 10,
    color: colors.halcones
  },
  proximoFechaTxtPropio: {
    color: colors.secundarioAmarillo
  }
});
