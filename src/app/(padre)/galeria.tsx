import { AnimalPill, AnimalPillLight } from "@/src/components/ui/AnimalKit";
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
import { colors, fonts, radii, spacing } from "../../styles/global";

type Salon = "abejas" | "halcones" | "hormigas" | "lobos" | "pollitos" | null;

interface Evento {
  id: string;
  nombre: string;
  fecha: string;
  salon: Salon;
  totalFotos: number;
  totalVideos?: number;
  mes: string;
  coloresMini: string[][];
}

const EVENTOS: Evento[] = [
  {
    id: "1",
    nombre: "Visita al jardín botánico",
    fecha: "Mar 22 oct",
    salon: "abejas",
    totalFotos: 24,
    totalVideos: 2,
    mes: "Octubre 2025",
    coloresMini: [
      ["#a8e063", "#56ab2f"],
      ["#89f7fe", "#66a6ff"],
      ["#d4fc79", "#96e6a1"],
      ["#ffecd2", "#fcb69f"]
    ]
  },
  {
    id: "2",
    nombre: "Festival de otoño",
    fecha: "Vie 18 oct",
    salon: null,
    totalFotos: 58,
    totalVideos: 5,
    mes: "Octubre 2025",
    coloresMini: [
      ["#ffecd2", "#fcb69f"],
      ["#f093fb", "#f5576c"],
      ["#a8e063", "#56ab2f"],
      ["#a18cd1", "#fbc2eb"]
    ]
  },
  {
    id: "3",
    nombre: "Desfile de independencia",
    fecha: "Lun 15 sep",
    salon: null,
    totalFotos: 31,
    mes: "Septiembre 2025",
    coloresMini: [
      ["#89f7fe", "#66a6ff"],
      ["#a8e063", "#56ab2f"],
      ["#f093fb", "#f5576c"],
      ["#ffecd2", "#fcb69f"]
    ]
  }
];

const SALONES = [
  "abejas",
  "hormigas",
  "halcones",
  "lobos",
  "leones",
  "pandas",
  "pollitos"
];

