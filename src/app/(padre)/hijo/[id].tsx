import { useLocalSearchParams, useRouter } from "expo-router";
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
import TabBar from "../../../components/ui/TlatoaniTabIcons";
import {
  colors,
  fonts,
  grupoColors,
  radii,
  spacing
} from "../../../styles/global";

const HIJOS_DATA: Record<string, any> = {
  victoria: {
    nombre: "Victoria Mino",
    salon: "abejas",
    nivel: "Casa de niños",
    edad: "4 años",
    desde: "Ago 2024",
    horario: "8:00am – 1:00pm",
    ciclo: "2025 – 2026",
    activa: true,
    maestra: {
      inicial: "S",
      nombre: "Sandra García",
      rol: "Guía Montessori",
      grupo: "Casa de niños · Abejas"
    },
    autorizados: [
      {
        id: "1",
        inicial: "R",
        nombre: "Ricardo Mino",
        relacion: "Papá",
        telefono: "222 345 6789",
        principal: true,
        bg: colors.lightAmarillo,
        color: "#7A6200",
        border: colors.primarioAmarillo
      },
      {
        id: "2",
        inicial: "I",
        nombre: "Izamal Martinez",
        relacion: "Mamá",
        telefono: "222 456 7890",
        principal: true,
        bg: colors.lobosLight,
        color: colors.lobosS,
        border: colors.lobos
      },
      {
        id: "3",
        inicial: "J",
        nombre: "Josefina Martínez",
        relacion: "Tía materna",
        telefono: "222 567 8901",
        principal: false,
        bg: colors.verdeLight,
        color: "#3A7A18",
        border: colors.verde
      }
    ]
  },
  diego: {
    nombre: "Diego Mino",
    salon: "halcones",
    nivel: "Taller 1",
    edad: "7 años",
    desde: "Ago 2022",
    horario: "8:00am – 1:00pm",
    ciclo: "2025 – 2026",
    activa: true,
    maestra: {
      inicial: "R",
      nombre: "Roberto Lima",
      rol: "Guía Montessori",
      grupo: "Taller 1 · Halcones"
    },
    autorizados: [
      {
        id: "1",
        inicial: "R",
        nombre: "Ricardo Mino",
        relacion: "Papá",
        telefono: "222 345 6789",
        principal: true,
        bg: colors.lightAmarillo,
        color: "#7A6200",
        border: colors.primarioAmarillo
      },
      {
        id: "2",
        inicial: "I",
        nombre: "Izamal Martinez",
        relacion: "Mamá",
        telefono: "222 456 7890",
        principal: true,
        bg: colors.lobosLight,
        color: colors.lobosS,
        border: colors.lobos
      },
      {
        id: "3",
        inicial: "J",
        nombre: "Josefina Martínez",
        relacion: "Tía materna",
        telefono: "222 567 8901",
        principal: false,
        bg: colors.verdeLight,
        color: "#3A7A18",
        border: colors.verde
      }
    ]
  }
};

