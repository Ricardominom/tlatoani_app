import { usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";
import { colors, fonts } from "../../styles/global";

// ---------- Inicio ----------

const IconoInicioInactivo = () => (
  <Svg width={32} height={32} viewBox="0 0 96 96" fill="none">
    <Defs>
      <LinearGradient id="yellow" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#FFD85A" />
        <Stop offset="1" stopColor="#F1A91F" />
      </LinearGradient>
      <LinearGradient id="blue" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#56B8D1" />
        <Stop offset="1" stopColor="#1684A3" />
      </LinearGradient>
    </Defs>
    <Path d="M18 49 48 23l30 26v26H18Z" fill="#FFFDF6" />
    <Path
      d="M15 49 48 20l33 29"
      fill="none"
      stroke="url(#yellow)"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect x="38" y="54" width="20" height="26" rx="8" fill="url(#blue)" />
    <Rect x="67" y="55" width="9" height="15" rx="4.5" fill="#E7B04C" />
    <Path d="M68 76c7-10 15-8 16-1-1 8-11 11-19 7" fill="#7EBE5B" />
    <Ellipse cx="43" cy="68" rx="2" ry="2.4" fill="#D6E7E9" />
  </Svg>
);

const IconoInicioActivo = () => (
  <Svg width={40} height={40} viewBox="0 0 96 96" fill="none">
    <Defs>
      <LinearGradient id="yellow" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#FFE46B" />
        <Stop offset="1" stopColor="#F5A900" />
      </LinearGradient>
      <LinearGradient id="blue" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#67C8DF" />
        <Stop offset="1" stopColor="#0D86A8" />
      </LinearGradient>
    </Defs>
    <Path d="M18 49 48 23l30 26v26H18Z" fill="#FFFDF3" />
    <Path
      d="M15 49 48 20l33 29"
      fill="none"
      stroke="url(#yellow)"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect x="37" y="53" width="22" height="27" rx="8" fill="url(#blue)" />
    <Ellipse cx="43" cy="68" rx="2" ry="2.4" fill="#EAF6F7" />
    <Path d="M68 76c7-10 15-8 16-1-1 8-11 11-19 7" fill="#82CB5A" />
    <Path
      d="M72 25v-8M68 21h8"
      stroke="#FFD85A"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <Path d="M24 73c-5-4-8-2-8 2 1 4 6 5 10 2" fill="#74BE50" />
  </Svg>
);

// ---------- Comida ----------

const IconoComidaInactivo = () => (
  <Svg width={32} height={32} viewBox="0 0 96 96" fill="none">
    <Defs>
      <LinearGradient id="yellow" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#FFD85A" />
        <Stop offset="1" stopColor="#F1A91F" />
      </LinearGradient>
    </Defs>
    <Path d="M20 45h56v12c0 18-12 28-28 28S20 75 20 57Z" fill="url(#yellow)" />
    <Ellipse cx="48" cy="46" rx="29" ry="11" fill="#FFF8E4" />
    <Ellipse cx="34" cy="44" rx="6" ry="4" fill="#F2C64D" />
    <Ellipse cx="47" cy="40" rx="7" ry="5" fill="#F9D76D" />
    <Ellipse cx="60" cy="45" rx="5" ry="4" fill="#E8B535" />
    <Circle cx="38" cy="63" r="3" fill="#554B43" />
    <Circle cx="58" cy="63" r="3" fill="#554B43" />
    <Path
      d="M40 70c5 5 11 5 16 0"
      fill="none"
      stroke="#554B43"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <Circle cx="30" cy="68" r="4" fill="#F48B95" />
    <Circle cx="66" cy="68" r="4" fill="#F48B95" />
    <Path d="M52 38c2-14 11-20 17-16 4 4 0 13-8 18" fill="#63A949" />
    <Path d="M57 40c8-10 16-11 19-5 1 5-6 10-14 10" fill="#89C95B" />
  </Svg>
);

const IconoComidaActivo = () => (
  <Svg width={40} height={40} viewBox="0 0 96 96" fill="none">
    <Defs>
      <LinearGradient id="yellow" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#FFE46B" />
        <Stop offset="1" stopColor="#F5A900" />
      </LinearGradient>
    </Defs>
    <Path d="M20 45h56v12c0 18-12 28-28 28S20 75 20 57Z" fill="url(#yellow)" />
    <Ellipse cx="48" cy="46" rx="29" ry="11" fill="#FFF9DF" />
    <Ellipse cx="34" cy="44" rx="6" ry="4" fill="#F2C64D" />
    <Ellipse cx="47" cy="40" rx="7" ry="5" fill="#F9D76D" />
    <Ellipse cx="60" cy="45" rx="5" ry="4" fill="#E8B535" />
    <Path
      d="M37 63c2-2 4-2 6 0M53 63c2-2 4-2 6 0"
      fill="none"
      stroke="#554B43"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Path
      d="M39 69c5 7 13 7 18 0"
      fill="none"
      stroke="#554B43"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <Circle cx="30" cy="68" r="4.5" fill="#F48B95" />
    <Circle cx="66" cy="68" r="4.5" fill="#F48B95" />
    <Path d="M52 38c2-14 11-20 17-16 4 4 0 13-8 18" fill="#63A949" />
    <Path d="M57 40c8-10 16-11 19-5 1 5-6 10-14 10" fill="#89C95B" />
    <Path
      d="M25 25c-2-8 4-11 7-5M42 23c0-8 6-9 8-3M61 25c2-7 7-7 9-2"
      fill="none"
      stroke="#F4B52E"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </Svg>
);

// ---------- Calendario ----------

const IconoCalendarioInactivo = () => (
  <Svg width={32} height={32} viewBox="0 0 96 96" fill="none">
    <Defs>
      <LinearGradient id="cyan" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#17C6CE" />
        <Stop offset="1" stopColor="#0E8EAC" />
      </LinearGradient>
    </Defs>
    <Rect
      x="18"
      y="20"
      width="60"
      height="60"
      rx="12"
      fill="#F6FFFF"
      stroke="#46AFC1"
      strokeWidth="4"
    />
    <Path d="M18 37h60" stroke="#46AFC1" strokeWidth="4" />
    <Path
      d="M31 14v15M65 14v15"
      stroke="url(#cyan)"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <Circle cx="32" cy="50" r="4" fill="#9ED8E2" />
    <Circle cx="48" cy="50" r="4" fill="#9ED8E2" />
    <Circle cx="64" cy="50" r="4" fill="#9ED8E2" />
    <Circle cx="32" cy="64" r="4" fill="#9ED8E2" />
    <Circle cx="48" cy="64" r="4" fill="#9ED8E2" />
    <Circle cx="64" cy="64" r="4" fill="#EF6B83" />
    <Path d="M65 77c7-4 11-8 11-14v12c0 3-3 5-11 2Z" fill="#7CC5D6" />
  </Svg>
);

const IconoCalendarioActivo = () => (
  <Svg width={40} height={40} viewBox="0 0 96 96" fill="none">
    <Defs>
      <LinearGradient id="cyan" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#20D4DC" />
        <Stop offset="1" stopColor="#078EAD" />
      </LinearGradient>
    </Defs>
    <Rect
      x="18"
      y="20"
      width="60"
      height="60"
      rx="12"
      fill="#F5FFFF"
      stroke="#2DB7C9"
      strokeWidth="4"
    />
    <Path d="M18 37h60" stroke="#2DB7C9" strokeWidth="4" />
    <Path
      d="M31 14v15M65 14v15"
      stroke="url(#cyan)"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <Circle cx="32" cy="50" r="4" fill="#9ED8E2" />
    <Circle cx="48" cy="50" r="4" fill="#9ED8E2" />
    <Circle cx="64" cy="50" r="6" fill="#F05B78" />
    <Path
      d="m61 50 2 2 4-5"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="32" cy="64" r="4" fill="#9ED8E2" />
    <Circle cx="48" cy="64" r="4" fill="#9ED8E2" />
    <Circle cx="64" cy="64" r="4" fill="#9ED8E2" />
    <Path d="M65 77c7-4 11-8 11-14v12c0 3-3 5-11 2Z" fill="#76C7D7" />
    <Path
      d="M79 20l6-6M82 28l8-1"
      stroke="#19C5D0"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </Svg>
);

// ---------- Mis hijos ----------

const IconoMisHijosInactivo = () => (
  <Svg width={32} height={32} viewBox="0 0 96 96" fill="none">
    <Defs>
      <LinearGradient id="green" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#88C85E" />
        <Stop offset="1" stopColor="#4EA84C" />
      </LinearGradient>
    </Defs>
    <Path
      d="M17 73c3-16 14-25 29-25 14 0 25 9 28 25-8 8-18 12-29 12S25 81 17 73Z"
      fill="url(#green)"
    />
    <Circle cx="37" cy="43" r="18" fill="#F4C4A4" />
    <Path
      d="M22 40c2-16 22-24 31-8-8 0-14-3-19-9-2 7-5 12-12 17Z"
      fill="#9B603F"
    />
    <Circle cx="32" cy="45" r="2.5" fill="#4B4038" />
    <Circle cx="42" cy="45" r="2.5" fill="#4B4038" />
    <Path
      d="M33 52c3 3 6 3 9 0"
      fill="none"
      stroke="#4B4038"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Circle cx="60" cy="46" r="16" fill="#F4C4A4" />
    <Path
      d="M47 42c4-13 20-18 28-6l-2 8c-9-1-15-4-20-9-1 3-3 5-6 7Z"
      fill="#4FAE91"
    />
    <Path d="M58 28c7-2 13 0 17 7-5 1-10 0-15-2Z" fill="#69C2A8" />
    <Circle cx="55" cy="48" r="2.3" fill="#4B4038" />
    <Circle cx="65" cy="48" r="2.3" fill="#4B4038" />
    <Path
      d="M56 55c3 3 6 3 9 0"
      fill="none"
      stroke="#4B4038"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Circle cx="25" cy="57" r="4" fill="#F29A82" />
    <Circle cx="72" cy="58" r="4" fill="#F29A82" />
  </Svg>
);

const IconoMisHijosActivo = () => (
  <Svg width={40} height={40} viewBox="0 0 96 96" fill="none">
    <Defs>
      <LinearGradient id="green" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#9ED86C" />
        <Stop offset="1" stopColor="#47A947" />
      </LinearGradient>
    </Defs>
    <Path
      d="M17 73c3-16 14-25 29-25 14 0 25 9 28 25-8 8-18 12-29 12S25 81 17 73Z"
      fill="url(#green)"
    />
    <Circle cx="37" cy="43" r="18" fill="#F4C4A4" />
    <Path
      d="M22 40c2-16 22-24 31-8-8 0-14-3-19-9-2 7-5 12-12 17Z"
      fill="#9B603F"
    />
    <Path
      d="M30 45c2-2 4-2 6 0M40 45c2-2 4-2 6 0"
      fill="none"
      stroke="#4B4038"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <Path
      d="M33 52c3 4 7 4 10 0"
      fill="none"
      stroke="#4B4038"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Circle cx="60" cy="46" r="16" fill="#F4C4A4" />
    <Path
      d="M47 42c4-13 20-18 28-6l-2 8c-9-1-15-4-20-9-1 3-3 5-6 7Z"
      fill="#4FAE91"
    />
    <Path d="M58 28c7-2 13 0 17 7-5 1-10 0-15-2Z" fill="#69C2A8" />
    <Path
      d="M53 48c2-2 4-2 6 0M62 48c2-2 4-2 6 0"
      fill="none"
      stroke="#4B4038"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <Path
      d="M56 55c3 4 7 4 10 0"
      fill="none"
      stroke="#4B4038"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Circle cx="25" cy="57" r="4" fill="#F29A82" />
    <Circle cx="72" cy="58" r="4" fill="#F29A82" />
    <Path
      d="M42 68c4-6 9-6 13 0"
      fill="none"
      stroke="#FFF4C9"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <Path d="M76 20c4-6 8-4 7 1-1 4-5 6-8 3" fill="#F37FA0" />
  </Svg>
);

// ---------- Galería ----------

const IconoGaleriaInactivo = () => (
  <Svg width={32} height={32} viewBox="0 0 96 96" fill="none">
    <Defs>
      <LinearGradient id="yellow" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#FFD85A" />
        <Stop offset="1" stopColor="#F1A91F" />
      </LinearGradient>
      <LinearGradient id="purple" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#B9A5F2" />
        <Stop offset="1" stopColor="#7658C9" />
      </LinearGradient>
    </Defs>
    <Rect
      x="32"
      y="18"
      width="48"
      height="54"
      rx="7"
      fill="url(#yellow)"
      transform="rotate(7 56 45)"
    />
    <Rect
      x="18"
      y="26"
      width="54"
      height="48"
      rx="8"
      fill="#F8F5FF"
      stroke="#B19BE7"
      strokeWidth="4"
    />
    <Circle cx="58" cy="39" r="6" fill="#FFD64D" />
    <Path d="M23 67 38 50l11 10 9-9 10 16Z" fill="url(#purple)" />
    <Path
      d="M27 31h38"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.7}
    />
  </Svg>
);

