import { Image, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { fonts } from "../../styles/global";

// CONFIGURACIÓN DE GRUPOS

export const GRUPOS = [
  {
    name: "Abejas",
    nivel: "Casa de niños",
    color: "#F5C800",
    shadow: "#B89600",
    dark: "#7A5C00",
    light: "#FFFBE6",
    text: "#5A4800",
  },
  {
    name: "Hormigas",
    nivel: "Maternal",
    color: "#7BC441",
    shadow: "#4E8A22",
    dark: "#2D5A10",
    light: "#EFF8E4",
    text: "#2D5A10",
  },
  {
    name: "Halcones",
    nivel: "Casa de niños",
    color: "#00AECC",
    shadow: "#007A8F",
    dark: "#004F5E",
    light: "#E0F7FC",
    text: "#004F5E",
  },
  {
    name: "Lobos",
    nivel: "Primaria",
    color: "#E5297E",
    shadow: "#A0005A",
    dark: "#6B0033",
    light: "#FCE4EF",
    text: "#6B0033",
  },
  {
    name: "Leones",
    nivel: "Primaria",
    color: "#FF8C00",
    shadow: "#C25F00",
    dark: "#6B3800",
    light: "#FFF3E0",
    text: "#6B3800",
  },
  {
    name: "Pandas",
    nivel: "Maternal",
    color: "#6B5CE7",
    shadow: "#4A3DAF",
    dark: "#2E1F8A",
    light: "#EDE9FF",
    text: "#2E1F8A",
  },
  {
    name: "Pollitos",
    nivel: "Maternal",
    color: "#FFB300",
    shadow: "#CC7A00",
    dark: "#6B4000",
    light: "#FFF8E1",
    text: "#5A3A00",
  },
  {
    name: "Koalas",
    nivel: "Maternal",
    color: "#5B8FD4",
    shadow: "#3A63A0",
    dark: "#1E3D6B",
    light: "#E9F1FB",
    text: "#1E3D6B",
  },
  {
    name: "Nutrias",
    nivel: "Taller 1",
    color: "#B5764A",
    shadow: "#7F4C29",
    dark: "#4E2C14",
    light: "#F8EFE6",
    text: "#4E2C14",
  },
  {
    name: "Panteras",
    nivel: "Taller 2",
    color: "#565A6E",
    shadow: "#363A4C",
    dark: "#1E2130",
    light: "#EEEFF4",
    text: "#1E2130",
  },
];

export const grupoByName = Object.fromEntries(GRUPOS.map((g) => [g.name, g]));

export function getGrupo(salon: string) {
  const nombre = salon.charAt(0).toUpperCase() + salon.slice(1).toLowerCase();
  return grupoByName[nombre] ?? null;
}

// IMÁGENES — los 7 animales

const ANIMAL_IMAGES: Record<string, any> = {
  abejas: require("@/assets/animales/abejas.png"),
  hormigas: require("@/assets/animales/hormigas.png"),
  halcones: require("@/assets/animales/halcones.png"),
  lobos: require("@/assets/animales/lobos.png"),
  leones: require("@/assets/animales/leones.png"),
  pandas: require("@/assets/animales/pandas.png"),
  pollitos: require("@/assets/animales/pollitos.png"),
  koalas: require("@/assets/animales/koalas.png"),
  nutrias: require("@/assets/animales/nutrias.png"),
  panteras: require("@/assets/animales/panteras.png"),
};

// COMPONENTE 1 — Ícono solo (cualquier tamaño)

export function AnimalIcon({
  salon,
  size = 48,
}: {
  salon: string;
  size?: number;
}) {
  const fuente = ANIMAL_IMAGES[salon.toLowerCase()];
  if (!fuente) return null;
  return (
    <Image
      source={fuente}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}

// COMPONENTE 2 — Avatar (tarjeta cuadrada)

const AVATAR_SIZES = {
  lg: { box: 110, radius: 28, border: 3, iconSize: 72, shadow: 6 },
  md: { box: 70, radius: 22, border: 3, iconSize: 48, shadow: 4 },
  sm: { box: 48, radius: 16, border: 2, iconSize: 32, shadow: 3 },
};

export function AnimalAvatar({
  salon,
  size = "md",
  style,
}: {
  salon: string;
  size?: "lg" | "md" | "sm";
  style?: ViewStyle;
}) {
  const g = getGrupo(salon);
  if (!g) return null;
  const s = AVATAR_SIZES[size];

  return (
    <View
      style={[
        {
          width: s.box,
          height: s.box,
          borderRadius: s.radius,
          backgroundColor: g.light,
          borderWidth: s.border,
          borderColor: g.color,
          shadowColor: g.shadow,
          shadowOffset: { width: 0, height: s.shadow },
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: s.shadow,
          alignItems: "center",
          justifyContent: "center",
        } as ViewStyle,
        style,
      ]}
    >
      <AnimalIcon salon={salon} size={s.iconSize} />
    </View>
  );
}

// COMPONENTE 3 — Pill relleno (tag de aviso)

export function AnimalPill({
  salon,
  label,
  size = "sm",
  style,
}: {
  salon: string;
  label?: string;
  size?: "sm" | "md";
  style?: any;
}) {
  const g = getGrupo(salon);
  if (!g) return null;

  const iconSize = size === "md" ? 26 : 18;
  const fontSize = size === "md" ? 14 : 11;
  const paddingV = size === "md" ? 7 : 4;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          backgroundColor: g.color,
          borderRadius: 20,
          paddingVertical: paddingV,
          paddingLeft: 8,
          paddingRight: 14,
          shadowColor: g.shadow,
          shadowOffset: { width: 0, height: 2.5 },
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: 2,
        },
        style,
      ]}
    >
      <AnimalIcon salon={salon} size={iconSize} />
      <Text
        style={{
          fontFamily: fonts.fontBlack,
          fontSize: fontSize,
          color: g.text,
        }}
      >
        {label ?? g.name}
      </Text>
    </View>
  );
}

