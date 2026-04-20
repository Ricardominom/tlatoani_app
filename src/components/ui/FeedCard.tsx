import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Line, Rect } from "react-native-svg";
import { colors, fonts, radii } from "../../styles/global";

export type TipoCard =
  | "aviso"
  | "bitacora"
  | "comida"
  | "colegiatura"
  | "general";

type ColorAcento = "amarillo" | "rosa" | "rojo" | "ninguno";

interface Tag {
  label: string;
  tipo: "abejas" | "halcones" | "hormigas" | "lobos" | "general" | "alerta";
}

export interface FeedCardProps {
  tipo: TipoCard;
  tag: Tag;
  titulo: string;
  cuerpo: string;
  tiempo: string;
  leido: boolean;
  acento: ColorAcento;
  comidaInfo?: {
    texto: string;
    fecha: string;
  };
  onPress?: () => void;
  onConfirmar?: () => void;
  onVerCuenta?: () => void;
  onAgenda?: () => void;
}

function getTagEstilo(tipo: Tag["tipo"]) {
  switch (tipo) {
    case "abejas":
      return {
        bg: colors.primarioAmarillo,
        color: "#5A4800",
        shadow: colors.secundarioAmarillo
      };
    case "halcones":
      return { bg: colors.halcones, color: "#fff", shadow: colors.halconesS };
    case "hormigas":
      return { bg: colors.verde, color: "#fff", shadow: colors.hormigasS };
    case "lobos":
      return { bg: colors.lobos, color: "#fff", shadow: colors.lobosS };
    case "alerta":
      return { bg: colors.rojo, color: "#fff", shadow: colors.rojoS };
    case "general":
    default:
      return { bg: "#BDBDBD", color: "#fff", shadow: "#8E8E8E" };
  }
}

function getColorAcento(acento: ColorAcento) {
  switch (acento) {
    case "amarillo":
      return colors.primarioAmarillo;
    case "rosa":
      return colors.lobos;
    case "rojo":
      return colors.rojo;
    default:
      return "transparent";
  }
}

export default function FeedCard({
  tipo,
  tag,
  titulo,
  cuerpo,
  tiempo,
  leido,
  acento,
  comidaInfo,
  onPress,
  onConfirmar,
  onVerCuenta,
  onAgenda
}: FeedCardProps) {
  const tagEstilo = getTagEstilo(tag.tipo);
  const colorAcento = getColorAcento(acento);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        acento !== "ninguno" && {
          borderLeftWidth: 3,
          borderLeftColor: colorAcento,
          borderRadius: 0,
          borderTopRightRadius: radii.md,
          borderBottomRightRadius: radii.md,
          paddingLeft: 10
        }
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.cardTop}>
        <View
          style={[
            styles.tag,
            { backgroundColor: tagEstilo.bg, shadowColor: tagEstilo.shadow }
          ]}
        >
          <Text style={[styles.tagTxt, { color: tagEstilo.color }]}>
            {tag.label}
          </Text>
        </View>
        <Text style={styles.tiempo}>{tiempo}</Text>
      </View>

      <Text style={styles.titulo}>{titulo}</Text>

      <Text style={styles.cuerpo}>{cuerpo}</Text>

      {comidaInfo && (
        <View style={styles.comidaBlock}>
          <Text style={styles.comidaTxt}>{comidaInfo.texto}</Text>
          <View style={styles.comidaBadge}>
            <Text style={styles.comidaBadgeTxt}>{comidaInfo.fecha}</Text>
          </View>
        </View>
      )}

      <View style={styles.cardFooter}>
        {!leido && tipo === "aviso" && onConfirmar && (
          <TouchableOpacity style={styles.btnConfirmar} onPress={onConfirmar}>
            <Text style={styles.btnConfirmarTxt}>Confirmar lectura</Text>
          </TouchableOpacity>
        )}

        {tipo === "colegiatura" && onVerCuenta && (
          <TouchableOpacity style={styles.btnPago} onPress={onVerCuenta}>
            <Text style={styles.btnPagoTxt}>Ver estado de cuenta</Text>
          </TouchableOpacity>
        )}

        {leido && <Text style={styles.leidoOk}>✓ Leído</Text>}

        {!leido && tipo !== "aviso" && tipo !== "colegiatura" && (
          <Text style={styles.sinLeer}>Sin leer</Text>
        )}

        {onAgenda && (
          <TouchableOpacity style={styles.btnAgenda} onPress={onAgenda}>
            <Svg
              width={10}
              height={10}
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.halcones}
              strokeWidth="2.2"
            >
              <Rect x="3" y="4" width="18" height="18" rx="2" />
              <Line x1="16" y1="2" x2="16" y2="6" />
              <Line x1="8" y1="2" x2="8" y2="6" />
              <Line x1="3" y1="10" x2="21" y2="10" />
            </Svg>
            <Text style={styles.btnAgendaTxt}>Agregar a agenda</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 12,
    borderWidth: 0.5,
    borderColor: "#EBEBEB"
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radii.pill,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  tagTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 10
  },
  tiempo: {
    fontFamily: fonts.fontSemibold,
    fontSize: 9,
    color: "#C0C0C0"
  },
  titulo: {
    fontFamily: fonts.fontExtra,
    fontSize: 12,
    color: colors.texto,
    marginBottom: 3
  },
  cuerpo: {
    fontFamily: fonts.fontSemibold,
    fontSize: 11,
    color: colors.texto2,
    lineHeight: 16
  },
  comidaBlock: {
    backgroundColor: colors.lightAmarillo,
    borderRadius: radii.sm,
    padding: 8,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.primarioAmarillo,
    borderStyle: "dashed"
  },
  comidaTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 10,
    color: "#7A6200"
  },
  comidaBadge: {
    backgroundColor: colors.primarioAmarillo,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radii.sm,
    shadowColor: colors.secundarioAmarillo,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  comidaBadgeTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 9,
    color: "#5A4800"
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 7,
    borderTopWidth: 0.5,
    borderTopColor: "#F5F5F5"
  },
  btnConfirmar: {
    backgroundColor: colors.primarioAmarillo,
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: radii.pill,
    shadowColor: colors.secundarioAmarillo,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  btnConfirmarTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 10,
    color: "#5A4800"
  },
  btnPago: {
    backgroundColor: colors.rojo,
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: radii.pill,
    shadowColor: colors.rojoS,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  btnPagoTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 10,
    color: "#fff"
  },
  btnAgenda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3
  },
  btnAgendaTxt: {
    fontFamily: fonts.fontBold,
    fontSize: 10,
    color: colors.halcones
  },
  leidoOk: {
    fontFamily: fonts.fontExtra,
    fontSize: 9,
    color: colors.verde
  },
  sinLeer: {
    fontFamily: fonts.fontSemibold,
    fontSize: 9,
    color: "#C0C0C0"
  }
});
