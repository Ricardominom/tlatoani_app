import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
}

interface FechaSimple {
  anio: number;
  mes: number;
  dia: number;
}

type TipoDiaEspecial = "junta" | "suspension" | "festivo";

interface DiaEspecial {
  fecha: FechaSimple;
  tipo: TipoDiaEspecial;
  label: string;
}

interface RangoVacaciones {
  inicio: FechaSimple;
  fin: FechaSimple;
  label: string;
}

type TipoEvento = "evento" | "junta" | "suspension" | "festivo";

interface Evento {
  fecha: FechaSimple;
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
  "Diciembre",
];

const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie"];

// Convierte un índice de mes (0-11) en su abreviatura de 3 letras para las tarjetas de eventos
function mesCorto(mes: number) {
  return MESES[mes].slice(0, 3).toLowerCase();
}

const COLORES_LETRAS = [
  colors.primarioAmarillo,
  colors.verde,
  colors.lobos,
  colors.halcones,
];

const ANIO_REFERENCIA = 2025;

function mismaFecha(a: FechaSimple, b: FechaSimple) {
  return a.anio === b.anio && a.mes === b.mes && a.dia === b.dia;
}

function esHoy(fecha: FechaSimple) {
  const ahora = new Date();
  return mismaFecha(fecha, {
    anio: ahora.getFullYear(),
    mes: ahora.getMonth(),
    dia: ahora.getDate(),
  });
}

function fechaEnRango(fecha: FechaSimple, rango: RangoVacaciones) {
  const t = new Date(fecha.anio, fecha.mes, fecha.dia).getTime();
  const desde = new Date(
    rango.inicio.anio,
    rango.inicio.mes,
    rango.inicio.dia,
  ).getTime();
  const hasta = new Date(
    rango.fin.anio,
    rango.fin.mes,
    rango.fin.dia,
  ).getTime();
  return t >= desde && t <= hasta;
}

// Construye la celda de un día real consultando "hoy" y los días especiales
function construirDia(fecha: FechaSimple): Dia {
  if (esHoy(fecha)) {
    return { num: fecha.dia, tipo: "hoy" };
  }

  const especial = DIAS_ESPECIALES.find((d) => mismaFecha(d.fecha, fecha));
  if (especial) {
    return { num: fecha.dia, tipo: especial.tipo, label: especial.label };
  }

  return { num: fecha.dia, tipo: "normal" };
}

// Si TODOS los días de una semana caen dentro del mismo rango vacacional,
// esa semana se muestra como un banner en vez de celdas individuales
function vacacionesDeLaSemana(fechas: FechaSimple[]): RangoVacaciones | null {
  if (fechas.length === 0) return null;
  return (
    VACACIONES.find((rango) => fechas.every((f) => fechaEnRango(f, rango))) ??
    null
  );
}

interface FilaVacaciones {
  esVacaciones: true;
  label: string;
}

type FilaCalendario = (Dia | null)[] | FilaVacaciones;

// Genera la cuadrícula completa de un mes calculando fechas reales,
// en lugar de leerla de una tabla escrita a mano
function generarCuadricula(anio: number, mes: number): FilaCalendario[] {
  const totalDias = new Date(anio, mes + 1, 0).getDate();
  const filas: FilaCalendario[] = [];
  let semana: (Dia | null)[] = [];
  let fechasSemana: FechaSimple[] = [];

  function cerrarSemana() {
    const vacaciones = vacacionesDeLaSemana(fechasSemana);
    filas.push(
      vacaciones ? { esVacaciones: true, label: vacaciones.label } : semana,
    );
    semana = [];
    fechasSemana = [];
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    const fecha: FechaSimple = { anio, mes, dia };
    const diaSemana = new Date(anio, mes, dia).getDay(); // 0=domingo ... 6=sábado

    if (diaSemana === 0 || diaSemana === 6) continue; // el calendario solo muestra Lun-Vie

    const columna = diaSemana - 1; // lunes(1) -> 0 ... viernes(5) -> 4

    if (semana.length === 0 && columna > 0) {
      for (let i = 0; i < columna; i++) semana.push(null);
    }

    semana.push(construirDia(fecha));
    fechasSemana.push(fecha);

    if (columna === 4) cerrarSemana();
  }

  if (semana.length > 0) {
    while (semana.length < 5) semana.push(null);
    cerrarSemana();
  }

  return filas;
}

const DIAS_ESPECIALES: DiaEspecial[] = [
  {
    fecha: { anio: 2025, mes: 3, dia: 22 },
    tipo: "junta",
    label: "C.Infantil",
  },
  { fecha: { anio: 2025, mes: 3, dia: 23 }, tipo: "junta", label: "Halcones" },
  { fecha: { anio: 2025, mes: 3, dia: 24 }, tipo: "junta", label: "Lobos" },
  { fecha: { anio: 2025, mes: 3, dia: 27 }, tipo: "junta", label: "Leones" },
  { fecha: { anio: 2025, mes: 3, dia: 28 }, tipo: "junta", label: "Abejas" },
  {
    fecha: { anio: 2025, mes: 3, dia: 30 },
    tipo: "festivo",
    label: "Día niño",
  },
  {
    fecha: { anio: 2025, mes: 4, dia: 1 },
    tipo: "suspension",
    label: "Suspensión",
  },
];

