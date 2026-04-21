import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { colors, fonts, spacing } from "../../styles/global";

interface HeaderHomeProps {
  nombreFamilia: string;
  tieneNotificaciones: boolean;
  onNotifPress: () => void;
}

export default function HeaderHome({
  nombreFamilia,
  tieneNotificaciones,
  onNotifPress
}: HeaderHomeProps) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.filaSuperior}>
        <View style={styles.logoRow}>
          <Svg width={45} height={45} viewBox="0 0 100 100">
            <Circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke={colors.primarioAmarillo}
              strokeWidth="9"
            />
            <Circle
              cx="50"
              cy="50"
              r="31"
              fill="none"
              stroke={colors.verde}
              strokeWidth="9"
            />
            <Path
              d="M50 32 a18 18 0 1 1 -0.01 0"
              fill="none"
              stroke={colors.lobos}
              strokeWidth="9"
              strokeLinecap="round"
            />
            <Circle cx="50" cy="50" r="8" fill={colors.halcones} />
          </Svg>
          <View>
            <Text style={styles.logoColegio}>Colegio</Text>
            <Text style={styles.logoTlatoani}>tlatoani</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.notifBtn}
          onPress={onNotifPress}
          activeOpacity={0.7}
        >
          <Svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.texto}
            strokeWidth="2.2"
          >
            <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </Svg>
          {tieneNotificaciones && <View style={styles.notifDot} />}
        </TouchableOpacity>
      </View>

      <Text style={styles.saludoHi}>Buenos días,</Text>
      <Text style={styles.saludoNombre}>{nombreFamilia}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
    paddingTop: 52,
    paddingBottom: 0
    // borderBottomWidth: 0.5,
    // borderBottomColor: "#F0F0F0"
  },
  filaSuperior: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  logoColegio: {
    fontFamily: fonts.fontBold,
    fontSize: 9,
    color: "#C0C0C0",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  logoTlatoani: {
    fontFamily: fonts.fontExtra,
    fontSize: 16,
    color: colors.texto
  },
  notifBtn: {
    width: 45,
    height: 45,
    borderRadius: 999,
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.rojo,
    borderWidth: 1.5,
    borderColor: colors.card,
    position: "absolute",
    top: 3,
    right: 3
  },
  saludoHi: {
    fontFamily: fonts.fontSemibold,
    fontSize: 14,
    color: "#B0B0B0",
    marginBottom: 1
  },
  saludoNombre: {
    fontFamily: fonts.fontExtra,
    fontSize: 23,
    color: colors.texto,
    marginBottom: 5,
    lineHeight: 30
  }
});
