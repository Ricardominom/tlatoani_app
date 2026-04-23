import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Svg, { Circle, Line, Path, Polyline, Rect } from "react-native-svg";
import TabBar from "../../../components/ui/TlatoaniTabIcons";
import { colors, fonts, radii, spacing } from "../../../styles/global";

const AVISOS_DATA: Record<string, any> = {
  "1": {
    tag: { label: "Colegiatura", tipo: "alerta" },
    titulo: "Recordatorio de pago",
    tiempo: "Hoy · 8:30am",
    maestra: null,
    texto: [
      "Tu colegiatura del mes de octubre vence en 3 días. Te recordamos que el pago debe realizarse antes del viernes para evitar recargos.",
      "Puedes realizar el pago mediante transferencia bancaria o en la caja de la escuela de 8am a 1pm."
    ],
    evento: null,
    materiales: null,
    leido: false,
    adjuntos: [],
    confirmados: 0,
    total: 1
  },
  "2": {
    tag: { label: "Victoria · Abejas", tipo: "abejas" },
    titulo: "Visita al jardín botánico",
    tiempo: "Hoy · 8:30am",
    maestra: { inicial: "S", nombre: "Sandra García" },
    texto: [
      "El próximo martes 22 de octubre saldremos a las 9:00am rumbo al Jardín Botánico de Puebla. La actividad regresa a la escuela aproximadamente a las 12:30pm.",
      "Por favor asegúrate de que tu hijo llegue puntual ese día. Los niños deben venir con ropa cómoda y zapatos cerrados — nada de sandalias."
    ],
    evento: {
      fecha: "Martes 22 de octubre",
      horario: "9:00am · regreso 12:30pm"
    },
    materiales: [
      { id: "1", label: "Lunch completo", hecho: true },
      { id: "2", label: "Botella de agua", hecho: true },
      { id: "3", label: "Zapatos cerrados", hecho: false },
      { id: "4", label: "Bloqueador solar", hecho: false },
      { id: "5", label: "Gorra o sombrero", hecho: false }
    ],
    leido: false,
    adjuntos: [
      { nombre: "Autorización salida.pdf", size: "148 KB", tipo: "pdf" },
      { nombre: "Mapa del jardín botánico", size: "320 KB", tipo: "imagen" }
    ],
    confirmados: 17,
    total: 25
  },
  "3": {
    tag: { label: "Diego · Halcones", tipo: "halcones" },
    titulo: "Menú compartido — octubre",
    tiempo: "Hace 3h",
    maestra: { inicial: "R", nombre: "Roberto Lima" },
    texto: [
      "Ya está disponible el calendario de comida compartida para el mes de octubre. Recuerda que el turno de Diego está programado para el martes 22."
    ],
    evento: {
      fecha: "Martes 22 de octubre",
      horario: "Llevar comida antes de las 12:30pm"
    },
    materiales: null,
    leido: false,
    adjuntos: [],
    confirmados: 20,
    total: 22
  },
  "4": {
    tag: { label: "Victoria · Abejas", tipo: "abejas" },
    titulo: "Observación de la maestra",
    tiempo: "Ayer 4:30pm",
    maestra: { inicial: "S", nombre: "Sandra García" },
    texto: [
      "Victoria completó sola el trabajo de letras móviles por primera vez. Mostró gran concentración durante 25 minutos y logró formar su nombre completo sin ayuda.",
      "Es un avance muy significativo en su proceso de lectoescritura. ¡Felicitaciones a Victoria!"
    ],
    evento: null,
    materiales: null,
    leido: true,
    adjuntos: [],
    confirmados: 1,
    total: 1
  },
  "5": {
    tag: { label: "Escuela general", tipo: "general" },
    titulo: "Suspensión de clases — 25 oct",
    tiempo: "Ayer 11am",
    maestra: null,
    texto: [
      "Se informa a todas las familias que el viernes 25 de octubre no habrá clases por motivo del Día del Maestro.",
      "Las clases se reanudan normalmente el lunes 28 de octubre. Que tengan un excelente fin de semana largo."
    ],
    evento: {
      fecha: "Viernes 25 de octubre",
      horario: "Sin clases · Reanudan lunes 28"
    },
    materiales: null,
    leido: true,
    adjuntos: [],
    confirmados: 18,
    total: 25
  },
  "6": {
    tag: { label: "Victoria · Abejas", tipo: "abejas" },
    titulo: "Junta de ambiente — Abejas",
    tiempo: "Hace 2 días",
    maestra: { inicial: "S", nombre: "Sandra García" },
    texto: [
      "Este viernes a las 9am tendremos la junta de ambiente del salón Abejas en el salón de clases. Es obligatoria la asistencia de al menos un padre o tutor.",
      "En esta junta hablaremos sobre el avance del grupo, el proyecto de comida compartida y los eventos de fin de ciclo."
    ],
    evento: {
      fecha: "Viernes 18 de octubre",
      horario: "9:00am · Salón Abejas"
    },
    materiales: null,
    leido: true,
    adjuntos: [],
    confirmados: 15,
    total: 22
  }
};

