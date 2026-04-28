import { AnimalAvatar, AnimalPill } from "@/src/components/ui/AnimalKit";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Svg, { Circle, Line, Path, Polyline } from "react-native-svg";
import TabBar from "../../../components/ui/TlatoaniTabIcons";
import { colors, fonts } from "../../../styles/global";

type AreaId =
  | "todos"
  | "lenguaje"
  | "matematicas"
  | "vida"
  | "sensorial"
  | "cultura";

interface Area {
  id: AreaId;
  label: string;
  color: string;
  shadow: string;
  bgLight: string;
  textColor: string;
}

const AREAS: Area[] = [
  {
    id: "todos",
    label: "Todos",
    color: "#7BC441",
    shadow: "#4A7A1E",
    bgLight: "#EFF8E4",
    textColor: "#2D5A10"
  },
  {
    id: "lenguaje",
    label: "Lenguaje",
    color: "#00AECC",
    shadow: "#007A8F",
    bgLight: "#E8F8FC",
    textColor: "#007A8F"
  },
  {
    id: "matematicas",
    label: "Matemáticas",
    color: "#F5C800",
    shadow: "#B89600",
    bgLight: "#FFF3CC",
    textColor: "#7A6200"
  },
  {
    id: "vida",
    label: "Vida práctica",
    color: "#7BC441",
    shadow: "#4A7A1E",
    bgLight: "#F0FAF0",
    textColor: "#3A7A18"
  },
  {
    id: "sensorial",
    label: "Sensorial",
    color: "#E5297E",
    shadow: "#A01D59",
    bgLight: "#FDF0F8",
    textColor: "#A01D59"
  },
  {
    id: "cultura",
    label: "Cultura",
    color: "#FF8C00",
    shadow: "#C25F00",
    bgLight: "#FFF3E0",
    textColor: "#6B3800"
  }
];

interface Observacion {
  id: string;
  area: AreaId;
  fecha: string;
  texto: string;
  maestra: string;
  seccion: "semana" | "anterior";
}

const HIJOS_INFO: Record<string, { nombre: string; salon: string }> = {
  victoria: { nombre: "Victoria Ramírez", salon: "abejas" },
  diego: { nombre: "Diego Ramírez", salon: "halcones" }
};

const OBSERVACIONES_POR_HIJO: Record<string, Observacion[]> = {
  victoria: [
    {
      id: "v1",
      area: "lenguaje",
      fecha: "Hoy · 10:30am",
      texto:
        'Sofía completó sola el trabajo de letras móviles por primera vez. Formó su nombre completo y la palabra "mamá" sin ayuda.',
      maestra: "Mtra. Sandra",
      seccion: "semana"
    },
    {
      id: "v2",
      area: "vida",
      fecha: "Ayer · 2:15pm",
      texto:
        "Durante la actividad de servir agua, ayudó a tres compañeros a llenar sus vasos. Mostró mucha concentración y cuidado con el material.",
      maestra: "Mtra. Sandra",
      seccion: "semana"
    },
    {
      id: "v3",
      area: "matematicas",
      fecha: "Lun 14 oct · 11am",
      texto:
        "Trabajó con las perlas doradas y logró asociar la cantidad 1000 al cubo grande. Está explorando el sistema decimal con mucho interés.",
      maestra: "Mtra. Sandra",
      seccion: "anterior"
    },
    {
      id: "v4",
      area: "sensorial",
      fecha: "Vie 11 oct · 3pm",
      texto:
        "Con los cilindros de sonido, identificó correctamente los pares de más fuerte a más suave. Mostró mucha paciencia durante el ejercicio.",
      maestra: "Mtra. Sandra",
      seccion: "anterior"
    }
  ],
  diego: [
    {
      id: "d1",
      area: "matematicas",
      fecha: "Hoy · 9:00am",
      texto:
        "Diego contó hasta 100 usando la cadena de cuentas sin pausas. Demostró mucha seguridad y concentración durante todo el ejercicio.",
      maestra: "Mtra. Laura",
      seccion: "semana"
    },
    {
      id: "d2",
      area: "cultura",
      fecha: "Mar 15 oct · 10am",
      texto:
        "Identificó correctamente los continentes en el mapa de puzzle. Mostró especial interés por América del Sur y quiso saber más.",
      maestra: "Mtra. Laura",
      seccion: "anterior"
    }
  ]
};

const RESUMEN_POR_HIJO: Record<
  string,
  { id: string; label: string; color: string; pct: number; count: number }[]
> = {
  victoria: [
    { id: "lenguaje", label: "Lenguaje", color: "#00AECC", pct: 0.8, count: 4 },
    {
      id: "matematicas",
      label: "Matemáticas",
      color: "#F5C800",
      pct: 0.6,
      count: 3
    },
    {
      id: "vida",
      label: "Vida práctica",
      color: "#7BC441",
      pct: 0.6,
      count: 3
    },
    {
      id: "sensorial",
      label: "Sensorial",
      color: "#E5297E",
      pct: 0.2,
      count: 1
    }
  ],
  diego: [
    {
      id: "matematicas",
      label: "Matemáticas",
      color: "#F5C800",
      pct: 0.9,
      count: 5
    },
    { id: "cultura", label: "Cultura", color: "#FF8C00", pct: 0.4, count: 2 }
  ]
};

