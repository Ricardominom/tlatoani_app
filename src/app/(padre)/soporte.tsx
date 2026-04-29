import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Svg, { Circle, Line, Path, Polyline } from "react-native-svg";
import { colors, fonts, radii, spacing } from "../../styles/global";

const FAQS = [
  {
    id: "1",
    pregunta: "¿Cómo veo las actividades de mi hijo?",
    respuesta:
      'Desde la pantalla principal toca el nombre de tu hijo y selecciona "Bitácora". Ahí encontrarás todas las observaciones de la maestra organizadas por área Montessori.'
  },
  {
    id: "2",
    pregunta: "¿Cómo contacto a la maestra?",
    respuesta:
      'Entra al detalle de tu hijo y toca el botón "Conversar con la maestra". También puedes acceder desde el ícono de mensajes en la pantalla principal.'
  },
  {
    id: "3",
    pregunta: "¿Dónde veo el menú de comida compartida?",
    respuesta:
      'En el menú inferior selecciona "Comida". Ahí verás el calendario del mes con las familias asignadas y el menú sugerido para cada semana.'
  },
  {
    id: "4",
    pregunta: "¿Cómo actualizo mis datos personales?",
    respuesta:
      'Ve a "Mi perfil" en el menú inferior y selecciona "Editar datos personales". Los cambios serán revisados por la administración antes de aplicarse.'
  },
  {
    id: "5",
    pregunta: "¿Qué pasa si olvidé mi contraseña?",
    respuesta:
      'En la pantalla de inicio de sesión toca "¿Olvidaste tu contraseña?" e ingresa tu correo registrado. Recibirás un enlace para restablecerla.'
  },
  {
    id: "6",
    pregunta: "¿Cómo veo los avisos del colegio?",
    respuesta:
      'Los avisos importantes aparecen en la pantalla principal. También puedes ver el historial completo en la sección "Avisos" del menú inferior.'
  }
];

export default function Soporte() {
  const router = useRouter();
  const [abierto, setAbierto] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setAbierto((prev) => (prev === id ? null : id));
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Svg
            width={25}
            height={25}
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.texto}
            strokeWidth="2.5"
          >
            <Path d="M19 12H5" />
            <Path d="M12 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.titulo}>Soporte y ayuda</Text>
        <View style={{ width: 38 }} />
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSec}>
          <View style={styles.heroCircle}>
            <Svg
              width={54}
              height={54}
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.texto}
              strokeWidth="1.8"
            >
              <Circle cx="12" cy="12" r="10" />
              <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <Line
                x1="12"
                y1="17"
                x2="12.01"
                y2="17"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </Svg>
          </View>
          <Text style={styles.heroTitulo}>¿En qué podemos ayudarte?</Text>
          <Text style={styles.heroSub}>
            Encuentra respuestas rápidas o contáctanos directamente.
          </Text>
        </View>

        <Text style={styles.sep}>Preguntas frecuentes</Text>
        <View style={styles.faqCard}>
          {FAQS.map((faq, index) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              abierto={abierto === faq.id}
              onToggle={() => toggleFaq(faq.id)}
              isLast={index === FAQS.length - 1}
            />
          ))}
        </View>

        <Text style={styles.sep}>Contacto directo</Text>
        <View style={styles.contactCard}>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => Linking.openURL("mailto:soporte@tlatoani.mx")}
            activeOpacity={0.7}
          >
            <View style={[styles.contactIcono, { backgroundColor: "#EEF4FF" }]}>
              <Svg
                width={28}
                height={28}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3B6FD4"
                strokeWidth="2"
              >
                <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <Polyline points="22,6 12,13 2,6" />
              </Svg>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLbl}>Correo electrónico</Text>
              <Text style={styles.contactVal}>soporte@tlatoani.mx</Text>
            </View>
            <Svg
              width={28}
              height={28}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D0D0D0"
              strokeWidth="2.5"
            >
              <Polyline points="9 18 15 12 9 6" />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.contactItem, styles.contactItemLast]}
            onPress={() => Linking.openURL("https://wa.me/522223456789")}
            activeOpacity={0.7}
          >
            <View style={[styles.contactIcono, { backgroundColor: "#F0FAF0" }]}>
              <Svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3A7A18"
                strokeWidth="2"
              >
                <Path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1
  3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                />
              </Svg>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLbl}>WhatsApp</Text>
              <Text style={styles.contactVal}>222 345 6789</Text>
            </View>
            <Svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D0D0D0"
              strokeWidth="2.5"
            >
              <Polyline points="9 18 15 12 9 6" />
            </Svg>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>
          Tlatoani App · v1.0.0 · soporte@tlatoani.mx
        </Text>
      </ScrollView>
    </View>
  );
}
interface FaqItemProps {
  faq: { id: string; pregunta: string; respuesta: string };
  abierto: boolean;
  onToggle: () => void;
  isLast: boolean;
}

function FaqItem({ faq, abierto, onToggle, isLast }: FaqItemProps) {
  return (
    <View style={[styles.faqItem, isLast && styles.faqItemLast]}>
      <TouchableOpacity
        style={styles.faqPregunta}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Text
          style={[styles.faqPreguntaTxt, abierto && styles.faqPreguntaAbierta]}
        >
          {faq.pregunta}
        </Text>
        <Svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke={abierto ? colors.texto : "#C0C0C0"}
          strokeWidth="2.5"
          style={{ transform: [{ rotate: abierto ? "180deg" : "0deg" }] }}
        >
          <Polyline points="6 9 12 15 18 9" />
        </Svg>
      </TouchableOpacity>
      {abierto && <Text style={styles.faqRespuesta}>{faq.respuesta}</Text>}
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
    gap: 10
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
  titulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 22,
    color: colors.texto,
    flex: 1
  },
  scroll: { flex: 1 },
  scrollContent: {
    padding: spacing.md,
    gap: 10,
    paddingBottom: 40
  },
  heroSec: {
    alignItems: "center",
    paddingVertical: 12,
    gap: 8
  },
  heroCircle: {
    width: 100,
    height: 100,
    borderRadius: 999,
    backgroundColor: colors.card,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2
  },
  heroTitulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 22,
    color: colors.texto,
    textAlign: "center"
  },
  heroSub: {
    fontFamily: fonts.fontSemibold,
    fontSize: 16,
    color: "#AAA",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 16
  },
  sep: {
    fontFamily: fonts.fontExtra,
    fontSize: 13,
    color: "#C0C0C0",
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingHorizontal: 2,
    marginTop: 4
  },
  faqCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    overflow: "hidden"
  },
  faqItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0"
  },
  faqItemLast: { borderBottomWidth: 0 },
  faqPregunta: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 10
  },
  faqPreguntaTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 16,
    color: colors.texto,
    flex: 1,
    lineHeight: 20
  },
  faqPreguntaAbierta: { color: colors.texto },
  faqRespuesta: {
    fontFamily: fonts.fontSemibold,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    paddingHorizontal: 14,
    paddingBottom: 14
  },
  contactCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    overflow: "hidden"
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
    gap: 12
  },
  contactItemLast: { borderBottomWidth: 0 },
  contactIcono: {
    width: 60,
    height: 60,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  contactInfo: { flex: 1, gap: 2 },
  contactLbl: {
    fontFamily: fonts.fontExtra,
    fontSize: 16,
    color: colors.texto
  },
  contactVal: {
    fontFamily: fonts.fontSemibold,
    fontSize: 14,
    color: "#AAA"
  },
  version: {
    fontFamily: fonts.fontSemibold,
    fontSize: 10,
    color: "#C0C0C0",
    textAlign: "center",
    paddingVertical: 8
  }
});
