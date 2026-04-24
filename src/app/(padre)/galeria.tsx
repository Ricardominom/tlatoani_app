import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Svg, { Circle, Line, Path, Polyline, Rect } from "react-native-svg";
import { colors, fonts } from "../../styles/global";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const FOTOS_MOCK = [
  {
    id: "1",
    colores: ["#a8e063", "#56ab2f"],
    descripcion: "Los niños explorando las plantas"
  },
  {
    id: "2",
    colores: ["#d4fc79", "#96e6a1"],
    descripcion: "Caminata por el jardín"
  },
  {
    id: "3",
    colores: ["#89f7fe", "#66a6ff"],
    descripcion: "Mariposas del invernadero"
  },
  {
    id: "4",
    colores: ["#ffecd2", "#fcb69f"],
    descripcion: "Lunch en el jardín"
  },
  {
    id: "5",
    colores: ["#a18cd1", "#fbc2eb"],
    descripcion: "Regreso a la escuela"
  },
  { id: "6", colores: ["#f093fb", "#f5576c"], descripcion: "Fotos del grupo" },
  {
    id: "7",
    colores: ["#f7971e", "#ffd200"],
    descripcion: "Actividades al aire libre"
  },
  { id: "8", colores: ["#4facfe", "#00f2fe"], descripcion: "Vista del jardín" }
];

const EVENTOS_DATA: Record<string, any> = {
  "1": {
    nombre: "Visita al jardín botánico",
    fecha: "Mar 22 oct · 10:15am",
    salon: "abejas"
  },
  "2": {
    nombre: "Festival de otoño",
    fecha: "Vie 18 oct · 9:00am",
    salon: null
  },
  "3": {
    nombre: "Desfile de independencia",
    fecha: "Lun 15 sep · 8:30am",
    salon: null
  },
  "4": {
    nombre: "Junta de ambiente",
    fecha: "Vie 12 sep · 9:00am",
    salon: "abejas"
  }
};

