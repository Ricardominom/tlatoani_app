import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle, Line, Path, Polyline } from "react-native-svg";
import { colors, fonts } from "../../styles/global";

const TABS = [
  {
    id: "inicio",
    label: "Inicio",
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
    id: "perfil",
    label: "Perfil",
    icon: (activo: boolean) => (
      <Svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke={activo ? colors.texto : "#D0D0D0"}
        strokeWidth="2.2"
      >
        <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <Circle cx="12" cy="7" r="4" />
      </Svg>
    )
  }
];

interface TabBarProps {
  tabActivo: string;
  onTabPress: (id: string) => void;
}

export default function TabBar({ tabActivo, onTabPress }: TabBarProps) {
  return (
    <View style={styles.contenedor}>
      {TABS.map((tab) => {
        const activo = tabActivo === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabPress(tab.id)}
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
    gap: 3
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