function AnimalIcon({ salon, size = 42 }: { salon: string; size?: number }) {
  switch (salon) {
    case "abejas":
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <Ellipse cx="24" cy="34" rx="9" ry="12" fill="#F5C800" />
          <Rect x="15" y="29" width="18" height="4" rx="1" fill="#2D2D2D" />
          <Rect x="15" y="37" width="18" height="4" rx="1" fill="#2D2D2D" />
          <Ellipse cx="24" cy="22" rx="8" ry="7" fill="#2D2D2D" />
          <Circle cx="24" cy="13" r="7" fill="#F5C800" />
          <Path
            d="M20 8 Q17 3 14 2"
            stroke="#2D2D2D"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <Circle cx="14" cy="2" r="1.5" fill="#2D2D2D" />
          <Path
            d="M28 8 Q31 3 34 2"
            stroke="#2D2D2D"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <Circle cx="34" cy="2" r="1.5" fill="#2D2D2D" />
          <Ellipse
            cx="12"
            cy="19"
            rx="7"
            ry="4"
            fill="#C8E8F5"
            opacity="0.85"
          />
          <Ellipse
            cx="36"
            cy="19"
            rx="7"
            ry="4"
            fill="#C8E8F5"
            opacity="0.85"
          />
        </Svg>
      );
    case "halcones":
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <Path d="M6 20 Q18 8 40 7 Q31 17 24 21Z" fill="#00AECC" />
          <Ellipse cx="24" cy="32" rx="10" ry="12" fill="#00AECC" />
          <Ellipse cx="7" cy="21" rx="6" ry="4" fill="#007A8F" />
        </Svg>
      );
    case "hormigas":
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <Ellipse cx="24" cy="36" rx="9" ry="8" fill="#7BC441" />
          <Ellipse cx="24" cy="24" rx="6" ry="6" fill="#5A9A2A" />
          <Circle cx="24" cy="13" r="7" fill="#7BC441" />
        </Svg>
      );
    case "lobos":
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <Ellipse cx="24" cy="32" rx="12" ry="9" fill="#E5297E" />
          <Ellipse cx="24" cy="17" rx="11" ry="10" fill="#E5297E" />
          <Path d="M14 11 L10 3 L19 9Z" fill="#A01D59" />
          <Path d="M34 11 L38 3 L29 9Z" fill="#A01D59" />
        </Svg>
      );
    default:
      return null;
  }
}

