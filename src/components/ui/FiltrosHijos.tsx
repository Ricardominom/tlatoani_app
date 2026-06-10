import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { colors, fonts, radii } from "../../styles/global";
import { AnimalAvatar } from "./AnimalKit";

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
          <Svg width={38} height={38} viewBox="0 0 48 48" fill="none">
            <Circle cx="24" cy="24" r="21" fill="none" stroke="#F5C800" strokeWidth="5.4" />
            <Circle cx="24" cy="24" r="14" fill="none" stroke="#7BC441" strokeWidth="5.4" />
            <Path d="M24 16.5 a7.5 7.5 0 1 1 -0.01 0" fill="none" stroke="#E5297E" strokeWidth="5.4" strokeLinecap="round" />
            <Circle cx="24" cy="24" r="3.6" fill="#00AECC" />
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
            <AnimalAvatar
              salon={hijo.salon}
              size="md"
              style={
                activo
                  ? {
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 1,
                      shadowRadius: 0,
                      elevation: 4,
                      transform: [{ translateY: -3 }]
                    }
                  : {
                      opacity: 0.6
                    }
              }
            />
            <Text style={[styles.fiNombre, activo && styles.fiNombreActivo]}>
              {hijo.nombre}
            </Text>
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
          <Svg width={38} height={38} viewBox="0 0 48 48" fill="none">
            <Rect x="7" y="20" width="9" height="11" rx="3" fill={filtroActivo === "generales" ? "#fff" : "#2D2D2D"} />
            <Path d="M15 18 L33 9 Q36 9 36 12 L36 39 Q36 42 33 42 L15 33 Z" fill="#F5C800" stroke={filtroActivo === "generales" ? "#fff" : "#2D2D2D"} strokeWidth="2.4" strokeLinejoin="round" />
            <Rect x="11.5" y="30" width="6.5" height="11" rx="3" fill={filtroActivo === "generales" ? "#fff" : "#2D2D2D"} />
            <Path d="M40 17 Q44 24 40 31" stroke="#00AECC" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <Path d="M40.5 22 Q42 24 40.5 26" stroke="#E5297E" strokeWidth="2.6" strokeLinecap="round" fill="none" />
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
    width: 70,
    height: 70,
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
    fontSize: 11,
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
