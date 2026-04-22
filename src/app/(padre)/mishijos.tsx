import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Svg, { Circle, Ellipse, Path, Rect } from "react-native-svg";
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
    nombre: "Victoria Miño",
    salon: "abejas",
    nivel: "Casa de niños",
    edad: "4 años"
  },
  {
    id: "diego",
    nombre: "Diego Miño",
    salon: "halcones",
    nivel: "Taller 1",
    edad: "7 años"
  }
];

function AnimalIcon({ salon }: { salon: string }) {
  switch (salon) {
    case "abejas":
      return (
        <Svg width={38} height={38} viewBox="0 0 48 48" fill="none">
          <Ellipse cx="24" cy="34" rx="9" ry="12" fill="#F5C800" />
          <Rect x="15" y="29" width="18" height="4" rx="1" fill="#2D2D2D" />
          <Ellipse cx="24" cy="22" rx="8" ry="7" fill="#2D2D2D" />
          <Circle cx="24" cy="13" r="7" fill="#F5C800" />
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
        <Svg width={38} height={38} viewBox="0 0 48 48" fill="none">
          <Path d="M6 20 Q18 8 40 7 Q31 17 24 21Z" fill="#00AECC" />
          <Ellipse cx="24" cy="32" rx="10" ry="12" fill="#00AECC" />
          <Ellipse cx="7" cy="21" rx="6" ry="4" fill="#007A8F" />
        </Svg>
      );
    case "hormigas":
      return (
        <Svg width={38} height={38} viewBox="0 0 48 48" fill="none">
          <Ellipse cx="24" cy="36" rx="9" ry="8" fill="#7BC441" />
          <Ellipse cx="24" cy="24" rx="6" ry="6" fill="#5A9A2A" />
          <Circle cx="24" cy="13" r="7" fill="#7BC441" />
        </Svg>
      );
    case "lobos":
      return (
        <Svg width={38} height={38} viewBox="0 0 48 48" fill="none">
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

export default function MisHijos() {
  const router = useRouter();

  useEffect(() => {
    if (HIJOS.length === 1) {
      router.replace(`/(padre)/hijo/${HIJOS[0].id}` as any);
    }
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Mis hijos</Text>
        <Text style={styles.subtitulo}>{HIJOS.length} hijos inscritos</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {HIJOS.map((hijo) => {
          const colores = grupoColors[hijo.salon as keyof typeof grupoColors];
          return (
            <TouchableOpacity
              key={hijo.id}
              style={[
                styles.card,
                {
                  borderColor: colores.base,
                  shadowColor: colores.dark
                }
              ]}
              onPress={() => router.push(`/(padre)/hijo/${hijo.id}` as any)}
              activeOpacity={0.85}
            >
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor: colores.light,
                    borderColor: colores.base
                  }
                ]}
              >
                <AnimalIcon salon={hijo.salon} />
              </View>
              <View style={styles.datos}>
                <Text style={styles.nombre}>{hijo.nombre}</Text>
                <View style={styles.metaRow}>
                  <View
                    style={[
                      styles.salonChip,
                      {
                        backgroundColor: colores.base,
                        shadowColor: colores.dark
                      }
                    ]}
                  >
                    <Text
                      style={[styles.salonTxt, { color: colores.textColor }]}
                    >
                      {hijo.salon.charAt(0).toUpperCase() + hijo.salon.slice(1)}
                    </Text>
                  </View>
                  <Text style={styles.metaTxt}>{hijo.nivel}</Text>
                  <Text style={styles.metaTxt}>·</Text>
                  <Text style={styles.metaTxt}>{hijo.edad}</Text>
                </View>
              </View>
              <Svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.texto3}
                strokeWidth="2.5"
              >
                <Path d="M9 18l6-6-6-6" />
              </Svg>
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
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0"
  },
  titulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 22,
    color: colors.texto
  },
  subtitulo: {
    fontFamily: fonts.fontSemibold,
    fontSize: 12,
    color: colors.texto3,
    marginTop: 2
  },
  scroll: { flex: 1 },
  scrollContent: {
    padding: spacing.lg,
    gap: 12
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 2,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 18,
    borderWidth: 2.5,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  datos: {
    flex: 1,
    gap: 6
  },
  nombre: {
    fontFamily: fonts.fontBlack,
    fontSize: 16,
    color: colors.texto
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap"
  },
  salonChip: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: radii.pill,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  salonTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 10
  },
  metaTxt: {
    fontFamily: fonts.fontSemibold,
    fontSize: 11,
    color: colors.texto2
  }
});