function getArea(id: AreaId): Area {
  return AREAS.find((a) => a.id === id) ?? AREAS[0];
}

function AreaTagIcon({ id, color }: { id: AreaId; color: string }) {
  switch (id) {
    case "lenguaje":
      return (
        <Svg
          width={15}
          height={15}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
        >
          <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </Svg>
      );
    case "matematicas":
      return (
        <Svg
          width={15}
          height={15}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
        >
          <Line x1="18" y1="20" x2="18" y2="10" />
          <Line x1="12" y1="20" x2="12" y2="4" />
          <Line x1="6" y1="20" x2="6" y2="14" />
        </Svg>
      );
    case "vida":
      return (
        <Svg
          width={15}
          height={15}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
        >
          <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </Svg>
      );
    case "sensorial":
      return (
        <Svg
          width={15}
          height={15}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
        >
          <Circle cx="12" cy="12" r="5" />
          <Line x1="12" y1="1" x2="12" y2="3" />
          <Line x1="12" y1="21" x2="12" y2="23" />
          <Line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <Line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <Line x1="1" y1="12" x2="3" y2="12" />
          <Line x1="21" y1="12" x2="23" y2="12" />
        </Svg>
      );
    case "cultura":
      return (
        <Svg
          width={15}
          height={15}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
        >
          <Circle cx="12" cy="12" r="10" />
          <Line x1="2" y1="12" x2="22" y2="12" />
          <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </Svg>
      );
    default:
      return null;
  }
}

function AreaTag({ id }: { id: AreaId }) {
  const area = getArea(id);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: area.bgLight,
        borderWidth: 1.5,
        borderColor: area.color,
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 10
      }}
    >
      <AreaTagIcon id={id} color={area.textColor} />
      <Text
        style={{
          fontFamily: fonts.fontBlack,
          fontSize: 12,
          color: area.textColor
        }}
      >
        {area.label}
      </Text>
    </View>
  );
}

