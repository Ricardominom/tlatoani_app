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
import {
    colors,
    fonts,
    grupoColors,
    radii,
    spacing
} from "../../styles/global";

const HIJOS = [
  {
    id: "victoria",
    nombre: "Victoria",
    salon: "abejas",
    colegiatura: {
      monto: 3200,
      pendiente: {
        mes: "Mayo 2025",
        vence: "viernes 16 de mayo · 2025",
        diasRestantes: 3
      },
      resumen: {
        pagados: 8,
        total: 10,
        totalPagado: 25600,
        saldoPendiente: 6400
      },
      historial: [
        {
          mes: "Abril 2025",
          fecha: "Pagado el 10 abr · sin recargo",
          monto: 3200,
          status: "pagado"
        },
        {
          mes: "Mayo 2025",
          fecha: "Vence 16 may · 3 días",
          monto: 3200,
          status: "pendiente"
        },
        {
          mes: "Junio 2025",
          fecha: "Vence 16 jun",
          monto: 3200,
          status: "proximo"
        },
        {
          mes: "Marzo 2025",
          fecha: "Pagado el 8 mar · sin recargo",
          monto: 3200,
          status: "pagado"
        },
        {
          mes: "Febrero 2025",
          fecha: "Pagado el 5 feb · sin recargo",
          monto: 3200,
          status: "pagado"
        },
        {
          mes: "Enero 2025",
          fecha: "Pagado el 8 ene · sin recargo",
          monto: 3200,
          status: "pagado"
        }
      ]
    }
  },
  {
    id: "diego",
    nombre: "Diego",
    salon: "halcones",
    colegiatura: {
      monto: 3200,
      pendiente: null,
      resumen: {
        pagados: 10,
        total: 10,
        totalPagado: 32000,
        saldoPendiente: 0
      },
      historial: [
        {
          mes: "Mayo 2025",
          fecha: "Pagado el 5 may · sin recargo",
          monto: 3200,
          status: "pagado"
        },
        {
          mes: "Abril 2025",
          fecha: "Pagado el 8 abr · sin recargo",
          monto: 3200,
          status: "pagado"
        },
        {
          mes: "Marzo 2025",
          fecha: "Pagado el 6 mar · sin recargo",
          monto: 3200,
          status: "pagado"
        },
        {
          mes: "Febrero 2025",
          fecha: "Pagado el 4 feb · sin recargo",
          monto: 3200,
          status: "pagado"
        }
      ]
    }
  }
];

function StatusBadge({ status }: { status: string }) {
  const config = {
    pagado: { bg: "#F0FAF0", color: "#3A7A18", label: "Pagado" },
    pendiente: { bg: colors.rojoLight, color: "#C62828", label: "Pendiente" },
    proximo: {
      bg: colors.lightAmarillo,
      color: colors.secundarioAmarillo,
      label: "Próximo"
    }
  }[status] ?? { bg: "#F5F5F5", color: "#888", label: status };

  return (
    <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
      <Text style={[styles.statusTxt, { color: config.color }]}>
        {config.label}
      </Text>
    </View>
  );
}

function AnimalIconSm({ salon, activo }: { salon: string; activo: boolean }) {
  const color = activo ? "#5A4800" : "#999";
  switch (salon) {
    case "abejas":
      return (
        <Svg width={10} height={10} viewBox="0 0 48 48" fill="none">
          <Ellipse cx="24" cy="34" rx="9" ry="12" fill={color} opacity="0.4" />
          <Ellipse cx="24" cy="14" rx="6" ry="7" fill={color} opacity="0.4" />
          <Ellipse cx="10" cy="20" rx="5" ry="3" fill={color} opacity="0.3" />
        </Svg>
      );
    case "halcones":
      return (
        <Svg width={10} height={10} viewBox="0 0 48 48" fill="none">
          <Path
            d="M8 22 Q18 10 38 8 Q30 16 24 20Z"
            fill={activo ? "#5A4800" : "#999"}
            opacity="0.5"
          />
          <Ellipse
            cx="24"
            cy="30"
            rx="7"
            ry="9"
            fill={activo ? "#5A4800" : "#999"}
            opacity="0.4"
          />
        </Svg>
      );
    default:
      return null;
  }
}

