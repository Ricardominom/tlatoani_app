import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import TabBar from "../../components/ui/TlatoaniTabIcons";
import {
  colors,
  fonts,
  grupoColors,
  radii,
  spacing
} from "../../styles/global";

type TipoAviso = "aviso" | "colegiatura" | "bitacora" | "comida" | "general";
type TipoTag =
  | "abejas"
  | "halcones"
  | "hormigas"
  | "lobos"
  | "alerta"
  | "general";

interface Aviso {
  id: string;
  tipo: TipoAviso;
  tag: { label: string; tipo: TipoTag };
  titulo: string;
  preview: string;
  tiempo: string;
  leido: boolean;
  acento: string;
}

const HIJOS_FILTRO = [
  { id: "todos", label: "Todos" },
  { id: "victoria", label: "Victoria", salon: "abejas" },
  { id: "diego", label: "Diego", salon: "halcones" }
];

const AVISOS: Aviso[] = [
  {
    id: "1",
    tipo: "colegiatura",
    tag: { label: "Colegiatura", tipo: "alerta" },
    titulo: "Recordatorio de pago",
    preview:
      "Tu colegiatura vence en 3 días. Evita recargos pagando antes del viernes.",
    tiempo: "Hace 1h",
    leido: false,
    acento: colors.rojo
  },
  {
    id: "2",
    tipo: "aviso",
    tag: { label: "Victoria · Abejas", tipo: "abejas" },
    titulo: "Visita al jardín botánico",
    preview:
      "El martes saldremos a las 9am. Llevar lunch, agua y zapatos cómodos.",
    tiempo: "Hace 2h",
    leido: false,
    acento: colors.primarioAmarillo
  },
  {
    id: "3",
    tipo: "comida",
    tag: { label: "Diego · Halcones", tipo: "halcones" },
    titulo: "Menú compartido — octubre",
    preview: "Ya está disponible el calendario de comida de este mes.",
    tiempo: "Hace 3h",
    leido: false,
    acento: colors.lobos
  },
  {
    id: "4",
    tipo: "bitacora",
    tag: { label: "Victoria · Abejas", tipo: "abejas" },
    titulo: "Observación de la maestra",
    preview:
      "Victoria completó sola el trabajo de letras móviles por primera vez.",
    tiempo: "Ayer 4:30pm",
    leido: true,
    acento: "transparent"
  },
  {
    id: "5",
    tipo: "general",
    tag: { label: "Escuela general", tipo: "general" },
    titulo: "Suspensión de clases — 25 oct",
    preview: "No habrá clases por día del maestro. Reanudan el lunes 28.",
    tiempo: "Ayer 11am",
    leido: true,
    acento: "transparent"
  },
  {
    id: "6",
    tipo: "aviso",
    tag: { label: "Victoria · Abejas", tipo: "abejas" },
    titulo: "Junta de ambiente — Abejas",
    preview:
      "Este viernes a las 9am en el salón. Es obligatoria la asistencia de al menos un padre.",
    tiempo: "Hace 2 días",
    leido: true,
    acento: "transparent"
  }
];

function getTagEstilo(tipo: TipoTag) {
  switch (tipo) {
    case "abejas":
      return {
        bg: colors.primarioAmarillo,
        color: "#5A4800",
        shadow: colors.secundarioAmarillo
      };
    case "halcones":
      return { bg: colors.halcones, color: "#fff", shadow: colors.halconesS };
    case "hormigas":
      return { bg: colors.verde, color: "#fff", shadow: colors.hormigasS };
    case "lobos":
      return { bg: colors.lobos, color: "#fff", shadow: colors.lobosS };
    case "alerta":
      return { bg: colors.rojo, color: "#fff", shadow: colors.rojoS };
    default:
      return { bg: "#BDBDBD", color: "#fff", shadow: "#8E8E8E" };
  }
}