// Periodos vacacionales como un rango de fechas real, no como una fila vacía fija en la tabla
const VACACIONES: RangoVacaciones[] = [
  {
    inicio: { anio: 2025, mes: 3, dia: 14 },
    fin: { anio: 2025, mes: 3, dia: 18 },
    label: "Vacaciones de Semana Santa",
  },
];

const EVENTOS: Evento[] = [
  {
    fecha: { anio: 2025, mes: 3, dia: 13 },
    tipo: "evento",
    titulo: "Regreso de vacaciones",
    descripcion: "Último día pago sin recargo · Colegiatura",
  },
  {
    fecha: { anio: 2025, mes: 3, dia: 28 },
    tipo: "junta",
    titulo: "Casa de niños — Abejas",
    descripcion: "9:00am · Victoria asiste con papá o mamá",
  },
  {
    fecha: { anio: 2025, mes: 3, dia: 30 },
    tipo: "festivo",
    titulo: "Día del niño",
    descripcion: "Actividades especiales · Todos los niveles",
  },
  {
    fecha: { anio: 2025, mes: 4, dia: 1 },
    tipo: "suspension",
    titulo: "Día del trabajo",
    descripcion: "No hay clases · Reanudan el lunes 4",
  },
];

function getCeldaEstilo(tipo: TipoDia) {
  switch (tipo) {
    case "hoy":
      return {
        bg: "#2D2D2D",
        border: "#2D2D2D",
        borderStyle: "solid" as const,
        shadow: "#000",
      };
    case "evento":
      return {
        bg: colors.lightAmarillo,
        border: colors.primarioAmarillo,
        borderStyle: "solid" as const,
        shadow: colors.secundarioAmarillo,
      };
    case "junta":
      return {
        bg: "#EAF8FB",
        border: colors.halcones,
        borderStyle: "solid" as const,
        shadow: colors.halconesS,
      };
    case "suspension":
      return {
        bg: "#F5F5F5",
        border: "#C0C0C0",
        borderStyle: "dashed" as const,
        shadow: "transparent",
      };
    case "festivo":
      return {
        bg: "#FEF0F7",
        border: colors.lobos,
        borderStyle: "solid" as const,
        shadow: colors.lobosS,
      };
    default:
      return {
        bg: colors.card,
        border: "#F0ECD8",
        borderStyle: "solid" as const,
        shadow: "transparent",
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
      label: "Evento",
    },
    junta: {
      bg: colors.halcones,
      color: "#fff",
      shadow: colors.halconesS,
      label: "Junta de ambiente",
    },
    suspension: {
      bg: "#E0E0E0",
      color: "#666",
      shadow: "#B0B0B0",
      label: "Suspensión",
    },
    festivo: {
      bg: colors.lobos,
      color: "#fff",
      shadow: colors.lobosS,
      label: "Festivo",
    },
  }[tipo];

  return (
    <View
      style={[
        styles.evBadge,
        {
          backgroundColor: config.bg,
          shadowColor: config.shadow,
        },
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
  const [anio, setAnio] = useState(ANIO_REFERENCIA);
  const [mesIndex, setMesIndex] = useState(3);

  function irMesAnterior() {
    if (mesIndex === 0) {
      setMesIndex(11);
      setAnio((a) => a - 1);
    } else {
      setMesIndex((m) => m - 1);
    }
  }

  function irMesSiguiente() {
    if (mesIndex === 11) {
      setMesIndex(0);
      setAnio((a) => a + 1);
    } else {
      setMesIndex((m) => m + 1);
    }
  }
  const mesNombre = MESES[mesIndex];
  const letras = mesNombre.split("");
  const cuadricula = generarCuadricula(anio, mesIndex);

  function timestamp(fecha: FechaSimple) {
    return new Date(fecha.anio, fecha.mes, fecha.dia).getTime();
  }

  const ahora = new Date();
  const inicioDeHoy = new Date(
    ahora.getFullYear(),
    ahora.getMonth(),
    ahora.getDate(),
  ).getTime();

  const proximosEventos = EVENTOS.filter(
    (ev) => timestamp(ev.fecha) >= inicioDeHoy,
  ).sort((a, b) => timestamp(a.fecha) - timestamp(b.fecha));

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
              onPress={() => irMesAnterior()}
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
                        color: COLORES_LETRAS[i % COLORES_LETRAS.length],
                      },
                    ]}
                  >
                    {letra}
                  </Text>
                ))}
              </View>
              <Text style={styles.monthAnio}>{anio}</Text>
            </View>

            <TouchableOpacity
              style={styles.monthBtn}
              onPress={() => irMesSiguiente()}
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
            {cuadricula.map((fila, fi) => {
              if ("esVacaciones" in fila) {
                return (
                  <View key={`vac-${fi}`} style={styles.vacRow}>
                    <Text style={styles.vacTxt}>🌿 {fila.label}</Text>
                  </View>
                );
              }

              return (
                <View key={fi} style={styles.calRow}>
                  {fila.map((dia, di) => {
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
                            elevation: estilo.shadow !== "transparent" ? 2 : 0,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.calNum,
                            { color: getNumColor(dia.tipo) },
                          ]}
                        >
                          {dia.num}
                        </Text>
                        {dia.label && (
                          <Text
                            style={[
                              styles.calLbl,
                              { color: getLblColor(dia.tipo) },
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
              label: "Evento",
            },
            {
              bg: "#EAF8FB",
              border: colors.halcones,
              dashed: false,
              label: "Junta",
            },
            {
              bg: "#F0FAF0",
              border: colors.verde,
              dashed: true,
              label: "Vacaciones",
            },
            {
              bg: "#F5F5F5",
              border: "#C0C0C0",
              dashed: true,
              label: "Suspensión",
            },
            {
              bg: "#FEF0F7",
              border: colors.lobos,
              dashed: false,
              label: "Festivo",
            },
          ].map((item) => (
            <View key={item.label} style={styles.leyItem}>
              <View
                style={[
                  styles.leySq,
                  {
                    backgroundColor: item.bg,
                    borderColor: item.border,
                    borderStyle: item.dashed ? "dashed" : "solid",
                  },
                ]}
              />
              <Text style={styles.leyTxt}>{item.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sep}>Próximos eventos</Text>

        {proximosEventos.map((ev, index) => {
          const boxColor = getEvBoxColor(ev.tipo);
          return (
            <TouchableOpacity
              key={index}
              style={styles.evCard}
              activeOpacity={0.85}
            >
              <View style={[styles.evBox, { backgroundColor: boxColor.bg }]}>
                <Text style={[styles.evDia, { color: boxColor.color }]}>
                  {ev.fecha.dia}
                </Text>
                <Text style={[styles.evMes, { color: boxColor.color }]}>
                  {mesCorto(ev.fecha.mes)}
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
    backgroundColor: "#FFFDF5",
  },
  header: {
    backgroundColor: colors.card,
    paddingTop: 65,
    paddingBottom: 12,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0ECD8",
    gap: 14,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  headerTitulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 20,
    color: colors.texto,
  },

  monthSection: {
    alignItems: "center",
  },
  monthNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  monthBtn: {
    width: 50,
    height: 50,
    borderRadius: 999,
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
  },
  monthCenter: {
    alignItems: "center",
    gap: 2,
  },
  monthLetters: {
    flexDirection: "row",
    gap: 1,
  },
  monthLetra: {
    fontFamily: fonts.fontPacifico,
    fontSize: 45,
    lineHeight: 70,
    letterSpacing: 3,
  },
  monthAnio: {
    fontFamily: fonts.fontBold,
    fontSize: 14,
    color: "#C0C0C0",
    letterSpacing: 1.5,
  },

  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: 30,
  },

  calSection: {
    backgroundColor: "#FFFDF5",
    padding: 10,
    paddingBottom: 6,
  },
  calHead: {
    flexDirection: "row",
    gap: 3,
    marginBottom: 5,
  },
  calDn: {
    flex: 1,
    fontFamily: fonts.fontBlack,
    fontSize: 11,
    textAlign: "center",
    color: "#C0C0C0",
    paddingVertical: 2,
  },
  calBody: {
    gap: 3,
  },
  calRow: {
    flexDirection: "row",
    gap: 3,
  },
  calCelda: {
    flex: 1,
    minHeight: 46,
    borderRadius: 10,
    borderWidth: 1.5,
    padding: 5,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  calCeldaVacia: {
    flex: 1,
    minHeight: 46,
  },
  calNum: {
    fontFamily: fonts.fontBlack,
    fontSize: 13,
    lineHeight: 14,
    marginBottom: 2,
  },
  calLbl: {
    fontFamily: fonts.fontExtra,
    fontSize: 10,
    textAlign: "center",
    lineHeight: 12,
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
    gap: 6,
  },
  vacTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 12,
    color: "#3A7A18",
  },

  leyenda: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#FFFDF5",
    borderTopWidth: 0.5,
    borderTopColor: "#F0ECD8",
  },
  leyItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  leySq: {
    width: 12,
    height: 12,
    borderRadius: 2,
    borderWidth: 1.5,
    flexShrink: 0,
  },
  leyTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 12,
    color: "#888",
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
    marginTop: 10,
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
    marginBottom: 7,
  },
  evBox: {
    width: 70,
    height: 120,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  evDia: {
    fontFamily: fonts.fontBlack,
    fontSize: 24,
    lineHeight: 26,
  },
  evMes: {
    fontFamily: fonts.fontExtra,
    fontSize: 11,
    textTransform: "uppercase",
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
    elevation: 2,
  },
  evBadgeTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 14,
  },
  evTitulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 16,
    color: colors.texto,
    marginTop: 5,
  },
  evDesc: {
    fontFamily: fonts.fontSemibold,
    fontSize: 14,
    color: "#888",
    marginVertical: 5,
  },
  evAgenda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#EAF8FB",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  evAgendaTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 16,
    color: colors.halconesS,
  },
});