export default function Colegiatura() {
  const router = useRouter();
  const [hijoActivo, setHijoActivo] = useState(HIJOS[0].id);
  const hijo = HIJOS.find((h) => h.id === hijoActivo)!;
  const col = hijo.colegiatura;
  const colores = grupoColors[hijo.salon as keyof typeof grupoColors];
  const tienePendiente = col.pendiente !== null;

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.texto}
              strokeWidth="2.5"
            >
              <Polyline points="15 18 9 12 15 6" />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.headerTitulo}>Colegiatura</Text>
          <View style={{ width: 30 }} />
        </View>

        <View style={styles.hijosTabs}>
          {HIJOS.map((h) => {
            const activo = hijoActivo === h.id;
            const col = grupoColors[h.salon as keyof typeof grupoColors];
            return (
              <TouchableOpacity
                key={h.id}
                style={[
                  styles.hijoTab,
                  activo
                    ? {
                        backgroundColor: col.base,
                        shadowColor: col.dark,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 1,
                        shadowRadius: 0,
                        elevation: 2
                      }
                    : styles.hijoTabOff
                ]}
                onPress={() => setHijoActivo(h.id)}
                activeOpacity={0.8}
              >
                <AnimalIconSm salon={h.salon} activo={activo} />
                <Text
                  style={[
                    styles.hijoTabTxt,
                    { color: activo ? col.textColor : "#999" }
                  ]}
                >
                  {h.nombre}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {tienePendiente ? (
          <View style={styles.alertaCard}>
            <View style={styles.alertaTop}>
              <View style={styles.alertaBadge}>
                <Svg
                  width={10}
                  height={10}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.2"
                >
                  <Circle cx="12" cy="12" r="10" />
                  <Line x1="12" y1="8" x2="12" y2="12" />
                  <Line x1="12" y1="16" x2="12.01" y2="16" />
                </Svg>
                <Text style={styles.alertaBadgeTxt}>Pago pendiente</Text>
              </View>
              <View style={styles.alertaCountdown}>
                <Text style={styles.alertaNum}>
                  {col.pendiente!.diasRestantes}
                </Text>
                <Text style={styles.alertaLbl}>días</Text>
              </View>
            </View>

            <Text style={styles.alertaMonto}>
              $
              {col.pendiente!.diasRestantes > 0
                ? col.monto.toLocaleString()
                : col.monto.toLocaleString()}
            </Text>
            <Text style={styles.alertaMonto}>
              ${col.monto.toLocaleString()}
            </Text>
            <Text style={styles.alertaConcepto}>{col.pendiente!.mes}</Text>
            <View style={styles.alertaFechaWrap}>
              <Text style={styles.alertaFecha}>
                Vence el {col.pendiente!.vence}
              </Text>
            </View>

            <TouchableOpacity style={styles.btnPagar} activeOpacity={0.85}>
              <Svg
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.2"
              >
                <Rect x="1" y="4" width="22" height="16" rx="2" />
                <Line x1="1" y1="10" x2="23" y2="10" />
              </Svg>
              <Text style={styles.btnPagarTxt}>Pagar ahora</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnWhatsapp} activeOpacity={0.85}>
              <Svg
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.texto}
                strokeWidth="2.2"
              >
                <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </Svg>
              <Text style={styles.btnWhatsappTxt}>Avisar que ya pagué</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.alCorreienteCard}>
            <Svg
              width={36}
              height={36}
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.hormigas}
              strokeWidth="2"
            >
              <Circle cx="12" cy="12" r="10" />
              <Polyline points="20 6 9 17 4 12" />
            </Svg>
            <Text style={styles.alCorrirenteTitulo}>¡Al corriente!</Text>
            <Text style={styles.alCorrienteDesc}>
              Todos los pagos de {hijo.nombre} están al día.
            </Text>
          </View>
        )}

        <Text style={styles.sep}>Resumen del ciclo</Text>
        <View style={styles.resumenCard}>
          {[
            {
              label: "Meses pagados",
              val: `${col.resumen.pagados} de ${col.resumen.total} ✓`,
              ok: true
            },
            {
              label: "Meses pendientes",
              val: `${col.resumen.total - col.resumen.pagados} meses`,
              err: col.resumen.total - col.resumen.pagados > 0
            },
            {
              label: "Total pagado",
              val: `$${col.resumen.totalPagado.toLocaleString()}`
            },
            {
              label: "Saldo pendiente",
              val: `$${col.resumen.saldoPendiente.toLocaleString()}`,
              err: col.resumen.saldoPendiente > 0
            }
          ].map((item, index, arr) => (
            <View
              key={item.label}
              style={[
                styles.resumenRow,
                index === arr.length - 1 && styles.resumenRowLast
              ]}
            >
              <Text style={styles.resumenLabel}>{item.label}</Text>
              <Text
                style={[
                  styles.resumenVal,
                  item.ok && styles.resumenValOk,
                  item.err && styles.resumenValErr
                ]}
              >
                {item.val}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.sep}>Historial de pagos</Text>
        <View style={styles.historialCard}>
          {col.historial.map((pago, index, arr) => (
            <View
              key={pago.mes}
              style={[
                styles.pagoItem,
                index === arr.length - 1 && styles.pagoItemLast
              ]}
            >
              <View style={styles.pagoLeft}>
                <Text style={styles.pagoMes}>{pago.mes}</Text>
                <Text style={styles.pagoFecha}>{pago.fecha}</Text>
              </View>
              <View style={styles.pagoRight}>
                <Text style={styles.pagoMonto}>
                  ${pago.monto.toLocaleString()}
                </Text>
                <StatusBadge status={pago.status} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.fondo },

  header: {
    backgroundColor: colors.card,
    paddingTop: 56,
    paddingBottom: 14,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
    gap: 12
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  backBtn: {
    width: 30,
    height: 30,
    borderRadius: 999,
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 16,
    color: colors.texto
  },

  hijosTabs: { flexDirection: "row", gap: 8 },
  hijoTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: radii.pill
  },
  hijoTabOff: { backgroundColor: "#F0F0F0" },
  hijoTabTxt: { fontFamily: fonts.fontBlack, fontSize: 10 },

  scroll: { flex: 1 },
  scrollContent: { padding: spacing.md, gap: 8, paddingBottom: 30 },

  alertaCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.rojo,
    shadowColor: colors.rojoS,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    padding: 16,
    gap: 8
  },
  alertaTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  alertaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
  alertaBadgeTxt: { fontFamily: fonts.fontBlack, fontSize: 10, color: "#fff" },
  alertaCountdown: { alignItems: "flex-end" },
  alertaNum: {
    fontFamily: fonts.fontBlack,
    fontSize: 20,
    color: colors.rojo,
    lineHeight: 22
  },
  alertaLbl: { fontFamily: fonts.fontBold, fontSize: 9, color: "#C0C0C0" },
  alertaMonto: {
    fontFamily: fonts.fontBlack,
    fontSize: 32,
    color: colors.texto,
    textAlign: "center",
    letterSpacing: -1
  },
  alertaConcepto: {
    fontFamily: fonts.fontBold,
    fontSize: 12,
    color: "#888",
    textAlign: "center"
  },
  alertaFechaWrap: {
    backgroundColor: colors.rojoLight,
    borderRadius: radii.sm,
    padding: 8
  },
  alertaFecha: {
    fontFamily: fonts.fontExtra,
    fontSize: 11,
    color: colors.rojo,
    textAlign: "center"
  },
  btnPagar: {
    backgroundColor: colors.rojo,
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    shadowColor: colors.rojoS,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4
  },
  btnPagarTxt: { fontFamily: fonts.fontBlack, fontSize: 15, color: "#fff" },
  btnWhatsapp: {
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    borderWidth: 2,
    borderColor: colors.texto,
    shadowColor: "#888",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3
  },
  btnWhatsappTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 13,
    color: colors.texto
  },

  alCorreienteCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.hormigas,
    shadowColor: colors.hormigasS,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    padding: 24,
    alignItems: "center",
    gap: 8
  },
  alCorrirenteTitulo: {
    fontFamily: fonts.fontBlack,
    fontSize: 20,
    color: colors.texto
  },
  alCorrienteDesc: {
    fontFamily: fonts.fontSemibold,
    fontSize: 13,
    color: colors.texto2,
    textAlign: "center"
  },

  sep: {
    fontFamily: fonts.fontExtra,
    fontSize: 9,
    color: "#C0C0C0",
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingHorizontal: 2,
    marginTop: 4
  },

  resumenCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 14
  },
  resumenRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F5F5F5"
  },
  resumenRowLast: { borderBottomWidth: 0 },
  resumenLabel: { fontFamily: fonts.fontBold, fontSize: 11, color: "#666" },
  resumenVal: {
    fontFamily: fonts.fontBlack,
    fontSize: 12,
    color: colors.texto
  },
  resumenValOk: { color: colors.hormigas },
  resumenValErr: { color: colors.rojo },

  historialCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 14
  },
  pagoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F5F5F5"
  },
  pagoItemLast: { borderBottomWidth: 0 },
  pagoLeft: { gap: 2 },
  pagoMes: { fontFamily: fonts.fontExtra, fontSize: 12, color: colors.texto },
  pagoFecha: { fontFamily: fonts.fontSemibold, fontSize: 9, color: "#AAA" },
  pagoRight: { alignItems: "flex-end", gap: 3 },
  pagoMonto: { fontFamily: fonts.fontBlack, fontSize: 12, color: colors.texto },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: radii.sm
  },
  statusTxt: { fontFamily: fonts.fontBlack, fontSize: 9 }
});
