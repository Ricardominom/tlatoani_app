import { usePathname, useRouter } from "expo-router";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Svg, { Circle, Ellipse, Line, Path, Rect } from "react-native-svg";
import { fonts } from "../../styles/global";

const IconoInicio = ({ color = "#2D2D2D", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path
      d="M4 16 L16 5 L28 16"
      stroke={color}
      strokeWidth="3.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <Rect
      x="8"
      y="15"
      width="16"
      height="13"
      rx="3"
      stroke={color}
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <Rect
      x="13"
      y="21"
      width="6"
      height="7"
      rx="2"
      stroke={color}
      strokeWidth="2.5"
    />
    <Rect
      x="21"
      y="8"
      width="3.5"
      height="7"
      rx="1.75"
      stroke={color}
      strokeWidth="2"
    />
  </Svg>
);

const IconoComida = ({ color = "#2D2D2D", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path
      d="M5 15 Q5 25 16 25 Q27 25 27 15Z"
      stroke={color}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <Line
      x1="4"
      y1="13"
      x2="28"
      y2="13"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Path
      d="M10 6 L10 13"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <Path
      d="M8 6 L8 10 Q10 12 12 10 L12 6"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 6 L22 14"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <Ellipse cx="22" cy="8" rx="3" ry="3" stroke={color} strokeWidth="2" />
  </Svg>
);

const IconoCalendario = ({ color = "#2D2D2D", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Rect
      x="4"
      y="7"
      width="24"
      height="21"
      rx="4"
      stroke={color}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <Line
      x1="4"
      y1="14"
      x2="28"
      y2="14"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <Rect
      x="10"
      y="4"
      width="3.5"
      height="7"
      rx="1.75"
      stroke={color}
      strokeWidth="2.5"
    />
    <Rect
      x="18.5"
      y="4"
      width="3.5"
      height="7"
      rx="1.75"
      stroke={color}
      strokeWidth="2.5"
    />
    <Circle cx="11" cy="20" r="1.5" fill={color} />
    <Circle cx="16" cy="20" r="1.5" fill={color} />
    <Circle cx="21" cy="20" r="1.5" fill={color} />
    <Circle cx="11" cy="25" r="1.5" fill={color} />
    <Circle cx="16" cy="25" r="1.5" fill={color} />
  </Svg>
);

const IconoMisHijos = ({ color = "#2D2D2D", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Circle cx="11" cy="10" r="5.5" stroke={color} strokeWidth="3" />
    <Path
      d="M3 28 C3 21 6 18 11 18 C16 18 19 21 19 28"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="22" cy="13" r="4" stroke={color} strokeWidth="2.5" />
    <Path
      d="M17 28 C17 23 19 20 22 20 C25 20 27 23 27 28"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconoAvisos = ({ color = "#2D2D2D", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path
      d="M16 4 C10 4 8 10 8 14 L8 21 L6 23 L26 23 L24 21 L24 14 C24 10 22 4 16 4Z"
      stroke={color}
      strokeWidth="3"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <Circle cx="16" cy="4" r="2" stroke={color} strokeWidth="2.5" />
    <Path
      d="M13 23 Q13 27 16 27 Q19 27 19 23"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

const TABS = [
  {
    id: "inicio",
    label: "Inicio",
    ruta: "/(padre)/home",
    color: "#2D2D2D",
    shadow: "#000000",
    light: "#E8E8E8",
    Icon: IconoInicio
  },
  {
    id: "comida",
    label: "Comida",
    ruta: "/(padre)/comida",
    color: "#F5C800",
    shadow: "#B89600",
    light: "#FFFBE6",
    Icon: IconoComida
  },
  {
    id: "calendario",
    label: "Calendario",
    ruta: "/(padre)/calendario",
    color: "#00AECC",
    shadow: "#007A8F",
    light: "#E0F7FC",
    Icon: IconoCalendario
  },
  {
    id: "mishijos",
    label: "Mis hijos",
    ruta: "/(padre)/mishijos",
    color: "#7BC441",
    shadow: "#4E8A22",
    light: "#EFF8E4",
    Icon: IconoMisHijos
  },
  {
    id: "avisos",
    label: "Avisos",
    ruta: "/(padre)/avisos",
    color: "#E5297E",
    shadow: "#A0005A",
    light: "#FCE4EF",
    Icon: IconoAvisos
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
            onPress={() => router.replace(tab.ruta as any)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.iconoWrap,
                activo
                  ? {
                      width: 52,
                      height: 52,
                      borderRadius: 18,
                      backgroundColor: tab.color,
                      shadowColor: tab.shadow,
                      shadowOffset: { width: 0, height: 5 },
                      shadowOpacity: 1,
                      shadowRadius: 0,
                      elevation: 5,
                      borderWidth: 2,
                      borderColor: tab.shadow,
                      transform: [{ translateY: -6 }]
                    }
                  : {
                      width: 42,
                      height: 42,
                      borderRadius: 13,
                      backgroundColor: tab.light
                    }
              ]}
            >
              <tab.Icon
                color={activo ? "#fff" : tab.color}
                size={activo ? 26 : 22}
              />
            </View>

            <Text
              style={[
                styles.tabLabel,
                { color: activo ? tab.color : "#C0C0C0" },
                activo && { marginTop: -3 }
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#EBEBEB",
    paddingTop: 8,
    paddingBottom: 24,
    justifyContent: "space-around",
    alignItems: "flex-end"
  },
  tab: {
    alignItems: "center",
    gap: 3,
    flex: 1
  },
  iconoWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  tabLabel: {
    fontFamily: fonts.fontBlack,
    fontSize: 9
  }
});
