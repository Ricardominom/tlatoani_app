import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Svg, { Circle, Line, Path, Polyline, Rect } from "react-native-svg";
import TabBar from "../../components/ui/TlatoaniTabIcons";
import { colors, fonts, spacing } from "../../styles/global";

type TipoDia =
  | "normal"
  | "hoy"
  | "evento"
  | "junta"
  | "suspension"
  | "festivo"
  | "vacio";

interface Dia {
  num: number;
  tipo: TipoDia;
  label?: string;
  esVacaciones?: boolean;
}

type TipoEvento = "evento" | "junta" | "suspension" | "festivo";

interface Evento {
  dia: number;
  mes: string;
  tipo: TipoEvento;
  titulo: string;
  descripcion: string;
}

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie"];

const COLORES_LETRAS = [
  colors.primarioAmarillo,
  colors.verde,
  colors.lobos,
  colors.halcones
];

const GRID_DIAS: (Dia | null)[][] = [
  [
    null,
    { num: 1, tipo: "normal" },
    { num: 2, tipo: "normal" },
    { num: 3, tipo: "normal" },
    { num: 4, tipo: "normal" }
  ],
  [
    { num: 7, tipo: "normal" },
    { num: 8, tipo: "normal" },
    { num: 9, tipo: "hoy" },
    { num: 10, tipo: "normal" },
    { num: 11, tipo: "normal" }
  ],
  [
    { num: 22, tipo: "junta", label: "C.Infantil" },
    { num: 23, tipo: "junta", label: "Halcones" },
    { num: 24, tipo: "junta", label: "Lobos" },
    null,
    null
  ],
  [
    { num: 27, tipo: "junta", label: "Leones" },
    { num: 28, tipo: "junta", label: "Abejas" },
    { num: 29, tipo: "normal" },
    { num: 30, tipo: "festivo", label: "Día niño" },
    { num: 1, tipo: "suspension", label: "Suspensión" }
  ]
];

const EVENTOS: Evento[] = [
  {
    dia: 13,
    mes: "abr",
    tipo: "evento",
    titulo: "Regreso de vacaciones",
    descripcion: "Último día pago sin recargo · Colegiatura"
  },
  {
    dia: 28,
    mes: "abr",
    tipo: "junta",
    titulo: "Casa de niños — Abejas",
    descripcion: "9:00am · Victoria asiste con papá o mamá"
  },
  {
    dia: 30,
    mes: "abr",
    tipo: "festivo",
    titulo: "Día del niño",
    descripcion: "Actividades especiales · Todos los niveles"
  },
  {
    dia: 1,
    mes: "may",
    tipo: "suspension",
    titulo: "Día del trabajo",
    descripcion: "No hay clases · Reanudan el lunes 4"
  }
];

function getCeldaEstilo(tipo: TipoDia) {
  switch (tipo) {
    case "hoy":
      return {
        bg: "#2D2D2D",
        border: "#2D2D2D",
        borderStyle: "solid" as const,
        shadow: "#000"
      };
    case "evento":
      return {
        bg: colors.lightAmarillo,
        border: colors.primarioAmarillo,
        borderStyle: "solid" as const,
        shadow: colors.secundarioAmarillo
      };
    case "junta":
      return {
        bg: "#EAF8FB",
        border: colors.halcones,
        borderStyle: "solid" as const,
        shadow: colors.halconesS
      };
    case "suspension":
      return {
        bg: "#F5F5F5",
        border: "#C0C0C0",
        borderStyle: "dashed" as const,
        shadow: "transparent"
      };
    case "festivo":
      return {
        bg: "#FEF0F7",
        border: colors.lobos,
        borderStyle: "solid" as const,
        shadow: colors.lobosS
      };
    default:
      return {
        bg: colors.card,
        border: "#F0ECD8",
        borderStyle: "solid" as const,
        shadow: "transparent"
      };
  }
}

