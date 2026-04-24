import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import Svg, { Path, Polyline } from "react-native-svg";
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
