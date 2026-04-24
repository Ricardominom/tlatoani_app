import { StyleSheet } from "react-native";

export const fonts = {
  fontRegular: "Nunito_400Regular",
  fontSemibold: "Nunito_600SemiBold",
  fontBold: "Nunito_700Bold",
  fontExtra: "Nunito_800ExtraBold",
  fontBlack: "Nunito_900Black",
  fontPacifico: "Pacifico_400Regular"
};

export const colors = {
  primarioAmarillo: "#F5C800",
  secundarioAmarillo: "#B89600",
  lightAmarillo: "#FFFBE6",

  // Abejas / Pollitos (amarillo)
  abejas: "#F5C800",

  // Hormigas (verde)
  hormigas: "#7BC441",
  hormigasLight: "#F0FAF0",
  hormigasS: "#4A7A1E",

  // Lobos (rosa)
  lobos: "#E5297E",
  lobosLight: "#FDF0F8",
  lobosS: "#A01D59",

  // Halcones (turquesa)
  halcones: "#00AECC",
  halconesLight: "#E8F8FC",
  halconesS: "#007A8F",

  //Estados
  verde: "#7BC441",
  verdeLight: "#F0FAF0",
  rojo: "#E53935",
  rojoLight: "#FFF0F0",
  rojoS: "#B71C1C",

  //Interfaz
  fondo: "#F5F3EE",
  card: "#FFFFFF",
  borde: "#EAE7DF",
  texto: "#1E1E1E",
  texto2: "#888580",
  texto3: "#BBB8B0",
  negro: "#141414"
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 14,
  xl: 20,
  pill: 999
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28
};

// Color por grupo para cualquier componente que use el salón
export const grupoColors = {
  abejas: {
    base: "#F5C800",
    light: "#FFFBE6",
    dark: "#B89600",
    textColor: "#5A4800"
  },
  hormigas: {
    base: "#7BC441",
    light: "#EFF8E4",
    dark: "#4E8A22",
    textColor: "#2D5A10"
  },
  halcones: {
    base: "#00AECC",
    light: "#E0F7FC",
    dark: "#007A8F",
    textColor: "#004F5E"
  },
  lobos: {
    base: "#E5297E",
    light: "#FCE4EF",
    dark: "#A0005A",
    textColor: "#6B0033"
  },
  leones: {
    base: "#FF8C00",
    light: "#FFF3E0",
    dark: "#C25F00",
    textColor: "#6B3800"
  },
  pandas: {
    base: "#6B5CE7",
    light: "#EDE9FF",
    dark: "#4A3DAF",
    textColor: "#2E1F8A"
  },
  pollitos: {
    base: "#FFB300",
    light: "#FFF8E1",
    dark: "#CC7A00",
    textColor: "#5A3A00"
  }
};

export const styles = StyleSheet.create({
  btnPrimario: {
    backgroundColor: colors.primarioAmarillo,
    borderRadius: radii.md,
    paddingVertical: 13,
    paddingHorizontal: 24,
    // El efecto sticker en RN se hace con shadowOffset
    shadowColor: colors.secundarioAmarillo,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3
  },
  btnPrimarioTxt: {
    fontFamily: fonts.fontBlack,
    fontSize: 15,
    color: "#5A4800"
  },

  // Card estándar
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borde,
    padding: spacing.lg
  },

  // Chip de salón
  chipSalon: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radii.pill,
    gap: 4
  },
  chipSalonTxt: {
    fontFamily: fonts.fontExtra,
    fontSize: 11
  }
});