function getNumColor(tipo: TipoDia) {
  switch (tipo) {
    case "hoy":
      return colors.primarioAmarillo;
    case "evento":
      return colors.secundarioAmarillo;
    case "junta":
      return colors.halconesS;
    case "suspension":
      return "#888";
    case "festivo":
      return colors.lobosS;
    default:
      return colors.texto;
  }
}

function getLblColor(tipo: TipoDia) {
  switch (tipo) {
    case "junta":
      return colors.halconesS;
    case "suspension":
      return "#888";
    case "festivo":
      return colors.lobosS;
    case "evento":
      return colors.secundarioAmarillo;
    case "hoy":
      return "rgba(255,255,255,0.6)";
    default:
      return "#888";
  }
}

function EventoBadge({ tipo }: { tipo: TipoEvento }) {
  const config = {
    evento: {
      bg: colors.primarioAmarillo,
      color: "#5A4800",
      shadow: colors.secundarioAmarillo,
      label: "Evento"
    },
    junta: {
      bg: colors.halcones,
      color: "#fff",
      shadow: colors.halconesS,
      label: "Junta de ambiente"
    },
    suspension: {
      bg: "#E0E0E0",
      color: "#666",
      shadow: "#B0B0B0",
      label: "Suspensión"
    },
    festivo: {
      bg: colors.lobos,
      color: "#fff",
      shadow: colors.lobosS,
      label: "Festivo"
    }
  }[tipo];

  return (
    <View
      style={[
        styles.evBadge,
        {
          backgroundColor: config.bg,
          shadowColor: config.shadow
        }
      ]}
    >
      <Text style={[styles.evBadgeTxt, { color: config.color }]}>
        {config.label}
      </Text>
    </View>
  );
}

function getEvBoxColor(tipo: TipoEvento) {
  switch (tipo) {
    case "evento":
      return { bg: colors.lightAmarillo, color: colors.secundarioAmarillo };
    case "junta":
      return { bg: "#EAF8FB", color: colors.halconesS };
    case "suspension":
      return { bg: "#F0F0F0", color: "#666" };
    case "festivo":
      return { bg: "#FEF0F7", color: colors.lobosS };
  }
}