export default function DetalleHijo() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const hijo = HIJOS_DATA[id];
  const colores = grupoColors[hijo.salon as keyof typeof grupoColors];

  if (!hijo) {
    router.back();
    return null;
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.texto}
            strokeWidth="2.5"
          >
            <Polyline points="15 18 9 12 15 6" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>{hijo.nombre.split(" ")[0]}</Text>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editTxt}>Editar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.hijoHero,
            {
              borderColor: colores.base,
              shadowColor: colores.dark
            }
          ]}
        >
          <View
            style={[
              styles.hijoAvatar,
              {
                backgroundColor: colores.light,
                borderColor: colores.base,
                shadowColor: colores.dark
              }
            ]}
          >
            <AnimalIcon salon={hijo.salon} size={42} />
          </View>
          <Text style={styles.hijoNombre}>{hijo.nombre}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaChip}>
              <Svg
                width={10}
                height={10}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#666"
                strokeWidth="2"
              >
                <Circle cx="12" cy="12" r="10" />
                <Polyline points="12 6 12 12 16 14" />
              </Svg>
              <Text style={styles.metaTxt}>{hijo.edad}</Text>
            </View>
            <View style={styles.metaChip}>
              <Svg
                width={10}
                height={10}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#666"
                strokeWidth="2"
              >
                <Rect x="3" y="4" width="18" height="18" rx="2" />
                <Line x1="3" y1="10" x2="21" y2="10" />
              </Svg>
              <Text style={styles.metaTxt}>Desde {hijo.desde}</Text>
            </View>
          </View>
          <View
            style={[
              styles.nivelTag,
              {
                backgroundColor: colores.base,
                shadowColor: colores.dark
              }
            ]}
          >
            <Text style={[styles.nivelTagTxt, { color: colores.textColor }]}>
              {hijo.salon.charAt(0).toUpperCase() + hijo.salon.slice(1)} ·{" "}
              {hijo.nivel}
            </Text>
          </View>
        </View>

        <View style={styles.accesosRow}>
          <TouchableOpacity style={styles.accesoCard} activeOpacity={0.7}>
            <View style={[styles.accesoIcono, { backgroundColor: "#F5F5F5" }]}>
              <Svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#555"
                strokeWidth="2.2"
              >
                <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <Polyline points="14 2 14 8 20 8" />
                <Line x1="9" y1="13" x2="15" y2="13" />
              </Svg>
            </View>
            <Text style={styles.accesoLbl}>Bitácora</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accesoCard} activeOpacity={0.7}>
            <View
              style={[
                styles.accesoIcono,
                { backgroundColor: colors.lightAmarillo }
              ]}
            >
              <Svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B89600"
                strokeWidth="2.2"
              >
                <Path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <Path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              </Svg>
            </View>
            <Text style={styles.accesoLbl}>Comida</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accesoCard} activeOpacity={0.7}>
            <View
              style={[
                styles.accesoIcono,
                { backgroundColor: colors.rojoLight }
              ]}
            >
              <Svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C62828"
                strokeWidth="2.2"
              >
                <Rect x="1" y="4" width="22" height="16" rx="2" />
                <Line x1="1" y1="10" x2="23" y2="10" />
              </Svg>
            </View>
            <Text style={styles.accesoLbl}>Colegiatura</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sep}>Maestra asignada</Text>
        <View style={styles.maestraCard}>
          <View style={styles.maestraAvatar}>
            <Text style={styles.maestraAvatarTxt}>{hijo.maestra.inicial}</Text>
          </View>
          <View style={styles.maestraInfo}>
            <Text style={styles.maestraRol}>
              {hijo.maestra.rol.toUpperCase()}
            </Text>
            <Text style={styles.maestraNombre}>{hijo.maestra.nombre}</Text>
            <Text style={styles.maestraGrupo}>{hijo.maestra.grupo}</Text>
          </View>
          <TouchableOpacity style={styles.btnMsg} activeOpacity={0.7}>
            <Svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#007A8F"
              strokeWidth="2.2"
            >
              <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </Svg>
          </TouchableOpacity>
        </View>

        <Text style={styles.sep}>Datos escolares</Text>
        <View style={styles.datosCard}>
          {[
            { lbl: "Nivel", val: hijo.nivel },
            {
              lbl: "Salón",
              val: hijo.salon.charAt(0).toUpperCase() + hijo.salon.slice(1)
            },
            { lbl: "Horario", val: hijo.horario },
            { lbl: "Ciclo escolar", val: hijo.ciclo },
            {
              lbl: "Estado de inscripción",
              val: hijo.activa ? "✓ Activa" : "Inactiva",
              verde: hijo.activa
            }
          ].map((dato, index, arr) => (
            <View
              key={dato.lbl}
              style={[
                styles.datosRow,
                index === arr.length - 1 && styles.datosRowLast
              ]}
            >
              <Text style={styles.datosLbl}>{dato.lbl}</Text>
              <Text
                style={[styles.datosVal, dato.verde && styles.datosValVerde]}
              >
                {dato.val}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.sep}>Personas autorizadas a recoger</Text>
        <View style={styles.autorizadasCard}>
          {hijo.autorizados.map((persona: any, index: number, arr: any[]) => (
            <View
              key={persona.id}
              style={[
                styles.personaItem,
                index === arr.length - 1 && styles.personaItemLast
              ]}
            >
              <View
                style={[
                  styles.personaAvatar,
                  {
                    backgroundColor: persona.bg,
                    borderColor: persona.border
                  }
                ]}
              >
                <Text
                  style={[styles.personaAvatarTxt, { color: persona.color }]}
                >
                  {persona.inicial}
                </Text>
              </View>
              <View style={styles.personaDatos}>
                <Text style={styles.personaNombre}>{persona.nombre}</Text>
                <Text style={styles.personaRel}>{persona.relacion}</Text>
                <Text style={styles.personaTel}>{persona.telefono}</Text>
              </View>
              {persona.principal && (
                <View style={styles.principalBadge}>
                  <Text style={styles.principalTxt}>Principal</Text>
                </View>
              )}
            </View>
          ))}

          <TouchableOpacity style={styles.btnAgregar} activeOpacity={0.7}>
            <Svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#AAA"
              strokeWidth="2.5"
            >
              <Line x1="12" y1="5" x2="12" y2="19" />
              <Line x1="5" y1="12" x2="19" y2="12" />
            </Svg>
            <Text style={styles.btnAgregarTxt}>Agregar persona autorizada</Text>
          </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  backBtn: {
    width: 30,
    height: 30,
    borderRadius: 999,
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 16,
    color: colors.texto
  },
  editBtn: {
    backgroundColor: colors.halconesLight,
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: radii.pill
  },
  editTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 11,
    color: colors.halcones
  },

  scroll: { flex: 1 },
  scrollContent: {
    padding: spacing.md,
    gap: 8,
    paddingBottom: 30
  },

  hijoHero: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 2.5,
    padding: 18,
    alignItems: "center",
    gap: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4
  },
  hijoAvatar: {
    width: 72,
    height: 72,
    borderRadius: 22,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4
  },
  hijoNombre: {
    fontFamily: fonts.fontBlack,
    fontSize: 20,
    color: colors.texto
  },
  metaRow: {
    flexDirection: "row",
    gap: 7,
    flexWrap: "wrap",
    justifyContent: "center"
  },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F5F5F5",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radii.pill
  },
  metaTxt: {
    fontFamily: fonts.fontBold,
    fontSize: 10,
    color: "#666"
  },
  nivelTag: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: radii.pill,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  nivelTagTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 11
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
    padding: 12,
    alignItems: "center",
    gap: 6
  },
  accesoIcono: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center"
  },
  accesoLbl: {
    fontFamily: fonts.fontExtra,
    fontSize: 10,
    color: colors.texto,
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

  maestraCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  maestraAvatar: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.halconesLight,
    borderWidth: 2,
    borderColor: colors.halcones,
    shadowColor: colors.halconesS,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  maestraAvatarTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 18,
    color: colors.halconesS
  },
  maestraInfo: { flex: 1 },
  maestraRol: {
    fontFamily: fonts.fontBold,
    fontSize: 9,
    color: "#AAA",
    letterSpacing: 0.8
  },
  maestraNombre: {
    fontFamily: fonts.fontBlack,
    fontSize: 14,
    color: colors.texto
  },
  maestraGrupo: {
    fontFamily: fonts.fontBold,
    fontSize: 11,
    color: "#888"
  },
  btnMsg: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.halconesLight,
    borderWidth: 1.5,
    borderColor: colors.halcones,
    shadowColor: colors.halconesS,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center"
  },

  datosCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 14
  },
  datosRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F5F5F5"
  },
  datosRowLast: { borderBottomWidth: 0 },
  datosLbl: {
    fontFamily: fonts.fontBold,
    fontSize: 11,
    color: "#AAA"
  },
  datosVal: {
    fontFamily: fonts.fontBlack,
    fontSize: 12,
    color: colors.texto
  },
  datosValVerde: { color: "#3A7A18" },

  autorizadasCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 14
  },
  personaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F5F5F5"
  },
  personaItemLast: { borderBottomWidth: 0 },
  personaAvatar: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  personaAvatarTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 14
  },
  personaDatos: { flex: 1 },
  personaNombre: {
    fontFamily: fonts.fontBlack,
    fontSize: 12,
    color: colors.texto
  },
  personaRel: {
    fontFamily: fonts.fontBold,
    fontSize: 10,
    color: "#AAA"
  },
  personaTel: {
    fontFamily: fonts.fontBold,
    fontSize: 10,
    color: "#888",
    marginTop: 1
  },
  principalBadge: {
    backgroundColor: colors.lightAmarillo,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: radii.sm
  },
  principalTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 9,
    color: colors.secundarioAmarillo
  },
  btnAgregar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 10,
    padding: 11,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#D0D0D0",
    borderStyle: "dashed"
  },
  btnAgregarTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 12,
    color: "#AAA"
  }
});