export default function FotoAbierta() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const evento = EVENTOS_DATA[id] ?? EVENTOS_DATA["1"];
  const [fotoActiva, setFotoActiva] = useState(0);
  const [liked, setLiked] = useState(false);

  const fotoActual = FOTOS_MOCK[fotoActiva];

  const irAnterior = () => {
    if (fotoActiva > 0) setFotoActiva(fotoActiva - 1);
  };

  const irSiguiente = () => {
    if (fotoActiva < FOTOS_MOCK.length - 1) setFotoActiva(fotoActiva + 1);
  };

  return (
    <View style={styles.root}>
      <View style={styles.headerFloat}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
          >
            <Polyline points="15 18 9 12 15 6" />
          </Svg>
        </TouchableOpacity>

        <View style={styles.fotoCounter}>
          <Text style={styles.fotoCounterTxt}>
            {fotoActiva + 1} / {FOTOS_MOCK.length}
          </Text>
        </View>

        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
          <Svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
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

      <View
        style={[styles.fotoMain, { backgroundColor: fotoActual.colores[0] }]}
      >
        <View
          style={[styles.fotoBg, { backgroundColor: fotoActual.colores[1] }]}
        />

        {fotoActiva > 0 && (
          <TouchableOpacity
            style={[styles.navArrow, styles.navPrev]}
            onPress={irAnterior}
            activeOpacity={0.8}
          >
            <Svg
              width={12}
              height={12}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
            >
              <Polyline points="15 18 9 12 15 6" />
            </Svg>
          </TouchableOpacity>
        )}

        {fotoActiva < FOTOS_MOCK.length - 1 && (
          <TouchableOpacity
            style={[styles.navArrow, styles.navNext]}
            onPress={irSiguiente}
            activeOpacity={0.8}
          >
            <Svg
              width={12}
              height={12}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
            >
              <Polyline points="9 18 15 12 9 6" />
            </Svg>
          </TouchableOpacity>
        )}

        <View style={styles.fotoInfo}>
          <Text style={styles.fotoEventoLbl}>{evento.nombre}</Text>
          <Text style={styles.fotoDescripcion}>{fotoActual.descripcion}</Text>
          <View style={styles.fotoMetaRow}>
            <View style={styles.fotoFechaRow}>
              <Svg
                width={9}
                height={9}
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="2"
              >
                <Rect x="3" y="4" width="18" height="18" rx="2" />
                <Line x1="3" y1="10" x2="21" y2="10" />
              </Svg>
              <Text style={styles.fotoFecha}>{evento.fecha}</Text>
            </View>
            {evento.salon && (
              <View style={styles.fotoTag}>
                <Text style={styles.fotoTagTxt}>
                  {evento.salon.charAt(0).toUpperCase() + evento.salon.slice(1)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.acciones}>
        <TouchableOpacity
          style={styles.accionBtn}
          onPress={() => setLiked(!liked)}
          activeOpacity={0.8}
        >
          <Svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill={liked ? colors.lobos : "none"}
            stroke={liked ? colors.lobos : "rgba(255,255,255,0.7)"}
            strokeWidth="1.5"
          >
            <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </Svg>
          <Text style={[styles.accionLbl, liked && { color: colors.lobos }]}>
            Me encanta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.accionBtn} activeOpacity={0.8}>
          <Svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2"
          >
            <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </Svg>
          <Text style={styles.accionLbl}>Comentar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.accionBtn} activeOpacity={0.8}>
          <Svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2"
          >
            <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <Polyline points="7 10 12 15 17 10" />
            <Line x1="12" y1="15" x2="12" y2="3" />
          </Svg>
          <Text style={styles.accionLbl}>Guardar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.accionBtn} activeOpacity={0.8}>
          <Svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2"
          >
            <Circle cx="18" cy="5" r="3" />
            <Circle cx="6" cy="12" r="3" />
            <Circle cx="18" cy="19" r="3" />
            <Line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <Line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </Svg>
          <Text style={styles.accionLbl}>Compartir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tiraWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tiraScroll}
        >
          {FOTOS_MOCK.map((foto, index) => (
            <TouchableOpacity
              key={foto.id}
              onPress={() => setFotoActiva(index)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.tiraThumb,
                  { backgroundColor: foto.colores[0] },
                  index === fotoActiva
                    ? styles.tiraThumbActivo
                    : styles.tiraThumbInactivo
                ]}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },

  headerFloat: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 56,
    paddingHorizontal: 14,
    paddingBottom: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center"
  },
  fotoCounter: {
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20
  },
  fotoCounterTxt: { fontFamily: fonts.fontExtra, fontSize: 12, color: "#fff" },

  fotoMain: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center"
  },
  fotoBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5
  },

  navArrow: {
    position: "absolute",
    top: "50%",
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
    marginTop: -14
  },
  navPrev: { left: 10 },
  navNext: { right: 10 },

  fotoInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingTop: 40,
    backgroundColor: "rgba(0,0,0,0)"
  },
  fotoEventoLbl: {
    fontFamily: fonts.fontBold,
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 3
  },
  fotoDescripcion: {
    fontFamily: fonts.fontBlack,
    fontSize: 14,
    color: "#fff",
    marginBottom: 6
  },
  fotoMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  fotoFechaRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  fotoFecha: {
    fontFamily: fonts.fontBold,
    fontSize: 10,
    color: "rgba(255,255,255,0.55)"
  },
  fotoTag: {
    backgroundColor: colors.primarioAmarillo,
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 20,
    shadowColor: colors.secundarioAmarillo,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  fotoTagTxt: { fontFamily: fonts.fontBlack, fontSize: 9, color: "#5A4800" },

  acciones: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  accionBtn: { alignItems: "center", gap: 4 },
  accionLbl: {
    fontFamily: fonts.fontExtra,
    fontSize: 9,
    color: "rgba(255,255,255,0.7)"
  },

  tiraWrap: {
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingVertical: 10,
    paddingBottom: 24
  },
  tiraScroll: {
    paddingHorizontal: 12,
    gap: 5,
    flexDirection: "row"
  },
  tiraThumb: {
    width: 46,
    height: 46,
    borderRadius: 8
  },
  tiraThumbActivo: {
    borderWidth: 2.5,
    borderColor: colors.primarioAmarillo
  },
  tiraThumbInactivo: {
    opacity: 0.5
  }
});
