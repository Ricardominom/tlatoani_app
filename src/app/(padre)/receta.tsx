import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Svg, {
  Circle,
  Ellipse,
  Line,
  Path,
  Polyline,
  Rect
} from "react-native-svg";
import TabBar from "../../components/ui/TlatoaniTabIcons";
import { colors, fonts, radii, spacing } from "../../styles/global";

const RECETA = {
  nombre: "Pasta boloñesa",
  tiempo: "45 min",
  ninos: 22,
  fecha: "Jue 17 oct",
  ingredientes: [
    {
      nombre: "Carne molida de res",
      cantidad: "2.5 kg",
      color: colors.rojo,
      destacado: true
    },
    {
      nombre: "Pasta espagueti",
      cantidad: "1.8 kg",
      color: colors.primarioAmarillo,
      destacado: true
    },
    {
      nombre: "Jitomate bola",
      cantidad: "1.2 kg",
      color: colors.verde,
      destacado: false
    },
    {
      nombre: "Cebolla blanca",
      cantidad: "3 piezas",
      color: colors.verde,
      destacado: false
    },
    {
      nombre: "Ajo",
      cantidad: "1 cabeza",
      color: colors.verde,
      destacado: false
    },
    {
      nombre: "Puré de tomate",
      cantidad: "800 ml",
      color: colors.halcones,
      destacado: false
    },
    {
      nombre: "Aceite de oliva",
      cantidad: "4 cdas",
      color: "#888",
      destacado: false
    },
    {
      nombre: "Sal y pimienta",
      cantidad: "Al gusto",
      color: "#888",
      destacado: false
    }
  ],
  pasos: [
    "Sofreír cebolla y ajo picados en aceite hasta acitronar.",
    "Añadir la carne molida y cocinar a fuego medio hasta dorar.",
    "Agregar jitomate picado y puré. Sazonar y cocinar 20 min.",
    "Hervir la pasta en agua con sal hasta al dente. Escurrir.",
    "Servir la pasta y bañar con la salsa boloñesa. ¡Listo!"
  ],
  alergenos:
    "Gluten (pasta de trigo) · Puede contener trazas de lactosa si se agrega queso parmesano.",
  notaMaestra:
    "Por favor traer los cubiertos desechables y servilletas. La comida debe llegar en recipiente con tapa antes de las 12:30pm."
};

