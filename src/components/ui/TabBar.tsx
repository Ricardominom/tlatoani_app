import { usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle, Line, Path, Polyline, Rect } from "react-native-svg";
import { colors, fonts } from "../../styles/global";

const TABS = [
  {
    id: "inicio",
    label: "Inicio",
    ruta: "/(padre)/home",
    icon: (activo: boolean) => (
      <Svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke={activo ? colors.texto : "#D0D0D0"}
        strokeWidth="2.2"
      >
        <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <Polyline points="9 22 9 12 15 12 15 22" />
      </Svg>
    )
  },
  {
    id: "avisos",
    label: "Avisos",
    ruta: "/(padre)/avisos",
    icon: (activo: boolean) => (
      <Svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke={activo ? colors.texto : "#D0D0D0"}
        strokeWidth="2.2"
      >
        <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </Svg>
    )
  },
  {
    id: "comida",
    label: "Comida",
    ruta: "/(padre)/comida",
    icon: (activo: boolean) => (
      <Svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke={activo ? colors.texto : "#D0D0D0"}
        strokeWidth="2.2"
      >
        <Path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <Path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <Line x1="6" y1="1" x2="6" y2="4" />
        <Line x1="10" y1="1" x2="10" y2="4" />
        <Line x1="14" y1="1" x2="14" y2="4" />
      </Svg>
    )
  },
  {
    id: "calendario",
    label: "Calendario",
    ruta: "/(padre)/calendario",
    icon: (activo: boolean) => (
      <Svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke={activo ? colors.texto : "#D0D0D0"}
        strokeWidth="2.2"
      >
        <Rect x="3" y="4" width="18" height="18" rx="2" />
        <Line x1="16" y1="2" x2="16" y2="6" />
        <Line x1="8" y1="2" x2="8" y2="6" />
        <Line x1="3" y1="10" x2="21" y2="10" />
      </Svg>
    )
  },
  {
    id: "mishijos",
    label: "Mis hijos",
    ruta: "/(padre)/mishijos",
    icon: (activo: boolean) => (
      <Svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke={activo ? colors.texto : "#D0D0D0"}
        strokeWidth="2.2"
      >
        <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <Circle cx="9" cy="7" r="4" />
        <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </Svg>
    )
  }
];

export default function TabBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.contenedor}>
      {TABS.map((tab) => {
        const activo =
          pathname === tab.ruta ||
          pathname.startsWith(tab.ruta.replace("/(padre)", ""));

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => router.push(tab.ruta as any)}
            activeOpacity={0.7}
          >
            {tab.icon(activo)}
            <Text style={[styles.tabLabel, activo && styles.tabLabelActivo]}>
              {tab.label}
            </Text>
            {activo && <View style={styles.punto} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderTopWidth: 0.5,
    borderTopColor: "#EBEBEB",
    paddingTop: 10,
    paddingBottom: 24,
    justifyContent: "space-around",
    alignItems: "center"
  },
  tab: {
    alignItems: "center",
    gap: 3,
    flex: 1
  },
  tabLabel: {
    fontFamily: fonts.fontExtra,
    fontSize: 9,
    color: "#D0D0D0"
  },
  tabLabelActivo: {
    color: colors.texto
  },
  punto: {
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.primarioAmarillo,
    shadowColor: colors.secundarioAmarillo,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  }
});