const IconoGaleriaActivo = () => (
  <Svg width={40} height={40} viewBox="0 0 96 96" fill="none">
    <Defs>
      <LinearGradient id="yellow" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#FFE46B" />
        <Stop offset="1" stopColor="#F5A900" />
      </LinearGradient>
      <LinearGradient id="purple" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#C5B5FA" />
        <Stop offset="1" stopColor="#7552CE" />
      </LinearGradient>
    </Defs>
    <Rect
      x="34"
      y="14"
      width="48"
      height="54"
      rx="7"
      fill="url(#yellow)"
      transform="rotate(9 58 41)"
    />
    <Rect
      x="18"
      y="26"
      width="54"
      height="48"
      rx="8"
      fill="#F8F5FF"
      stroke="#A58AE8"
      strokeWidth="4"
    />
    <Circle cx="58" cy="39" r="6" fill="#FFD64D" />
    <Path d="M23 67 38 50l11 10 9-9 10 16Z" fill="url(#purple)" />
    <Path
      d="M27 31h38"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.75}
    />
    <Path
      d="M72 17v-8M68 13h8M80 24l6-5"
      stroke="#F2C83E"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <Circle cx="28" cy="36" r="3" fill="#FFFFFF" opacity={0.9} />
  </Svg>
);

// ---------- Mi perfil ----------