// COMPONENTE 4 — Pill ligero (fondo claro, borde de color)

export function AnimalPillLight({
  salon,
  label,
  size = "sm",
  style,
}: {
  salon: string;
  label?: string;
  size?: "sm" | "md";
  style?: any;
}) {
  const g = getGrupo(salon);
  if (!g) return null;

  const iconSize = size === "md" ? 26 : 18;
  const fontSize = size === "md" ? 14 : 11;
  const paddingV = size === "md" ? 7 : 4;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          backgroundColor: g.light,
          borderWidth: 2, // ← sube de 1.5 a 2
          borderColor: g.color,
          borderRadius: 20,
          paddingVertical: paddingV,
          paddingLeft: 6,
          paddingRight: 12,
          shadowColor: g.shadow, // ← agrega sombra
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 0,
          elevation: 1,
        },
        style,
      ]}
    >
      <AnimalIcon salon={salon} size={iconSize} />
      <Text
        style={{
          fontFamily: fonts.fontBlack,
          fontSize: fontSize,
          color: g.text,
        }}
      >
        {label ?? g.name}
      </Text>
    </View>
  );
}

// COMPONENTE 5 — Filter (botón de filtro con estado activo)

export function AnimalFilter({
  salon,
  activo = false,
  onPress,
}: {
  salon: string;
  activo?: boolean;
  onPress?: () => void;
}) {
  const g = getGrupo(salon);
  if (!g) return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{ alignItems: "center", gap: 3 }}
    >
      <View
        style={{
          width: activo ? 56 : 48,
          height: activo ? 56 : 48,
          borderRadius: activo ? 20 : 15,
          backgroundColor: activo ? g.color : g.light,
          borderWidth: 2.5,
          borderColor: activo ? g.shadow : g.color + "44",
          shadowColor: activo ? g.shadow : "transparent",
          shadowOffset: { width: 0, height: activo ? 5 : 0 },
          shadowOpacity: activo ? 1 : 0,
          shadowRadius: 0,
          elevation: activo ? 5 : 0,
          alignItems: "center",
          justifyContent: "center",
          transform: [{ translateY: activo ? -4 : 0 }],
        }}
      >
        <AnimalIcon salon={salon} size={activo ? 36 : 28} />
      </View>
      <Text
        style={{
          fontFamily: fonts.fontBlack,
          fontSize: 9,
          color: activo ? g.color : "#C0C0C0",
        }}
      >
        {g.name}
      </Text>
    </TouchableOpacity>
  );
}
