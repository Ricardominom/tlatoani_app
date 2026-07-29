import { AnimalPill } from "@/src/components/ui/AnimalKit";
import { FOTOS } from "@/src/utils/fotos";
import { mesAbrev } from "@/src/utils/tiempo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle, Line, Path, Polyline, Rect } from "react-native-svg";
import { colors, fonts } from "../../styles/global";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function haceDias(n: number): Date {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000);
}

const DIAS_ABREV = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function formatFechaConHora(fecha: Date, hora: string): string {
  return `${DIAS_ABREV[fecha.getDay()]} ${fecha.getDate()} ${mesAbrev(fecha.getMonth())} · ${hora}`;
}

const FOTOS_POR_EVENTO: Record<string, { source: any; descripcion: string }[]> =
  {
    "1": [
      {
        source: FOTOS.jardin[0],
        descripcion: "Los niños explorando las plantas",
      },
      { source: FOTOS.jardin[1], descripcion: "Caminata por el jardín" },
      { source: FOTOS.jardin[2], descripcion: "Mariposas del invernadero" },
      { source: FOTOS.jardin[3], descripcion: "Lunch en el jardín" },
    ],
    "2": [
      { source: FOTOS.festival[0], descripcion: "Apertura del festival" },
      { source: FOTOS.festival[1], descripcion: "Presentación de los grupos" },
      { source: FOTOS.festival[2], descripcion: "Actividades artísticas" },
      { source: FOTOS.festival[3], descripcion: "Cierre del evento" },
    ],
    "3": [
      { source: FOTOS.desfile[0], descripcion: "Inicio del desfile" },
      { source: FOTOS.desfile[1], descripcion: "Marcha de los grupos" },
      { source: FOTOS.desfile[2], descripcion: "Bandas y estandartes" },
      { source: FOTOS.desfile[3], descripcion: "Foto grupal" },
    ],
    "4": [
      { source: FOTOS.deportes[0], descripcion: "Actividades deportivas" },
      { source: FOTOS.deportes[1], descripcion: "Juegos en equipo" },
      { source: FOTOS.deportes[2], descripcion: "Cierre de actividades" },
    ],
  };

const EVENTOS_DATA: Record<string, any> = {
  "1": {
    nombre: "Visita al jardín botánico",
    fecha: formatFechaConHora(haceDias(18), "10:15am"),
    salon: "abejas",
  },
  "2": {
    nombre: "Festival de otoño",
    fecha: formatFechaConHora(haceDias(22), "9:00am"),
    salon: null,
  },
  "3": {
    nombre: "Desfile de independencia",
    fecha: formatFechaConHora(haceDias(75), "8:30am"),
    salon: null,
  },
  "4": {
    nombre: "Día de deportes",
    fecha: formatFechaConHora(haceDias(8), "9:00am"),
    salon: null,
  },
};

export default function FotoAbierta() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const evento = EVENTOS_DATA[id] ?? EVENTOS_DATA["1"];
  const fotosList = FOTOS_POR_EVENTO[id] ?? FOTOS_POR_EVENTO["1"];
  const [fotoActiva, setFotoActiva] = useState(0);
  const [liked, setLiked] = useState(false);

  const fotoActual = fotosList[fotoActiva];

  const irAnterior = () => {
    if (fotoActiva > 0) setFotoActiva(fotoActiva - 1);
  };

  const irSiguiente = () => {
    if (fotoActiva < fotosList.length - 1) setFotoActiva(fotoActiva + 1);
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
            width={40}
            height={40}
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
            {fotoActiva + 1} / {fotosList.length}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.iconBtn}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert(
              "Más opciones",
              "Aquí verías más acciones para esta foto.",
            )
          }
        >
          <Svg
            width={20}
            height={20}
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

      <View style={styles.fotoMain}>
        <Image
          source={fotoActual.source}
          style={styles.fotoMainImg}
          resizeMode="cover"
        />

        {fotoActiva > 0 && (
          <TouchableOpacity
            style={[styles.navArrow, styles.navPrev]}
            onPress={irAnterior}
            activeOpacity={0.8}
          >
            <Svg
              width={30}
              height={30}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
            >
              <Polyline points="15 18 9 12 15 6" />
            </Svg>
          </TouchableOpacity>
        )}

        {fotoActiva < fotosList.length - 1 && (
          <TouchableOpacity
            style={[styles.navArrow, styles.navNext]}
            onPress={irSiguiente}
            activeOpacity={0.8}
          >
            <Svg
              width={30}
              height={30}
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
                width={15}
                height={15}
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
            {evento.salon && <AnimalPill salon={evento.salon} size="sm" />}
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
            width={25}
            height={25}
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

        <TouchableOpacity
          style={styles.accionBtn}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert("Comentarios", "Aún no hay comentarios en esta foto.")
          }
        >
          <Svg
            width={25}
            height={25}
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2"
          >
            <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </Svg>
          <Text style={styles.accionLbl}>Comentar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.accionBtn}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert("Guardado", "La foto se guardó en tu galería.")
          }
        >
          <Svg
            width={25}
            height={25}
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

        <TouchableOpacity
          style={styles.accionBtn}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert(
              "Compartir",
              "Se abriría el menú para compartir esta foto.",
            )
          }
        >
          <Svg
            width={25}
            height={25}
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
          {fotosList.map((foto, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setFotoActiva(index)}
              activeOpacity={0.8}
            >
              <Image
                source={foto.source}
                style={[
                  styles.tiraThumb,
                  index === fotoActiva
                    ? styles.tiraThumbActivo
                    : styles.tiraThumbInactivo,
                ]}
                resizeMode="cover"
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
    paddingTop: 65,
    paddingHorizontal: 14,
    paddingBottom: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  fotoCounter: {
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  fotoCounterTxt: { fontFamily: fonts.fontExtra, fontSize: 16, color: "#fff" },

  fotoMain: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  fotoMainImg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },

  navArrow: {
    position: "absolute",
    top: "50%",
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
    marginTop: -14,
  },
  navPrev: { left: 10 },
  navNext: { right: 10 },

  fotoInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingTop: 50,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  fotoEventoLbl: {
    fontFamily: fonts.fontBold,
    fontSize: 16,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 3,
  },
  fotoDescripcion: {
    fontFamily: fonts.fontBlack,
    fontSize: 18,
    color: "#fff",
    marginBottom: 6,
  },
  fotoMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fotoFechaRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  fotoFecha: {
    fontFamily: fonts.fontBold,
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
  },
  acciones: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  accionBtn: { alignItems: "center", gap: 4 },
  accionLbl: {
    fontFamily: fonts.fontExtra,
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
  },

  tiraWrap: {
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingVertical: 10,
    paddingBottom: 24,
  },
  tiraScroll: {
    paddingHorizontal: 12,
    gap: 5,
    flexDirection: "row",
  },
  tiraThumb: {
    width: 66,
    height: 66,
    borderRadius: 8,
  },
  tiraThumbActivo: {
    borderWidth: 2.5,
    borderColor: colors.primarioAmarillo,
  },
  tiraThumbInactivo: {
    opacity: 0.5,
  },
});