function HeroEvento({ id }: { id: string }) {
  if (id === "1") {
    return (
      <Svg width="100%" height="110" viewBox="0 0 300 110" fill="none">
        <Ellipse
          cx="150"
          cy="95"
          rx="180"
          ry="30"
          fill="#2d8a00"
          opacity={0.2}
        />
        <Rect x="138" y="40" width="10" height="55" rx="5" fill="#5a3a1a" />
        <Ellipse cx="143" cy="35" rx="30" ry="34" fill="#3aad00" />
        <Ellipse
          cx="122"
          cy="50"
          rx="20"
          ry="24"
          fill="#4ccc00"
          opacity={0.8}
        />
        <Ellipse
          cx="166"
          cy="52"
          rx="20"
          ry="24"
          fill="#4ccc00"
          opacity={0.8}
        />
        <Rect x="210" y="55" width="8" height="40" rx="4" fill="#5a3a1a" />
        <Ellipse
          cx="214"
          cy="48"
          rx="22"
          ry="26"
          fill="#3aad00"
          opacity={0.9}
        />
        <Rect x="72" y="65" width="7" height="30" rx="3.5" fill="#5a3a1a" />
        <Ellipse cx="75" cy="58" rx="18" ry="20" fill="#56c200" opacity={0.9} />
        <Circle cx="98" cy="28" r="16" fill="#FFD600" opacity={0.8} />
        <Line
          x1="98"
          y1="8"
          x2="98"
          y2="14"
          stroke="#FFD600"
          strokeWidth="2.5"
        />
        <Line
          x1="98"
          y1="42"
          x2="98"
          y2="48"
          stroke="#FFD600"
          strokeWidth="2.5"
        />
        <Line
          x1="78"
          y1="28"
          x2="84"
          y2="28"
          stroke="#FFD600"
          strokeWidth="2.5"
        />
        <Line
          x1="112"
          y1="28"
          x2="118"
          y2="28"
          stroke="#FFD600"
          strokeWidth="2.5"
        />
      </Svg>
    );
  }

  if (id === "2") {
    return (
      <Svg width="100%" height="110" viewBox="0 0 300 110" fill="none">
        <Ellipse
          cx="60"
          cy="50"
          rx="26"
          ry="16"
          fill="#E5297E"
          opacity={0.7}
          transform="rotate(-30, 60, 50)"
        />
        <Ellipse
          cx="110"
          cy="32"
          rx="22"
          ry="14"
          fill="#F5C800"
          opacity={0.8}
          transform="rotate(20, 110, 32)"
        />
        <Ellipse
          cx="200"
          cy="38"
          rx="26"
          ry="15"
          fill="#7BC441"
          opacity={0.7}
          transform="rotate(-15, 200, 38)"
        />
        <Ellipse
          cx="248"
          cy="55"
          rx="22"
          ry="14"
          fill="#00AECC"
          opacity={0.7}
          transform="rotate(25, 248, 55)"
        />
        <Ellipse
          cx="155"
          cy="28"
          rx="28"
          ry="17"
          fill="#F5C800"
          opacity={0.6}
          transform="rotate(10, 155, 28)"
        />
        <Ellipse cx="150" cy="78" rx="28" ry="22" fill="#F5A623" />
        <Ellipse
          cx="133"
          cy="78"
          rx="13"
          ry="20"
          fill="#E8940E"
          opacity={0.5}
        />
        <Ellipse
          cx="167"
          cy="78"
          rx="13"
          ry="20"
          fill="#E8940E"
          opacity={0.5}
        />
        <Rect x="146" y="54" width="8" height="12" rx="4" fill="#5a3a1a" />
        <Path
          d="M125 72 Q133 64 141 72"
          stroke="#5a3a1a"
          strokeWidth="2"
          fill="none"
        />
        <Path
          d="M159 72 Q167 64 175 72"
          stroke="#5a3a1a"
          strokeWidth="2"
          fill="none"
        />
        <Path
          d="M132 82 Q150 92 168 82"
          stroke="#5a3a1a"
          strokeWidth="2"
          fill="none"
        />
      </Svg>
    );
  }

  return (
    <Svg width="100%" height="110" viewBox="0 0 300 110" fill="none">
      <Rect x="90" y="20" width="120" height="65" rx="5" fill="#fff" />
      <Rect x="90" y="20" width="40" height="65" rx="4" fill="#006847" />
      <Rect x="170" y="20" width="40" height="65" fill="#CE1126" />
      <Ellipse cx="150" cy="52" rx="12" ry="14" fill="#8B6914" />
      <Path d="M126 38 Q150 28 174 38" fill="#6B7280" opacity={0.6} />
      <Path d="M120 44 Q150 33 180 44" fill="#6B7280" opacity={0.4} />
      <Rect x="87" y="14" width="4" height="80" rx="2" fill="#8B6914" />
    </Svg>
  );
}