export default function Avisos() {
  const router = useRouter();
  const [filtroActivo, setFiltroActivo] = useState("todos");

  const avisosFiltrados = AVISOS.filter((aviso) => {
    if (filtroActivo === "todos") return true;
    if (filtroActivo === "victoria")
      return (
        aviso.tag.tipo === "abejas" ||
        aviso.tag.tipo === "alerta" ||
        aviso.tag.tipo === "general"
      );
    if (filtroActivo === "diego")
      return (
        aviso.tag.tipo === "halcones" ||
        aviso.tag.tipo === "alerta" ||
        aviso.tag.tipo === "general"
      );
    return true;
  });

  const noLeidos = AVISOS.filter((a) => !a.leido).length;

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.titulo}>Avisos</Text>
            {noLeidos > 0 && (
              <Text style={styles.subtitulo}>{noLeidos} sin leer</Text>
            )}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtrosScroll}
        >
          {HIJOS_FILTRO.map((hijo) => {
            const activo = filtroActivo === hijo.id;
            const colores = hijo.salon
              ? grupoColors[hijo.salon as keyof typeof grupoColors]
              : null;

            return (
              <TouchableOpacity
                key={hijo.id}
                style={[
                  styles.filtroChip,
                  activo &&
                    colores && {
                      backgroundColor: colores.base,
                      shadowColor: colores.dark,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 1,
                      shadowRadius: 0,
                      elevation: 2
                    },
                  activo && !colores && styles.filtroChipActivoNeutro,
                  !activo && styles.filtroChipInactivo
                ]}
                onPress={() => setFiltroActivo(hijo.id)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filtroTxt,
                    activo && colores && { color: colores.textColor },
                    activo && !colores && { color: colors.primarioAmarillo },
                    !activo && { color: "#AAA" }
                  ]}
                >
                  {hijo.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {avisosFiltrados.map((aviso) => {
          const tagEstilo = getTagEstilo(aviso.tag.tipo);
          const tieneAcento = aviso.acento !== "transparent";

          return (
            <TouchableOpacity
              key={aviso.id}
              style={[
                styles.avisoCard,
                tieneAcento && {
                  borderLeftWidth: 3,
                  borderLeftColor: aviso.acento,
                  borderRadius: 0,
                  borderTopRightRadius: radii.md,
                  borderBottomRightRadius: radii.md,
                  paddingLeft: 10
                }
              ]}
              onPress={() => router.push(`/(padre)/aviso/${aviso.id}` as any)}
              activeOpacity={0.85}
            >
              <View style={styles.cardTop}>
                <View
                  style={[
                    styles.tag,
                    {
                      backgroundColor: tagEstilo.bg,
                      shadowColor: tagEstilo.shadow
                    }
                  ]}
                >
                  <Text style={[styles.tagTxt, { color: tagEstilo.color }]}>
                    {aviso.tag.label}
                  </Text>
                </View>
                <View style={styles.cardTopRight}>
                  <Text style={styles.tiempo}>{aviso.tiempo}</Text>
                  {!aviso.leido && <View style={styles.puntoPendiente} />}
                </View>
              </View>

              <Text style={styles.avisoTitulo}>{aviso.titulo}</Text>

              <Text style={styles.avisoPreview} numberOfLines={2}>
                {aviso.preview}
              </Text>

              <View style={styles.cardFooter}>
                {aviso.leido ? (
                  <Text style={styles.leidoTxt}>✓ Leído</Text>
                ) : (
                  <Text style={styles.noLeidoTxt}>Sin leer</Text>
                )}
                <Text style={styles.verMasTxt}>Ver detalle →</Text>
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
    backgroundColor: colors.fondo
  },
  header: {
    backgroundColor: colors.card,
    paddingTop: 65,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
    gap: 12
  },
  headerTop: {
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  titulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 22,
    color: colors.texto
  },
  subtitulo: {
    fontFamily: fonts.fontSemibold,
    fontSize: 14,
    color: colors.rojo,
    marginTop: 2
  },
  filtrosScroll: {
    paddingHorizontal: spacing.lg,
    gap: 8,
    flexDirection: "row"
  },
  filtroChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: radii.pill
  },
  filtroChipActivoNeutro: {
    backgroundColor: colors.texto
  },
  filtroChipInactivo: {
    backgroundColor: "#F0F0F0"
  },
  filtroTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 15
  },

  scroll: { flex: 1 },
  scrollContent: {
    padding: spacing.md,
    gap: 8,
    paddingBottom: 30
  },

  avisoCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 12,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    gap: 5
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardTopRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radii.pill,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  tagTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 14
  },
  tiempo: {
    fontFamily: fonts.fontSemibold,
    fontSize: 11,
    color: "#C0C0C0"
  },
  puntoPendiente: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: colors.rojo
  },
  avisoTitulo: {
    fontFamily: fonts.fontExtra,
    fontSize: 14,
    color: colors.texto
  },
  avisoPreview: {
    fontFamily: fonts.fontSemibold,
    fontSize: 12,
    color: colors.texto2,
    lineHeight: 16
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: "#F5F5F5"
  },
  leidoTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 11,
    color: colors.verde
  },
  noLeidoTxt: {
    fontFamily: fonts.fontSemibold,
    fontSize: 11,
    color: "#C0C0C0"
  },
  verMasTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 11,
    color: colors.halcones
  }
});
