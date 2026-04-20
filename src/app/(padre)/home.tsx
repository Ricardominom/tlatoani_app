import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FeedCard from "../../components/ui/FeedCard";
import FiltrosHijos from "../../components/ui/FiltrosHijos";
import HeaderHome from "../../components/ui/HeaderHome";
import TabBar from "../../components/ui/TabBar";
import { fonts } from "../../styles/global";

const HIJOS = [
  { id: "sofia", nombre: "Sofía", salon: "abejas" },
  { id: "diego", nombre: "Diego", salon: "halcones" }
];

const CARDS = [
  {
    id: "1",
    seccion: "Hoy",
    tipo: "colegiatura" as const,
    tag: { label: "Colegiatura", tipo: "alerta" as const },
    titulo: "Recordatorio de pago",
    cuerpo:
      "Tu colegiatura vence en 3 días. Evita recargos pagando antes del viernes.",
    tiempo: "Hace 1h",
    leido: false,
    acento: "rojo" as const
  },
  {
    id: "2",
    seccion: "Hoy",
    tipo: "aviso" as const,
    tag: { label: "Sofía · Abejas", tipo: "abejas" as const },
    titulo: "Visita al jardín botánico",
    cuerpo:
      "El martes saldremos a las 9am. Llevar lunch, agua y zapatos cómodos.",
    tiempo: "Hace 2h",
    leido: false,
    acento: "amarillo" as const,
    conAgenda: true
  },
  {
    id: "3",
    seccion: "Hoy",
    tipo: "comida" as const,
    tag: { label: "Diego · Halcones", tipo: "halcones" as const },
    titulo: "Menú compartido — octubre",
    cuerpo: "Ya está disponible el calendario de comida de este mes.",
    tiempo: "Hace 3h",
    leido: false,
    acento: "rosa" as const,
    comidaInfo: { texto: "Diego: pasta boloñesa para 20", fecha: "Jue 17 oct" },
    conAgenda: true
  },
  {
    id: "4",
    seccion: "Ayer",
    tipo: "bitacora" as const,
    tag: { label: "Sofía · Abejas", tipo: "abejas" as const },
    titulo: "Observación de la maestra",
    cuerpo: "Sofía completó sola el trabajo de letras móviles por primera vez.",
    tiempo: "Ayer 4:30pm",
    leido: true,
    acento: "ninguno" as const
  },
  {
    id: "5",
    seccion: "Ayer",
    tipo: "general" as const,
    tag: { label: "Escuela general", tipo: "general" as const },
    titulo: "Suspensión de clases — 25 oct",
    cuerpo: "No habrá clases por día del maestro. Reanudan el lunes 28.",
    tiempo: "Ayer 11am",
    leido: true,
    acento: "ninguno" as const,
    conAgenda: true
  }
];

export default function Home() {
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [tabActivo, setTabActivo] = useState("inicio");

  const cardsFiltradas = CARDS.filter((card) => {
    if (filtroActivo === "todos") return true;
    if (filtroActivo === "escuela") return card.tag.tipo === "general";
    if (filtroActivo === "sofia") return card.tag.tipo === "abejas";
    if (filtroActivo === "diego") return card.tag.tipo === "halcones";
    return true;
  });

  const secciones = cardsFiltradas.reduce(
    (acc, card) => {
      if (!acc[card.seccion]) acc[card.seccion] = [];
      acc[card.seccion].push(card);
      return acc;
    },
    {} as Record<string, typeof CARDS>
  );

  return (
    <View style={styles.root}>
      <HeaderHome
        nombreFamilia="Familia Ramírez"
        tieneNotificaciones={true}
        onNotifPress={() => console.log("notificaciones")}
      />

      <FiltrosHijos
        hijos={HIJOS}
        filtroActivo={filtroActivo}
        onFiltroPress={setFiltroActivo}
      />

      <ScrollView
        style={styles.feed}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(secciones).map(([seccion, cards]) => (
          <View key={seccion}>
            <Text style={styles.sep}>{seccion}</Text>

            {cards.map((card) => (
              <FeedCard
                key={card.id}
                tipo={card.tipo}
                tag={card.tag}
                titulo={card.titulo}
                cuerpo={card.cuerpo}
                tiempo={card.tiempo}
                leido={card.leido}
                acento={card.acento}
                comidaInfo={card.comidaInfo}
                onPress={() => console.log("card", card.id)}
                onConfirmar={
                  card.tipo === "aviso"
                    ? () => console.log("confirmar", card.id)
                    : undefined
                }
                onVerCuenta={
                  card.tipo === "colegiatura"
                    ? () => console.log("ver cuenta")
                    : undefined
                }
                onAgenda={
                  "conAgenda" in card && card.conAgenda
                    ? () => console.log("agenda", card.id)
                    : undefined
                }
              />
            ))}
          </View>
        ))}
      </ScrollView>

      <TabBar tabActivo={tabActivo} onTabPress={setTabActivo} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F2"
  },
  feed: {
    flex: 1
  },
  feedContent: {
    padding: 10,
    gap: 8,
    paddingBottom: 20
  },
  sep: {
    fontFamily: fonts.fontExtra,
    fontSize: 9,
    color: "#C0C0C0",
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});
