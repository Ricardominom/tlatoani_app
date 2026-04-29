import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { AnimalAvatar } from "../../components/ui/AnimalKit";
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
    nombre: "Victoria Mino",
    salon: "abejas",
    nivel: "Casa de niños",
    edad: "5 años"
  },
  {
    id: "diego",
    nombre: "Diego Mino",
    salon: "halcones",
    nivel: "Taller 1",
    edad: "7 años"
  }
];

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
                <AnimalAvatar salon={hijo.salon} size="md" />
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
                width={24}
                height={24}
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
    paddingTop: 65,
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
    fontSize: 14,
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
    width: 68,
    height: 68,
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
    fontSize: 20,
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
    fontSize: 16
  },
  metaTxt: {
    fontFamily: fonts.fontSemibold,
    fontSize: 10,
    color: colors.texto2
  }
});