function getTagEstilo(tipo: string) {
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
    default:
      return { bg: "#BDBDBD", color: "#fff", shadow: "#8E8E8E" };
  }
}

export default function DetalleAviso() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const aviso = AVISOS_DATA[id];
  const [leido, setLeido] = useState(aviso?.leido ?? false);
  const [materiales, setMateriales] = useState(aviso?.materiales ?? []);

  if (!aviso) {
    router.back();
    return null;
  }

  const tagEstilo = getTagEstilo(aviso.tag.tipo);
  const porcentaje =
    aviso.total > 0 ? (aviso.confirmados / aviso.total) * 100 : 0;

  const toggleMaterial = (matId: string) => {
    setMateriales((prev: any[]) =>
      prev.map((m) => (m.id === matId ? { ...m, hecho: !m.hecho } : m))
    );
  };

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
        <Text style={styles.headerTitulo}>Detalle del aviso</Text>
        <TouchableOpacity style={styles.shareBtn} activeOpacity={0.7}>
          <Svg
            width={25}
            height={25}
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
        <View style={styles.avisoCard}>
          <View style={styles.avisoTop}>
            <View style={styles.avisoMeta}>
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: tagEstilo.bg,
                    shadowColor: tagEstilo.shadow
                  }
                ]}
              >
                <Text style={[styles.tagTxt, { color: tagEstilo.color }]}>
                  {aviso.tag.label}
                </Text>
              </View>
              <Text style={styles.tiempo}>{aviso.tiempo}</Text>
            </View>

            <Text style={styles.avisoTitulo}>{aviso.titulo}</Text>

            {aviso.maestra && (
              <View style={styles.maestraRow}>
                <View style={styles.maestraAvatar}>
                  <Text style={styles.maestraAvatarTxt}>
                    {aviso.maestra.inicial}
                  </Text>
                </View>
                <Text style={styles.maestraNombre}>
                  Mtra. {aviso.maestra.nombre}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.avisoBody}>
            {aviso.texto.map((parrafo: string, i: number) => (
              <Text
                key={i}
                style={[styles.avisoTexto, i > 0 && { marginTop: 10 }]}
              >
                {parrafo}
              </Text>
            ))}

            {aviso.evento && (
              <View style={styles.eventoBloque}>
                <View style={styles.eventoIcono}>
                  <Svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#5A4800"
                    strokeWidth="2.2"
                  >
                    <Rect x="3" y="4" width="18" height="18" rx="2" />
                    <Line x1="16" y1="2" x2="16" y2="6" />
                    <Line x1="8" y1="2" x2="8" y2="6" />
                    <Line x1="3" y1="10" x2="21" y2="10" />
                  </Svg>
                </View>
                <View style={styles.eventoInfo}>
                  <Text style={styles.eventoLbl}>Fecha del evento</Text>
                  <Text style={styles.eventoVal}>{aviso.evento.fecha}</Text>
                  <Text style={styles.eventoLbl}>{aviso.evento.horario}</Text>
                </View>
                <TouchableOpacity style={styles.btnAgendaSm}>
                  <Text style={styles.btnAgendaSmTxt}>+ Agenda</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {materiales.length > 0 && (
            <View style={styles.materialesSection}>
              <Text style={styles.materialesTitulo}>Qué debe traer</Text>
              {materiales.map((mat: any) => (
                <TouchableOpacity
                  key={mat.id}
                  style={styles.matItem}
                  onPress={() => toggleMaterial(mat.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[styles.matCheck, mat.hecho && styles.matCheckOn]}
                  >
                    {mat.hecho && (
                      <Svg
                        width={15}
                        height={15}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="3"
                      >
                        <Polyline points="20 6 9 17 4 12" />
                      </Svg>
                    )}
                  </View>
                  <Text
                    style={[styles.matLbl, mat.hecho && styles.matLblHecho]}
                  >
                    {mat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.avisoFooter}>
            <TouchableOpacity
              style={[styles.btnConfirmar, leido && styles.btnConfirmado]}
              onPress={() => setLeido(true)}
              activeOpacity={0.85}
            >
              {leido && (
                <Svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3A7A18"
                  strokeWidth="2.5"
                >
                  <Polyline points="20 6 9 17 4 12" />
                </Svg>
              )}
              <Text
                style={[
                  styles.btnConfirmarTxt,
                  leido && styles.btnConfirmadoTxt
                ]}
              >
                {leido ? "Leído y confirmado" : "Confirmar lectura"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {aviso.adjuntos.length > 0 && (
          <>
            <Text style={styles.sep}>Adjuntos</Text>
            <View style={styles.adjuntosCard}>
              {aviso.adjuntos.map((adj: any, index: number, arr: any[]) => (
                <TouchableOpacity
                  key={adj.nombre}
                  style={[
                    styles.adjItem,
                    index === arr.length - 1 && styles.adjItemLast
                  ]}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.adjIcono,
                      {
                        backgroundColor:
                          adj.tipo === "pdf"
                            ? colors.rojoLight
                            : colors.halconesLight
                      }
                    ]}
                  >
                    {adj.tipo === "pdf" ? (
                      <Svg
                        width={26}
                        height={26}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={colors.rojo}
                        strokeWidth="2"
                      >
                        <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <Polyline points="14 2 14 8 20 8" />
                      </Svg>
                    ) : (
                      <Svg
                        width={26}
                        height={26}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={colors.halcones}
                        strokeWidth="2"
                      >
                        <Rect x="3" y="3" width="18" height="18" rx="2" />
                        <Circle cx="8.5" cy="8.5" r="1.5" />
                        <Polyline points="21 15 16 10 5 21" />
                      </Svg>
                    )}
                  </View>
                  <View style={styles.adjInfo}>
                    <Text style={styles.adjNombre}>{adj.nombre}</Text>
                    <Text style={styles.adjSize}>{adj.size}</Text>
                  </View>
                  <Text style={styles.adjAbrir}>Abrir</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {aviso.total > 1 && (
          <>
            <Text style={styles.sep}>Confirmaciones del salón</Text>
            <View style={styles.confirmCard}>
              <Text style={styles.confirmTitulo}>
                {aviso.confirmados} de {aviso.total} familias confirmaron
                lectura
              </Text>
              <View style={styles.barraWrap}>
                <View style={[styles.barra, { width: `${porcentaje}%` }]} />
              </View>
              <View style={styles.confirmNums}>
                <Text style={styles.confirmOk}>
                  ✓ {aviso.confirmados} confirmados
                </Text>
                <Text style={styles.confirmPend}>
                  {aviso.total - aviso.confirmados} pendientes
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.fondo },

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
    fontSize: 22,
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
  scrollContent: { padding: spacing.md, gap: 8, paddingBottom: 30 },

  avisoCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    overflow: "hidden"
  },
  avisoTop: {
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F5F5F5",
    gap: 6
  },
  avisoMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: radii.pill,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2
  },
  tagTxt: { fontFamily: fonts.fontBlack, fontSize: 14 },
  tiempo: { fontFamily: fonts.fontSemibold, fontSize: 14, color: "#C0C0C0" },
  avisoTitulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 20,
    color: colors.texto,
    lineHeight: 30
  },
  maestraRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4
  },
  maestraAvatar: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: colors.halconesLight,
    borderWidth: 1.5,
    borderColor: colors.halcones,
    alignItems: "center",
    justifyContent: "center"
  },
  maestraAvatarTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 18,
    color: colors.halconesS
  },
  maestraNombre: { fontFamily: fonts.fontBold, fontSize: 16, color: "#888" },

  avisoBody: {
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F5F5F5"
  },
  avisoTexto: {
    fontFamily: fonts.fontSemibold,
    fontSize: 18,
    color: "#444",
    lineHeight: 20
  },

  eventoBloque: {
    marginTop: 12,
    backgroundColor: colors.lightAmarillo,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.primarioAmarillo,
    borderStyle: "dashed",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  eventoIcono: {
    width: 44,
    height: 44,
    backgroundColor: colors.primarioAmarillo,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.secundarioAmarillo,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
    flexShrink: 0
  },
  eventoInfo: { flex: 1 },
  eventoLbl: { fontFamily: fonts.fontBold, fontSize: 12, color: "#AAA" },
  eventoVal: {
    fontFamily: fonts.fontBlack,
    fontSize: 16,
    color: colors.texto,
    lineHeight: 18
  },
  btnAgendaSm: {
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
  btnAgendaSmTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 12,
    color: "#5A4800"
  },

  materialesSection: {
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F5F5F5",
    gap: 6
  },
  materialesTitulo: {
    fontFamily: fonts.fontExtra,
    fontSize: 14,
    color: colors.texto,
    marginBottom: 4
  },
  matItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4
  },
  matCheck: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center"
  },
  matCheckOn: { backgroundColor: colors.verde, borderColor: colors.verde },
  matLbl: { fontFamily: fonts.fontBold, fontSize: 14, color: "#444" },
  matLblHecho: { color: "#C0C0C0", textDecorationLine: "line-through" },

  avisoFooter: { padding: 12 },
  btnConfirmar: {
    backgroundColor: colors.primarioAmarillo,
    paddingVertical: 12,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    shadowColor: colors.secundarioAmarillo,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3
  },
  btnConfirmado: {
    backgroundColor: "#F0FAF0",
    borderWidth: 1.5,
    borderColor: colors.verde,
    shadowOpacity: 0,
    elevation: 0
  },
  btnConfirmarTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 18,
    color: "#5A4800"
  },
  btnConfirmadoTxt: { color: "#3A7A18" },

  sep: {
    fontFamily: fonts.fontExtra,
    fontSize: 11,
    color: "#C0C0C0",
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingHorizontal: 2,
    marginTop: 4
  },

  adjuntosCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    overflow: "hidden"
  },
  adjItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F5F5F5"
  },
  adjItemLast: { borderBottomWidth: 0 },
  adjIcono: {
    width: 54,
    height: 54,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  adjInfo: { flex: 1 },
  adjNombre: { fontFamily: fonts.fontExtra, fontSize: 14, color: colors.texto },
  adjSize: { fontFamily: fonts.fontSemibold, fontSize: 11, color: "#AAA" },
  adjAbrir: {
    fontFamily: fonts.fontExtra,
    fontSize: 14,
    color: colors.halcones
  },

  confirmCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 14,
    gap: 6
  },
  confirmTitulo: {
    fontFamily: fonts.fontExtra,
    fontSize: 14,
    color: colors.texto
  },
  barraWrap: {
    height: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    overflow: "hidden"
  },
  barra: { height: "100%", backgroundColor: colors.verde, borderRadius: 4 },
  confirmNums: { flexDirection: "row", justifyContent: "space-between" },
  confirmOk: { fontFamily: fonts.fontBlack, fontSize: 13, color: "#3A7A18" },
  confirmPend: { fontFamily: fonts.fontSemibold, fontSize: 12, color: "#AAA" }
});
