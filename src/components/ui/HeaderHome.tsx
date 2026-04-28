import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { colors, fonts, spacing } from "../../styles/global";

interface HeaderHomeProps {
  nombreFamilia: string;
  mensajesSinLeer: number;
  onMensajesPress: () => void;
}

export default function HeaderHome({
  nombreFamilia,
  mensajesSinLeer,
  onMensajesPress
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
          onPress={onMensajesPress}
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
            <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </Svg>
          {mensajesSinLeer > 0 && (
            <View style={styles.mensajesBadge}>
              <Text style={styles.mensajesBadgeTxt}>
                {mensajesSinLeer > 9 ? "9+" : mensajesSinLeer}
              </Text>
            </View>
          )}
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
    paddingTop: 55,
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
  mensajesBadge: {
    position: "absolute",
    top: 2,
    right: 2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.lobos,
    borderWidth: 1.5,
    borderColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3
  },
  mensajesBadgeTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 9,
    color: "#fff"
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