const IconoMiPerfilInactivo = () => (
  <Svg width={32} height={32} viewBox="0 0 96 96" fill="none">
    <Defs>
      <LinearGradient id="blue" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#56B8D1" />
        <Stop offset="1" stopColor="#1684A3" />
      </LinearGradient>
    </Defs>
    <Path
      d="M48 14c19 0 30 14 30 34S67 83 48 83 18 68 18 48 29 14 48 14Z"
      fill="url(#blue)"
    />
    <Circle cx="48" cy="40" r="17" fill="#FFF8E8" />
    <Circle cx="42" cy="40" r="2.5" fill="#414141" />
    <Circle cx="54" cy="40" r="2.5" fill="#414141" />
    <Path
      d="M42 48c4 4 8 4 12 0"
      fill="none"
      stroke="#414141"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
    <Path d="M28 75c3-14 10-21 20-21s17 7 20 21" fill="#238DAA" />
  </Svg>
);

const IconoMiPerfilActivo = () => (
  <Svg width={40} height={40} viewBox="0 0 96 96" fill="none">
    <Defs>
      <LinearGradient id="blue" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#67C8DF" />
        <Stop offset="1" stopColor="#0D86A8" />
      </LinearGradient>
    </Defs>
    <Path
      d="M48 14c19 0 30 14 30 34S67 83 48 83 18 68 18 48 29 14 48 14Z"
      fill="url(#blue)"
    />
    <Circle cx="48" cy="40" r="17" fill="#FFF8E8" />
    <Path
      d="M38 40c2-2 4-2 6 0M52 40c2-2 4-2 6 0"
      fill="none"
      stroke="#414141"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <Path
      d="M41 48c5 6 10 6 15 0"
      fill="none"
      stroke="#414141"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
    <Path d="M28 75c3-14 10-21 20-21s17 7 20 21" fill="#238DAA" />
    <Circle cx="71" cy="21" r="8" fill="#F15B83" />
    <Path
      d="m67 21 3 3 5-6"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ---------- Tabs ----------

const TABS = [
  {
    id: "inicio",
    label: "Inicio",
    ruta: "/(padre)/home",
    color: "#F3BE00",
    light: "#FFF7D7",
    IconInactivo: IconoInicioInactivo,
    IconActivo: IconoInicioActivo,
  },
  {
    id: "galeria",
    label: "Galería",
    ruta: "/(padre)/galeria",
    color: "#8A63D2",
    light: "#F0EBFB",
    IconInactivo: IconoGaleriaInactivo,
    IconActivo: IconoGaleriaActivo,
  },
  {
    id: "comida",
    label: "Comida",
    ruta: "/(padre)/comida",
    color: colors.rojo,
    light: colors.rojoLight,
    IconInactivo: IconoComidaInactivo,
    IconActivo: IconoComidaActivo,
  },
  {
    id: "calendario",
    label: "Calendario",
    ruta: "/(padre)/calendario",
    color: "#08ACC7",
    light: "#E2F7FB",
    IconInactivo: IconoCalendarioInactivo,
    IconActivo: IconoCalendarioActivo,
  },
  {
    id: "mishijos",
    label: "Mis hijos",
    ruta: "/(padre)/mishijos",
    color: "#73C63D",
    light: "#ECF8E4",
    IconInactivo: IconoMisHijosInactivo,
    IconActivo: IconoMisHijosActivo,
  },
  {
    id: "miperfil",
    label: "Mi perfil",
    ruta: "/(padre)/miperfil",
    color: "#1684A3",
    light: "#E4F5FA",
    IconInactivo: IconoMiPerfilInactivo,
    IconActivo: IconoMiPerfilActivo,
  },
];

export default function TabBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.contenedor}>
      {TABS.map((tab) => {
        const activo =
          pathname === tab.ruta ||
          pathname === tab.ruta.replace("/(padre)", "");

        const Icono = activo ? tab.IconActivo : tab.IconInactivo;

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => router.replace(tab.ruta as any)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.iconoWrap,
                activo
                  ? {
                      width: 56,
                      height: 56,
                      borderRadius: 20,
                      backgroundColor: tab.light,
                      borderWidth: 2,
                      borderColor: tab.color,
                      shadowColor: tab.color,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 1,
                      shadowRadius: 0,
                      elevation: 4,
                      transform: [{ translateY: -6 }],
                    }
                  : {
                      width: 42,
                      height: 42,
                      borderRadius: 14,
                      backgroundColor: tab.light,
                    },
              ]}
            >
              <Icono />
            </View>
            <Text
              style={[
                styles.tabLabel,
                { color: activo ? tab.color : "#C0C0C0" },
                activo && { marginTop: -3 },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#EBEBEB",
    paddingTop: 8,
    paddingBottom: 24,
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  tab: {
    alignItems: "center",
    gap: 3,
    flex: 1,
  },
  iconoWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontFamily: fonts.fontBlack,
    fontSize: 9,
  },
});