export default function Calendario() {
  const [mesIndex, setMesIndex] = useState(3);
  const mesNombre = MESES[mesIndex];
  const letras = mesNombre.split("");

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={{ width: 4 }} />
          <View style={styles.logoRow}>
            <Svg width={30} height={30} viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke={colors.primarioAmarillo}
                strokeWidth="9"
              />
              <Circle
                cx="50"
                cy="50"
                r="31"
                fill="none"
                stroke={colors.verde}
                strokeWidth="9"
              />
              <Path
                d="M50 32 a18 18 0 1 1 -0.01 0"
                fill="none"
                stroke={colors.lobos}
                strokeWidth="9"
                strokeLinecap="round"
              />
              <Circle cx="50" cy="50" r="8" fill={colors.halcones} />
            </Svg>
            <Text style={styles.headerTitulo}>Calendario</Text>
          </View>
          <View style={{ width: 30 }} />
        </View>

        <View style={styles.monthSection}>
          <View style={styles.monthNav}>
            <TouchableOpacity
              style={styles.monthBtn}
              onPress={() => setMesIndex((i) => Math.max(0, i - 1))}
              activeOpacity={0.7}
            >
              <Svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.texto}
                strokeWidth="2.5"
              >
                <Polyline points="15 18 9 12 15 6" />
              </Svg>
            </TouchableOpacity>

            <View style={styles.monthCenter}>
              <View style={styles.monthLetters}>
                {letras.map((letra, i) => (
                  <Text
                    key={i}
                    style={[
                      styles.monthLetra,
                      {
                        color: COLORES_LETRAS[i % COLORES_LETRAS.length]
                      }
                    ]}
                  >
                    {letra}
                  </Text>
                ))}
              </View>
              <Text style={styles.monthAnio}>2025</Text>
            </View>

            <TouchableOpacity
              style={styles.monthBtn}
              onPress={() => setMesIndex((i) => Math.min(11, i + 1))}
              activeOpacity={0.7}
            >
              <Svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.texto}
                strokeWidth="2.5"
              >
                <Polyline points="9 18 15 12 9 6" />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.calSection}>
          <View style={styles.calHead}>
            {DIAS_SEMANA.map((d) => (
              <Text key={d} style={styles.calDn}>
                {d}
              </Text>
            ))}
          </View>

          <View style={styles.calBody}>
            {GRID_DIAS.map((semana, si) => {
              if (semana === null) {
                return (
                  <View key={`vac-${si}`} style={styles.vacRow}>
                    <Text style={styles.vacTxt}>
                      🌿 Vacaciones de Semana Santa
                    </Text>
                  </View>
                );
              }

              return (
                <View key={si} style={styles.calRow}>
                  {semana.map((dia, di) => {
                    if (!dia) {
                      return <View key={di} style={styles.calCeldaVacia} />;
                    }
                    const estilo = getCeldaEstilo(dia.tipo);
                    return (
                      <TouchableOpacity
                        key={di}
                        activeOpacity={0.8}
                        style={[
                          styles.calCelda,
                          {
                            backgroundColor: estilo.bg,
                            borderColor: estilo.border,
                            borderStyle: estilo.borderStyle,
                            shadowColor: estilo.shadow,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity:
                              estilo.shadow !== "transparent" ? 1 : 0,
                            shadowRadius: 0,
                            elevation: estilo.shadow !== "transparent" ? 2 : 0
                          }
                        ]}
                      >
                        <Text
                          style={[
                            styles.calNum,
                            { color: getNumColor(dia.tipo) }
                          ]}
                        >
                          {dia.num}
                        </Text>
                        {dia.label && (
                          <Text
                            style={[
                              styles.calLbl,
                              { color: getLblColor(dia.tipo) }
                            ]}
                          >
                            {dia.label}
                          </Text>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.leyenda}>
          {[
            {
              bg: colors.lightAmarillo,
              border: colors.primarioAmarillo,
              dashed: false,
              label: "Evento"
            },
            {
              bg: "#EAF8FB",
              border: colors.halcones,
              dashed: false,
              label: "Junta"
            },
            {
              bg: "#F0FAF0",
              border: colors.verde,
              dashed: true,
              label: "Vacaciones"
            },
            {
              bg: "#F5F5F5",
              border: "#C0C0C0",
              dashed: true,
              label: "Suspensión"
            },
            {
              bg: "#FEF0F7",
              border: colors.lobos,
              dashed: false,
              label: "Festivo"
            }
          ].map((item) => (
            <View key={item.label} style={styles.leyItem}>
              <View
                style={[
                  styles.leySq,
                  {
                    backgroundColor: item.bg,
                    borderColor: item.border,
                    borderStyle: item.dashed ? "dashed" : "solid"
                  }
                ]}
              />
              <Text style={styles.leyTxt}>{item.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sep}>Próximos eventos</Text>

        {EVENTOS.map((ev, index) => {
          const boxColor = getEvBoxColor(ev.tipo);
          return (
            <TouchableOpacity
              key={index}
              style={styles.evCard}
              activeOpacity={0.85}
            >
              <View style={[styles.evBox, { backgroundColor: boxColor.bg }]}>
                <Text style={[styles.evDia, { color: boxColor.color }]}>
                  {ev.dia}
                </Text>
                <Text style={[styles.evMes, { color: boxColor.color }]}>
                  {ev.mes}
                </Text>
              </View>
              <View style={styles.evInfo}>
                <EventoBadge tipo={ev.tipo} />
                <Text style={styles.evTitulo}>{ev.titulo}</Text>
                <Text style={styles.evDesc}>{ev.descripcion}</Text>
                <TouchableOpacity style={styles.evAgenda} activeOpacity={0.7}>
                  <Svg
                    width={12}
                    height={12}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.halconesS}
                    strokeWidth="2.2"
                  >
                    <Rect x="3" y="4" width="18" height="18" rx="2" />
                    <Line x1="16" y1="2" x2="16" y2="6" />
                    <Line x1="8" y1="2" x2="8" y2="6" />
                    <Line x1="3" y1="10" x2="21" y2="10" />
                  </Svg>
                  <Text style={styles.evAgendaTxt}>Agregar a mi agenda</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFDF5"
  },
  header: {
    backgroundColor: colors.card,
    paddingTop: 65,
    paddingBottom: 12,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0ECD8",
    gap: 14
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  headerTitulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 20,
    color: colors.texto
  },

  monthSection: {
    alignItems: "center"
  },
  monthNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  monthBtn: {
    width: 50,
    height: 50,
    borderRadius: 999,
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center"
  },
  monthCenter: {
    alignItems: "center",
    gap: 2
  },
  monthLetters: {
    flexDirection: "row",
    gap: 1
  },
  monthLetra: {
    fontFamily: fonts.fontPacifico,
    fontSize: 45,
    lineHeight: 70,
    letterSpacing: 3
  },
  monthAnio: {
    fontFamily: fonts.fontBold,
    fontSize: 14,
    color: "#C0C0C0",
    letterSpacing: 1.5
  },

  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: 30
  },

  calSection: {
    backgroundColor: "#FFFDF5",
    padding: 10,
    paddingBottom: 6
  },
  calHead: {
    flexDirection: "row",
    gap: 3,
    marginBottom: 5
  },
  calDn: {
    flex: 1,
    fontFamily: fonts.fontBlack,
    fontSize: 11,
    textAlign: "center",
    color: "#C0C0C0",
    paddingVertical: 2
  },
  calBody: {
    gap: 3
  },
  calRow: {
    flexDirection: "row",
    gap: 3
  },
  calCelda: {
    flex: 1,
    minHeight: 46,
    borderRadius: 10,
    borderWidth: 1.5,
    padding: 5,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  calCeldaVacia: {
    flex: 1,
    minHeight: 46
  },
  calNum: {
    fontFamily: fonts.fontBlack,
    fontSize: 13,
    lineHeight: 14,
    marginBottom: 2
  },
  calLbl: {
    fontFamily: fonts.fontExtra,
    fontSize: 10,
    textAlign: "center",
    lineHeight: 12
  },
  vacRow: {
    backgroundColor: "#F0FAF0",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.verde,
    borderStyle: "dashed",
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6
  },
  vacTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 12,
    color: "#3A7A18"
  },

  leyenda: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#FFFDF5",
    borderTopWidth: 0.5,
    borderTopColor: "#F0ECD8"
  },
  leyItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3
  },
  leySq: {
    width: 12,
    height: 12,
    borderRadius: 2,
    borderWidth: 1.5,
    flexShrink: 0
  },
  leyTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 12,
    color: "#888"
  },

  sep: {
    fontFamily: fonts.fontExtra,
    fontSize: 11,
    color: "#C0C0C0",
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 4,
    marginTop: 10
  },

  evCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "#F0ECD8",
    padding: 12,
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    marginHorizontal: 10,
    marginBottom: 7
  },
  evBox: {
    width: 70,
    height: 120,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  evDia: {
    fontFamily: fonts.fontBlack,
    fontSize: 24,
    lineHeight: 26
  },
  evMes: {
    fontFamily: fonts.fontExtra,
    fontSize: 11,
    textTransform: "uppercase"
  },
  evInfo: { flex: 1, gap: 3 },
  evBadge: {
    alignSelf: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  evBadgeTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 14
  },
  evTitulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 16,
    color: colors.texto,
    marginTop: 5
  },
  evDesc: {
    fontFamily: fonts.fontSemibold,
    fontSize: 14,
    color: "#888",
    marginVertical: 5
  },
  evAgenda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#EAF8FB",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: "flex-end"
  },
  evAgendaTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 16,
    color: colors.halconesS
  }
});
