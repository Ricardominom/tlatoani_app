import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import Svg, { Circle, Ellipse, Path, Polyline, Rect } from "react-native-svg";
import { colors, fonts, radii } from "../../styles/global";

interface Hijo {
  id: string;
  nombre: string;
  salon: string;
}

interface FiltrosHijosProps {
  hijos: Hijo[];
  filtroActivo: string;
  onFiltroPress: (id: string) => void;
}

function getEstiloHijo(salon: string): ViewStyle {
  return {
    backgroundColor: getBgSalon(salon),
    borderWidth: 2.5,
    borderColor: getBorderSalon(salon)
  };
}

function AnimalIcon({ salon, activo }: { salon: string; activo: boolean }) {
  const color = activo ? colors.primarioAmarillo : "#999";

  switch (salon) {
    case "abejas":
      return (
        <Svg width={28} height={28} viewBox="0 0 48 48" fill="none">
          <Ellipse cx="24" cy="34" rx="9" ry="12" fill={color} />
          <Rect
            x="15"
            y="29"
            width="18"
            height="4"
            rx="1"
            fill={activo ? "#2D2D2D" : "#ccc"}
          />
          <Rect
            x="15"
            y="37"
            width="18"
            height="4"
            rx="1"
            fill={activo ? "#2D2D2D" : "#ccc"}
          />
          <Ellipse
            cx="24"
            cy="22"
            rx="8"
            ry="7"
            fill={activo ? "#2D2D2D" : "#bbb"}
          />
          <Circle cx="24" cy="13" r="7" fill={color} />
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
    case "hormigas":
      return (
        <Svg width={28} height={28} viewBox="0 0 48 48" fill="none">
          <Ellipse cx="24" cy="36" rx="9" ry="8" fill={color} />
          <Ellipse
            cx="24"
            cy="24"
            rx="6"
            ry="6"
            fill={activo ? "#5A9A2A" : "#aaa"}
          />
          <Circle cx="24" cy="13" r="7" fill={color} />
        </Svg>
      );
    case "halcones":
      return (
        <Svg width={28} height={28} viewBox="0 0 48 48" fill="none">
          <Path d="M6 20 Q18 8 40 7 Q31 17 24 21Z" fill={color} />
          <Ellipse cx="24" cy="32" rx="10" ry="12" fill={color} />
          <Ellipse
            cx="7"
            cy="21"
            rx="6"
            ry="4"
            fill={activo ? "#007A8F" : "#aaa"}
          />
        </Svg>
      );
    case "lobos":
      return (
        <Svg width={28} height={28} viewBox="0 0 48 48" fill="none">
          <Ellipse cx="24" cy="32" rx="12" ry="9" fill={color} />
          <Ellipse cx="24" cy="17" rx="11" ry="10" fill={color} />
          <Path d="M14 11 L10 3 L19 9Z" fill={activo ? "#A01D59" : "#aaa"} />
          <Path d="M34 11 L38 3 L29 9Z" fill={activo ? "#A01D59" : "#aaa"} />
        </Svg>
      );
    default:
      return null;
  }
}

export default function FiltrosHijos({
  hijos,
  filtroActivo,
  onFiltroPress
}: FiltrosHijosProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
      style={styles.contenedor}
    >
      <TouchableOpacity
        style={styles.filtro}
        onPress={() => onFiltroPress("todos")}
        activeOpacity={0.8}
      >
        <View
          style={[styles.fiBox, filtroActivo === "todos" && styles.fiBoxActivo]}
        >
          <Svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke={filtroActivo === "todos" ? colors.primarioAmarillo : "#999"}
            strokeWidth="2"
          >
            <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <Polyline points="9 22 9 12 15 12 15 22" />
          </Svg>
        </View>
        <Text
          style={[
            styles.fiNombre,
            filtroActivo === "todos" && styles.fiNombreActivo
          ]}
        >
          Todos
        </Text>
      </TouchableOpacity>

      {hijos.map((hijo) => {
        const activo = filtroActivo === hijo.id;
        return (
          <TouchableOpacity
            key={hijo.id}
            style={styles.filtro}
            onPress={() => onFiltroPress(hijo.id)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.fiBox,
                activo && styles.fiBoxActivo,
                !activo && getEstiloHijo(hijo.salon)
              ]}
            >
              <AnimalIcon salon={hijo.salon} activo={activo} />
            </View>
            <Text style={[styles.fiNombre, activo && styles.fiNombreActivo]}>
              {hijo.nombre}
            </Text>
            {/* <Text style={styles.fiSub}>{hijo.salon}</Text> */}
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={styles.filtro}
        onPress={() => onFiltroPress("generales")}
        activeOpacity={0.8}
      >
        <View
          style={[
            styles.fiBox,
            filtroActivo === "generales" && styles.fiBoxActivo
          ]}
        >
          <Svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke={
              filtroActivo === "generales" ? colors.primarioAmarillo : "#999"
            }
            strokeWidth="2"
          >
            <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </Svg>
        </View>
        <Text
          style={[
            styles.fiNombre,
            filtroActivo === "generales" && styles.fiNombreActivo
          ]}
        >
          Generales
        </Text>
        <Text style={styles.fiSub}>General</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function getBgSalon(salon: string) {
  switch (salon) {
    case "abejas":
      return colors.lightAmarillo;
    case "hormigas":
      return colors.hormigasLight;
    case "halcones":
      return colors.halconesLight;
    case "lobos":
      return colors.lobosLight;
    default:
      return "#F5F5F5";
  }
}

function getBorderSalon(salon: string) {
  switch (salon) {
    case "abejas":
      return colors.primarioAmarillo;
    case "hormigas":
      return colors.verde;
    case "halcones":
      return colors.halcones;
    case "lobos":
      return colors.lobos;
    default:
      return "#E0E0E0";
  }
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: colors.card,
    flexShrink: 1,
    maxHeight: 100
  },
  scroll: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 14,
    paddingTop: 10,
    alignItems: "flex-start"
  },
  filtro: {
    alignItems: "center",
    gap: 4,
    flexShrink: 0
  },
  fiBox: {
    width: 72,
    height: 72,
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5"
  },
  fiBoxActivo: {
    backgroundColor: "#2D2D2D",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4
  },
  fiNombre: {
    fontFamily: fonts.fontExtra,
    fontSize: 9,
    color: "#999"
  },
  fiNombreActivo: {
    color: colors.texto
  },
  fiSub: {
    fontFamily: fonts.fontSemibold,
    fontSize: 7,
    color: "#C0C0C0",
    textAlign: "center"
  }
});