export default function Receta() {
  const router = useRouter();
  const [porciones, setPorciones] = useState(RECETA.ninos);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Svg
            width={40}
            height={40}
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.texto}
            strokeWidth="2.5"
          >
            <Polyline points="15 18 9 12 15 6" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Receta del día</Text>
        <TouchableOpacity style={styles.shareBtn} activeOpacity={0.7}>
          <Svg
            width={30}
            height={30}
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.texto}
            strokeWidth="2.2"
          >
            <Circle cx="18" cy="5" r="3" />
            <Circle cx="6" cy="12" r="3" />
            <Circle cx="18" cy="19" r="3" />
            <Line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <Line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </Svg>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.platoHero}>
          <View style={styles.platoIcono}>
            <Svg width={72} height={72} viewBox="0 0 64 64" fill="none">
              <Circle
                cx="32"
                cy="40"
                r="16"
                fill="#FFF3CC"
                stroke={colors.primarioAmarillo}
                strokeWidth="2"
              />
              <Path
                d="M22 33 Q32 26 42 33"
                stroke={colors.primarioAmarillo}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <Ellipse
                cx="32"
                cy="40"
                rx="10"
                ry="3.5"
                fill={colors.primarioAmarillo}
                opacity="0.35"
              />
              <Rect
                x="30"
                y="18"
                width="4"
                height="10"
                rx="2"
                fill={colors.primarioAmarillo}
              />
              <Circle cx="32" cy="17" r="3" fill={colors.verde} />
            </Svg>
          </View>
          <Text style={styles.platoNombre}>{RECETA.nombre}</Text>
          <View style={styles.platoMeta}>
            <View style={styles.platoChip}>
              <Svg
                width={10}
                height={10}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#666"
                strokeWidth="2"
              >
                <Circle cx="12" cy="12" r="10" />
                <Polyline points="12 6 12 12 16 14" />
              </Svg>
              <Text style={styles.platoChipTxt}>{RECETA.tiempo}</Text>
            </View>
            <View style={styles.platoChip}>
              <Svg
                width={10}
                height={10}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#666"
                strokeWidth="2"
              >
                <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <Circle cx="9" cy="7" r="4" />
              </Svg>
              <Text style={styles.platoChipTxt}>{porciones} niños</Text>
            </View>
            <View style={styles.platoChip}>
              <Svg
                width={10}
                height={10}
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.primarioAmarillo}
                strokeWidth="2"
              >
                <Rect x="3" y="4" width="18" height="18" rx="2" />
                <Line x1="16" y1="2" x2="16" y2="6" />
                <Line x1="3" y1="10" x2="21" y2="10" />
              </Svg>
              <Text style={styles.platoChipTxt}>{RECETA.fecha}</Text>
            </View>
          </View>
        </View>

        <View style={styles.porcionesRow}>
          <Text style={styles.porcionesLbl}>Ajustar porciones</Text>
          <View style={styles.porcionesCtrl}>
            <TouchableOpacity
              style={styles.porcBtn}
              onPress={() => setPorciones((p) => Math.max(1, p - 1))}
              activeOpacity={0.8}
            >
              <Text style={styles.porcBtnTxt}>−</Text>
            </TouchableOpacity>
            <Text style={styles.porcNum}>{porciones}</Text>
            <TouchableOpacity
              style={styles.porcBtn}
              onPress={() => setPorciones((p) => p + 1)}
              activeOpacity={0.8}
            >
              <Text style={styles.porcBtnTxt}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sep}>Ingredientes</Text>
        <View style={styles.card}>
          {RECETA.ingredientes.map((ing, index, arr) => (
            <View
              key={ing.nombre}
              style={[
                styles.ingrItem,
                ing.destacado && styles.ingrItemDest,
                index === arr.length - 1 && styles.ingrItemLast
              ]}
            >
              <View style={styles.ingrLeft}>
                <View
                  style={[styles.ingrDot, { backgroundColor: ing.color }]}
                />
                <Text
                  style={[
                    styles.ingrNombre,
                    ing.destacado && styles.ingrNombreDest
                  ]}
                >
                  {ing.nombre}
                </Text>
              </View>
              <Text
                style={[
                  styles.ingrCantidad,
                  ing.destacado && styles.ingrNombreDest
                ]}
              >
                {ing.cantidad}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.sep}>Preparación</Text>
        <View style={styles.card}>
          {RECETA.pasos.map((paso, index, arr) => (
            <View
              key={index}
              style={[
                styles.pasoItem,
                index === arr.length - 1 && styles.pasoItemLast
              ]}
            >
              <View style={styles.pasoNum}>
                <Text style={styles.pasoNumTxt}>{index + 1}</Text>
              </View>
              <Text style={styles.pasoTxt}>{paso}</Text>
            </View>
          ))}
        </View>

        <View style={styles.alergenosCard}>
          <View style={styles.alergenosTitulo}>
            <Svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C62828"
              strokeWidth="2.2"
            >
              <Circle cx="12" cy="12" r="10" />
              <Line x1="12" y1="8" x2="12" y2="12" />
              <Line x1="12" y1="16" x2="12.01" y2="16" />
            </Svg>
            <Text style={styles.alergenosTituloTxt}>
              Alérgenos a considerar
            </Text>
          </View>
          <Text style={styles.alergenosLista}>{RECETA.alergenos}</Text>
        </View>

        <View style={styles.notaCard}>
          <View style={styles.notaTitulo}>
            <Svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.halconesS}
              strokeWidth="2.2"
            >
              <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <Circle cx="12" cy="7" r="4" />
            </Svg>
            <Text style={styles.notaTituloTxt}>Nota de la maestra Sandra</Text>
          </View>
          <Text style={styles.notaTxt}>{RECETA.notaMaestra}</Text>
        </View>
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
    paddingBottom: 14,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 20,
    color: colors.texto
  },
  shareBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center"
  },

  scroll: { flex: 1 },
  scrollContent: {
    padding: spacing.md,
    gap: 8,
    paddingBottom: 30
  },

  platoHero: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 2.5,
    borderColor: colors.primarioAmarillo,
    padding: 18,
    alignItems: "center",
    gap: 8,
    shadowColor: colors.secundarioAmarillo,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4
  },
  platoIcono: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: colors.lightAmarillo,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2
  },
  platoNombre: {
    fontFamily: fonts.fontBlack,
    fontSize: 24,
    color: colors.texto,
    textAlign: "center"
  },
  platoMeta: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center"
  },
  platoChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F5F5F5",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radii.pill
  },
  platoChipTxt: {
    fontFamily: fonts.fontBold,
    fontSize: 12,
    color: "#666"
  },

  porcionesRow: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  porcionesLbl: {
    fontFamily: fonts.fontExtra,
    fontSize: 18,
    color: colors.texto
  },
  porcionesCtrl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  porcBtn: {
    width: 38,
    height: 38,
    borderRadius: 999,
    backgroundColor: colors.primarioAmarillo,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.secundarioAmarillo,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  porcBtnTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 18,
    color: "#5A4800",
    lineHeight: 24
  },
  porcNum: {
    fontFamily: fonts.fontBlack,
    fontSize: 18,
    color: colors.texto,
    minWidth: 24,
    textAlign: "center"
  },

  sep: {
    fontFamily: fonts.fontExtra,
    fontSize: 11,
    color: "#C0C0C0",
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingHorizontal: 2,
    marginTop: 4
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 14
  },

  ingrItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F5F5F5"
  },
  ingrItemDest: {
    backgroundColor: colors.lightAmarillo,
    marginHorizontal: -14,
    paddingHorizontal: 14
  },
  ingrItemLast: { borderBottomWidth: 0 },
  ingrLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  ingrDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    flexShrink: 0
  },
  ingrNombre: {
    fontFamily: fonts.fontBold,
    fontSize: 16,
    color: colors.texto
  },
  ingrNombreDest: {
    color: "#7A6200"
  },
  ingrCantidad: {
    fontFamily: fonts.fontBlack,
    fontSize: 14,
    color: colors.texto
  },

  pasoItem: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F5F5F5"
  },
  pasoItemLast: { borderBottomWidth: 0 },
  pasoNum: {
    width: 35,
    height: 35,
    borderRadius: 999,
    backgroundColor: colors.primarioAmarillo,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    shadowColor: colors.secundarioAmarillo,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  pasoNumTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 16,
    color: "#5A4800"
  },
  pasoTxt: {
    fontFamily: fonts.fontSemibold,
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    flex: 1,
    paddingTop: 2
  },

  alergenosCard: {
    backgroundColor: colors.rojoLight,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.rojo,
    padding: 14,
    gap: 6
  },
  alergenosTitulo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  alergenosTituloTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 18,
    color: "#C62828"
  },
  alergenosLista: {
    fontFamily: fonts.fontSemibold,
    fontSize: 14,
    color: "#555",
    lineHeight: 18
  },

  notaCard: {
    backgroundColor: colors.halconesLight,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.halcones,
    padding: 14,
    gap: 4
  },
  notaTitulo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  notaTituloTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 18,
    color: colors.halconesS
  },
  notaTxt: {
    fontFamily: fonts.fontSemibold,
    fontSize: 14,
    color: "#444",
    lineHeight: 18
  }
});