function ObsCard({
  obs,
  liked,
  onLike
}: {
  obs: Observacion;
  liked: boolean;
  onLike: () => void;
}) {
  const area = getArea(obs.area);
  return (
    <View
      style={[
        styles.obsCard,
        liked && { borderColor: area.color, borderWidth: 1.5 }
      ]}
    >
      <View style={styles.obsTop}>
        <AreaTag id={obs.area} />
        <Text style={styles.obsFecha}>{obs.fecha}</Text>
      </View>
      <Text style={styles.obsTexto}>{obs.texto}</Text>
      <View style={styles.obsFooter}>
        <Text style={styles.obsMaestra}>{obs.maestra}</Text>
        <TouchableOpacity
          onPress={onLike}
          activeOpacity={0.8}
          style={[styles.btnLike, liked && styles.btnLiked]}
        >
          <Svg
            width={12}
            height={12}
            viewBox="0 0 24 24"
            fill={liked ? "#fff" : "none"}
            stroke={liked ? "#fff" : colors.lobos}
            strokeWidth="2"
          >
            <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </Svg>
          <Text style={[styles.btnLikeTxt, liked && styles.btnLikedTxt]}>
            Me encantó
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Bitacora() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const hijoId = id ?? "victoria";

  const hijo = HIJOS_INFO[hijoId] ?? HIJOS_INFO["victoria"];
  const observaciones = OBSERVACIONES_POR_HIJO[hijoId] ?? [];
  const resumen = RESUMEN_POR_HIJO[hijoId] ?? [];

  const [areaActiva, setAreaActiva] = useState<AreaId>("todos");
  const [likes, setLikes] = useState<Record<string, boolean>>({});

  const toggleLike = (obsId: string) =>
    setLikes((prev) => ({ ...prev, [obsId]: !prev[obsId] }));

  const obsFiltradas = observaciones.filter(
    (o) => areaActiva === "todos" || o.area === areaActiva
  );
  const semana = obsFiltradas.filter((o) => o.seccion === "semana");
  const anterior = obsFiltradas.filter((o) => o.seccion === "anterior");

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
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

          <Text style={styles.headerTitulo}>Bitácora</Text>

          <View style={styles.mesBadge}>
            <Text style={styles.mesBadgeTxt}>Abril 2026</Text>
          </View>
        </View>

        <View style={styles.hijoHeader}>
          <AnimalAvatar salon={hijo.salon} size="md" />
          <View style={styles.hijoInfo}>
            <Text style={styles.hijoNombre}>{hijo.nombre}</Text>
            <AnimalPill
              salon={hijo.salon}
              label={`${hijo.salon.charAt(0).toUpperCase() + hijo.salon.slice(1)} · Casa de niños`}
              size="sm"
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.areasScroll}
        >
          {AREAS.map((area) => {
            const activo = areaActiva === area.id;
            return (
              <TouchableOpacity
                key={area.id}
                onPress={() => setAreaActiva(area.id)}
                activeOpacity={0.8}
                style={[
                  styles.areaPill,
                  activo
                    ? {
                        backgroundColor: area.color,
                        shadowColor: area.shadow,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 1,
                        shadowRadius: 0,
                        elevation: 2
                      }
                    : styles.areaPillOff
                ]}
              >
                <Text
                  style={[
                    styles.areaPillTxt,
                    { color: activo ? "#fff" : "#AAA" }
                  ]}
                >
                  {area.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.feed}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {semana.length > 0 && (
          <>
            <Text style={styles.sep}>Esta semana</Text>
            {semana.map((obs) => (
              <ObsCard
                key={obs.id}
                obs={obs}
                liked={likes[obs.id] ?? false}
                onLike={() => toggleLike(obs.id)}
              />
            ))}
          </>
        )}

        {anterior.length > 0 && (
          <>
            <Text style={styles.sep}>Semana pasada</Text>
            {anterior.map((obs) => (
              <ObsCard
                key={obs.id}
                obs={obs}
                liked={likes[obs.id] ?? false}
                onLike={() => toggleLike(obs.id)}
              />
            ))}
          </>
        )}

        {resumen.length > 0 && (
          <>
            <Text style={styles.sep}>Resumen de octubre</Text>
            <View style={styles.resumenCard}>
              {resumen.map((item, i) => (
                <View
                  key={item.id}
                  style={[
                    styles.resumenItem,
                    i === resumen.length - 1 && { borderBottomWidth: 0 }
                  ]}
                >
                  <View style={styles.resumenAreaRow}>
                    <View
                      style={[
                        styles.resumenDot,
                        { backgroundColor: item.color }
                      ]}
                    />
                    <Text style={styles.resumenAreaLbl}>{item.label}</Text>
                  </View>
                  <View style={styles.resumenBarWrap}>
                    <View
                      style={[
                        styles.resumenBar,
                        {
                          width: `${item.pct * 100}%` as any,
                          backgroundColor: item.color
                        }
                      ]}
                    />
                  </View>
                  <Text style={styles.resumenCount}>{item.count}</Text>
                </View>
              ))}
            </View>
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
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
    paddingTop: 65,
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 22,
    color: colors.texto,
    marginLeft: 10,
    flex: 1
  },
  mesBadge: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20
  },
  mesBadgeTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 12,
    color: "#888"
  },

  hijoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    gap: 12
  },
  hijoInfo: {
    // flex: 1,
    gap: 4
  },
  hijoNombre: {
    fontFamily: fonts.fontBlack,
    fontSize: 22,
    color: colors.texto
  },

  areasScroll: {
    flexDirection: "row",
    gap: 7,
    paddingBottom: 2
  },
  areaPill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  areaPillOff: {
    backgroundColor: "#F0F0F0"
  },
  areaPillTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 13
  },

  feed: { flex: 1 },
  feedContent: {
    padding: 12,
    paddingBottom: 24,
    gap: 8
  },
  sep: {
    fontFamily: fonts.fontExtra,
    fontSize: 11,
    color: "#C0C0C0",
    letterSpacing: 0.7,
    textTransform: "uppercase",
    paddingVertical: 2,
    paddingHorizontal: 2
  },

  obsCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 14,
    gap: 8
  },
  obsTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  obsFecha: {
    fontFamily: fonts.fontSemibold,
    fontSize: 11,
    color: "#C0C0C0"
  },
  obsTexto: {
    fontFamily: fonts.fontSemibold,
    fontSize: 16,
    color: "#444",
    lineHeight: 18
  },
  obsFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: "#F5F5F5"
  },
  obsMaestra: {
    fontFamily: fonts.fontBold,
    fontSize: 13,
    color: "#AAA"
  },
  btnLike: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF0F5",
    borderWidth: 1.5,
    borderColor: colors.lobos,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 11
  },
  btnLiked: {
    backgroundColor: colors.lobos,
    borderWidth: 0,
    shadowColor: colors.lobosS,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  btnLikeTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 12,
    color: colors.lobos
  },
  btnLikedTxt: {
    color: "#fff"
  },

  resumenCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 14
  },
  resumenItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F5F5F5"
  },
  resumenAreaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    width: 110
  },
  resumenDot: {
    width: 9,
    height: 9,
    borderRadius: 5
  },
  resumenAreaLbl: {
    fontFamily: fonts.fontBold,
    fontSize: 14,
    color: "#555"
  },
  resumenBarWrap: {
    flex: 1,
    height: 6,
    backgroundColor: "#F0F0F0",
    borderRadius: 3,
    overflow: "hidden",
    marginHorizontal: 8
  },
  resumenBar: {
    height: "100%",
    borderRadius: 3
  },
  resumenCount: {
    fontFamily: fonts.fontBlack,
    fontSize: 14,
    color: colors.texto,
    width: 16,
    textAlign: "right"
  }
});