function EventoCard({
  evento,
  onPress
}: {
  evento: Evento;
  onPress: () => void;
}) {
  const mostrarExtra = evento.totalFotos - 3;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.heroWrap}>
        <HeroEvento id={evento.id} />

        <View style={styles.countBadge}>
          <Svg
            width={10}
            height={10}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
          >
            <Rect x="3" y="3" width="18" height="18" rx="2" />
            <Circle cx="8.5" cy="8.5" r="1.5" />
            <Polyline points="21 15 16 10 5 21" />
          </Svg>
          <Text style={styles.countTxt}>{evento.totalFotos} fotos</Text>
        </View>

        {evento.totalVideos && (
          <View style={styles.videoBadge}>
            <Svg width={9} height={9} viewBox="0 0 24 24" fill={"#FFF"}>
              <Path d="M5 3 L19 12 L5 21 Z" />
            </Svg>
            <Text style={[styles.videoTxt, { color: "#FFF" }]}>
              {evento.totalVideos} videos
            </Text>
          </View>
        )}
      </View>

      <View style={styles.infoWrap}>
        <Text style={styles.eventoNombre}>{evento.nombre}</Text>
        <View style={styles.metaRow}>
          <View style={styles.fechaRow}>
            <Svg
              width={10}
              height={10}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#AAA"
              strokeWidth="2"
            >
              <Rect x="3" y="4" width="18" height="18" rx="2" />
              <Line x1="3" y1="10" x2="21" y2="10" />
            </Svg>
            <Text style={styles.fechaTxt}>{evento.fecha}</Text>
          </View>
          {evento.salon ? (
            <AnimalPill salon={evento.salon} size="sm" />
          ) : (
            <View style={styles.tagEscuela}>
              <Text style={styles.tagEscuelaTxt}>Toda la escuela</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.miniGrid}>
        {evento.coloresMini.map((colores, i) => (
          <View
            key={i}
            style={[styles.miniThumb, { backgroundColor: colores[0] }]}
          >
            {i === 3 && mostrarExtra > 0 && (
              <View style={styles.masOverlay}>
                <Text style={styles.masTxt}>+{mostrarExtra}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

export default function Galeria() {
  const router = useRouter();
  const [filtroActivo, setFiltroActivo] = useState("todos");

  const eventosFiltrados = EVENTOS.filter((e) => {
    if (filtroActivo === "todos") return true;
    return e.salon === filtroActivo;
  });

  const porMes = eventosFiltrados.reduce(
    (acc, evento) => {
      if (!acc[evento.mes]) acc[evento.mes] = [];
      acc[evento.mes].push(evento);
      return acc;
    },
    {} as Record<string, Evento[]>
  );

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
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
          <Text style={styles.headerTitulo}>Galería de eventos</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtrosContent}
          style={styles.filtrosScroll}
        >
          <TouchableOpacity
            style={[
              styles.filPill,
              filtroActivo === "todos" && styles.filPillOn
            ]}
            onPress={() => setFiltroActivo("todos")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filTxt,
                filtroActivo === "todos" && styles.filTxtOn
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>

          {SALONES.map((salon) => (
            <TouchableOpacity
              key={salon}
              onPress={() => setFiltroActivo(salon)}
              activeOpacity={0.8}
            >
              {filtroActivo === salon ? (
                <AnimalPill salon={salon} size="md" />
              ) : (
                <AnimalPillLight salon={salon} size="md" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.feed}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(porMes).map(([mes, eventos]) => (
          <View key={mes}>
            <Text style={styles.mesSep}>{mes}</Text>
            {eventos.map((evento) => (
              <EventoCard
                key={evento.id}
                evento={evento}
                onPress={() =>
                  router.push(`/(padre)/foto-abierta?id=${evento.id}` as any)
                }
              />
            ))}
          </View>
        ))}

        {eventosFiltrados.length === 0 && (
          <View style={styles.vacio}>
            <Text style={styles.vacioTxt}>Sin eventos para este salón</Text>
          </View>
        )}
      </ScrollView>

      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.fondo },

  header: {
    backgroundColor: colors.card,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0"
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 65,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 22,
    color: colors.texto
  },
  headerSpacer: { width: 30 },

  filtrosScroll: { paddingBottom: spacing.md },
  filtrosContent: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md
  },
  filPill: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: radii.pill,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center"
  },
  filPillOn: {
    backgroundColor: "#2D2D2D",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  filTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 14,
    color: "#AAA"
  },
  filTxtOn: { color: colors.primarioAmarillo },

  feed: { flex: 1 },
  feedContent: {
    padding: spacing.md,
    paddingBottom: 24,
    gap: 0
  },
  mesSep: {
    fontFamily: fonts.fontBlack,
    fontSize: 12,
    color: "#C0C0C0",
    letterSpacing: 0.7,
    textTransform: "uppercase",
    paddingVertical: spacing.sm,
    paddingHorizontal: 2
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    overflow: "hidden",
    marginBottom: spacing.md
  },
  heroWrap: {
    width: "100%",
    height: 110,
    backgroundColor: "#e8f5e9",
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  countBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 20
  },
  countTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 12,
    color: "#fff"
  },
  videoBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.lobos,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
    shadowColor: colors.lobosS,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  videoTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 11
  },
  infoWrap: {
    paddingHorizontal: 13,
    paddingTop: 12,
    paddingBottom: 8
  },
  eventoNombre: {
    fontFamily: fonts.fontBlack,
    fontSize: 18,
    color: colors.texto,
    marginBottom: 4
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  fechaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  fechaTxt: {
    fontFamily: fonts.fontBold,
    fontSize: 13,
    color: "#AAA"
  },
  tagEscuela: {
    backgroundColor: "#2D2D2D",
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  tagEscuelaTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 11,
    color: colors.primarioAmarillo
  },

  miniGrid: {
    flexDirection: "row",
    gap: 3,
    paddingHorizontal: 13,
    paddingBottom: 12
  },
  miniThumb: {
    flex: 1,
    height: 46,
    borderRadius: 8,
    overflow: "hidden"
  },
  masOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  masTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 15,
    color: "#fff"
  },

  vacio: {
    alignItems: "center",
    paddingTop: 48
  },
  vacioTxt: {
    fontFamily: fonts.fontBold,
    fontSize: 17,
    color: colors.texto3
  }
});
