import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Svg, { Circle, Ellipse, Line, Path, Rect } from "react-native-svg";
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
    text: "#5A4800"
  },
  {
    name: "Hormigas",
    nivel: "Maternal",
    color: "#7BC441",
    shadow: "#4E8A22",
    dark: "#2D5A10",
    light: "#EFF8E4",
    text: "#2D5A10"
  },
  {
    name: "Halcones",
    nivel: "Casa de niños",
    color: "#00AECC",
    shadow: "#007A8F",
    dark: "#004F5E",
    light: "#E0F7FC",
    text: "#004F5E"
  },
  {
    name: "Lobos",
    nivel: "Primaria",
    color: "#E5297E",
    shadow: "#A0005A",
    dark: "#6B0033",
    light: "#FCE4EF",
    text: "#6B0033"
  },
  {
    name: "Leones",
    nivel: "Primaria",
    color: "#FF8C00",
    shadow: "#C25F00",
    dark: "#6B3800",
    light: "#FFF3E0",
    text: "#6B3800"
  },
  {
    name: "Pandas",
    nivel: "Maternal",
    color: "#6B5CE7",
    shadow: "#4A3DAF",
    dark: "#2E1F8A",
    light: "#EDE9FF",
    text: "#2E1F8A"
  },
  {
    name: "Pollitos",
    nivel: "Maternal",
    color: "#FFB300",
    shadow: "#CC7A00",
    dark: "#6B4000",
    light: "#FFF8E1",
    text: "#5A3A00"
  }
];

export const grupoByName = Object.fromEntries(GRUPOS.map((g) => [g.name, g]));

export function getGrupo(salon: string) {
  const nombre = salon.charAt(0).toUpperCase() + salon.slice(1).toLowerCase();
  return grupoByName[nombre] ?? null;
}

// SVG ILUSTRACIONES — los 7 animales

export function Abeja({ size = 48 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Ellipse
        cx="11"
        cy="18"
        rx="9"
        ry="5"
        fill="#C8EEFF"
        stroke="#A8D8F0"
        strokeWidth="1.2"
        opacity="0.9"
      />
      <Ellipse
        cx="37"
        cy="18"
        rx="9"
        ry="5"
        fill="#C8EEFF"
        stroke="#A8D8F0"
        strokeWidth="1.2"
        opacity="0.9"
      />
      <Path
        d="M11 13 Q7 18 5 22"
        stroke="#8BBFD4"
        strokeWidth="0.8"
        opacity="0.6"
      />
      <Path
        d="M37 13 Q41 18 43 22"
        stroke="#8BBFD4"
        strokeWidth="0.8"
        opacity="0.6"
      />
      <Ellipse cx="24" cy="35" rx="9" ry="11" fill="#F5C800" />
      <Ellipse cx="27" cy="37" rx="5" ry="7" fill="#B89600" opacity="0.25" />
      <Rect x="15.5" y="28" width="17" height="4.5" rx="2" fill="#2D2D2D" />
      <Rect x="15.5" y="35" width="17" height="4.5" rx="2" fill="#2D2D2D" />
      <Ellipse cx="19" cy="30" rx="3" ry="2" fill="#fff" opacity="0.2" />
      <Path d="M23 45.5 L24 48 L25 45.5 Q24 44.5 23 45.5Z" fill="#B89600" />
      <Ellipse cx="24" cy="22" rx="7" ry="5.5" fill="#2D2D2D" />
      <Circle cx="24" cy="13.5" r="8" fill="#F5C800" />
      <Ellipse cx="27" cy="15" rx="4.5" ry="5" fill="#B89600" opacity="0.2" />
      <Ellipse cx="20" cy="10" rx="2.5" ry="2" fill="#fff" opacity="0.45" />
      <Ellipse cx="20.5" cy="13" rx="2.8" ry="3" fill="#1A1A1A" />
      <Ellipse cx="27.5" cy="13" rx="2.8" ry="3" fill="#1A1A1A" />
      <Circle cx="19.5" cy="11.8" r="1" fill="#fff" />
      <Circle cx="26.5" cy="11.8" r="1" fill="#fff" />
      <Ellipse
        cx="15.5"
        cy="16"
        rx="2.5"
        ry="1.5"
        fill="#FFB300"
        opacity="0.5"
      />
      <Ellipse
        cx="32.5"
        cy="16"
        rx="2.5"
        ry="1.5"
        fill="#FFB300"
        opacity="0.5"
      />
      <Path
        d="M20 17.5 Q24 21 28 17.5"
        stroke="#7A5C00"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <Path
        d="M20.5 6 Q18 1.5 14.5 1"
        stroke="#2D2D2D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Circle cx="14.5" cy="1" r="2" fill="#2D2D2D" />
      <Path
        d="M27.5 6 Q30 1.5 33.5 1"
        stroke="#2D2D2D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Circle cx="33.5" cy="1" r="2" fill="#2D2D2D" />
      <Path
        d="M18.5 10 Q20.5 8.5 22.5 10"
        stroke="#7A5C00"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M25.5 10 Q27.5 8.5 29.5 10"
        stroke="#7A5C00"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function Hormiga({ size = 48 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Ellipse cx="24" cy="37" rx="9.5" ry="9" fill="#7BC441" />
      <Ellipse cx="27.5" cy="39" rx="5" ry="5.5" fill="#4E8A22" opacity="0.3" />
      <Ellipse cx="19" cy="32" rx="2.5" ry="3.5" fill="#fff" opacity="0.18" />
      <Ellipse cx="24" cy="26" rx="3" ry="2.5" fill="#4E8A22" />
      <Ellipse cx="24" cy="21" rx="5.5" ry="5" fill="#7BC441" />
      <Ellipse cx="26" cy="20" rx="3" ry="3" fill="#9DD85A" opacity="0.3" />
      <Path
        d="M18.5 19 Q12 16 8 12"
        stroke="#4E8A22"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M8 12 Q6 10 5 8"
        stroke="#4E8A22"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M18.5 22 Q11 22 7 23"
        stroke="#4E8A22"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M7 23 Q5 24 4 26"
        stroke="#4E8A22"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M18.5 25 Q12 28 8 32"
        stroke="#4E8A22"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M29.5 19 Q36 16 40 12"
        stroke="#4E8A22"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M40 12 Q42 10 43 8"
        stroke="#4E8A22"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M29.5 22 Q37 22 41 23"
        stroke="#4E8A22"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M41 23 Q43 24 44 26"
        stroke="#4E8A22"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M29.5 25 Q36 28 40 32"
        stroke="#4E8A22"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Circle cx="24" cy="13" r="7.5" fill="#7BC441" />
      <Ellipse
        cx="26.5"
        cy="14.5"
        rx="4"
        ry="4.5"
        fill="#4E8A22"
        opacity="0.2"
      />
      <Ellipse cx="20" cy="9.5" rx="2.5" ry="2" fill="#fff" opacity="0.4" />
      <Ellipse cx="20.5" cy="12.5" rx="3" ry="3.2" fill="#1A1A1A" />
      <Ellipse cx="27.5" cy="12.5" rx="3" ry="3.2" fill="#1A1A1A" />
      <Circle cx="19.5" cy="11" r="1.1" fill="#fff" />
      <Circle cx="26.5" cy="11" r="1.1" fill="#fff" />
      <Ellipse
        cx="15"
        cy="15.5"
        rx="2.5"
        ry="1.5"
        fill="#9DD85A"
        opacity="0.6"
      />
      <Ellipse
        cx="33"
        cy="15.5"
        rx="2.5"
        ry="1.5"
        fill="#9DD85A"
        opacity="0.6"
      />
      <Path
        d="M20.5 17 Q24 20.5 27.5 17"
        stroke="#2D5A10"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <Path
        d="M17.5 16 Q15 19 13 18"
        stroke="#4E8A22"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M30.5 16 Q33 19 35 18"
        stroke="#4E8A22"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M20 6 Q16 1 12 2"
        stroke="#2D5A10"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Circle cx="12" cy="2" r="2.2" fill="#2D5A10" />
      <Path
        d="M28 6 Q32 1 36 2"
        stroke="#2D5A10"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Circle cx="36" cy="2" r="2.2" fill="#2D5A10" />
      <Path
        d="M18.5 9 Q20.5 7 22.5 9"
        stroke="#2D5A10"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M25.5 9 Q27.5 7 29.5 9"
        stroke="#2D5A10"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function Halcon({ size = 48 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Ellipse cx="9" cy="28" rx="8.5" ry="5.5" fill="#007A8F" />
      <Ellipse cx="9" cy="28" rx="6" ry="3.5" fill="#00AECC" opacity="0.5" />
      <Ellipse cx="39" cy="28" rx="8.5" ry="5.5" fill="#007A8F" />
      <Ellipse cx="39" cy="28" rx="6" ry="3.5" fill="#00AECC" opacity="0.5" />
      <Ellipse cx="24" cy="36" rx="9" ry="10" fill="#00AECC" />
      <Ellipse cx="27.5" cy="39" rx="5" ry="6" fill="#007A8F" opacity="0.25" />
      <Ellipse cx="24" cy="37" rx="5.5" ry="6" fill="#E0F7FC" opacity="0.6" />
      <Path d="M18 44 L24 48 L30 44 Q24 46.5 18 44Z" fill="#007A8F" />
      <Path
        d="M19 45 L17 48 M19 45 L19 48 M19 45 L21 48"
        stroke="#FF8C00"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M29 45 L27 48 M29 45 L29 48 M29 45 L31 48"
        stroke="#FF8C00"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Circle cx="24" cy="19" r="14" fill="#00AECC" />
      <Ellipse cx="29" cy="22" rx="7" ry="9" fill="#007A8F" opacity="0.18" />
      <Ellipse cx="16" cy="12" rx="4" ry="3" fill="#fff" opacity="0.25" />
      <Ellipse cx="24" cy="23" rx="8" ry="6" fill="#E0F7FC" opacity="0.55" />
      <Path d="M21 23.5 L24 27 L27 23.5 Q24 25.5 21 23.5Z" fill="#FF8C00" />
      <Circle cx="18.5" cy="18" r="5.5" fill="#fff" />
      <Circle cx="29.5" cy="18" r="5.5" fill="#fff" />
      <Circle cx="18.5" cy="18.5" r="3.5" fill="#1A1A1A" />
      <Circle cx="29.5" cy="18.5" r="3.5" fill="#1A1A1A" />
      <Circle cx="18.5" cy="18.5" r="2" fill="#005A8F" />
      <Circle cx="29.5" cy="18.5" r="2" fill="#005A8F" />
      <Circle cx="17" cy="16.8" r="1.5" fill="#fff" />
      <Circle cx="28" cy="16.8" r="1.5" fill="#fff" />
      <Ellipse
        cx="11.5"
        cy="23"
        rx="3.5"
        ry="2.5"
        fill="#7FDDEE"
        opacity="0.55"
      />
      <Ellipse
        cx="36.5"
        cy="23"
        rx="3.5"
        ry="2.5"
        fill="#7FDDEE"
        opacity="0.55"
      />
      <Path
        d="M14.5 13 Q18.5 10 22 13"
        stroke="#005A6B"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M26 13 Q29.5 10 33.5 13"
        stroke="#005A6B"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path d="M20 6 Q22 1 24 5 Q26 0 28 5 Q25 3.5 24 6Z" fill="#007A8F" />
    </Svg>
  );
}

export function Lobo({ size = 48 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Ellipse
        cx="38"
        cy="40"
        rx="6"
        ry="5"
        fill="#FCE4EF"
        stroke="#E5297E"
        strokeWidth="1.5"
      />
      <Ellipse cx="38" cy="40" rx="3.5" ry="3" fill="#fff" opacity="0.4" />
      <Ellipse cx="24" cy="41" rx="10" ry="7" fill="#E5297E" />
      <Ellipse cx="24" cy="41" rx="7" ry="4.5" fill="#FCE4EF" opacity="0.4" />
      <Path d="M10 18 L6 2 L19 13 Z" fill="#E5297E" />
      <Path d="M38 18 L42 2 L29 13 Z" fill="#E5297E" />
      <Path d="M11.5 17 L9 5.5 L18 13 Z" fill="#FCB8D8" />
      <Path d="M36.5 17 L39 5.5 L30 13 Z" fill="#FCB8D8" />
      <Circle cx="24" cy="24" r="18" fill="#E5297E" />
      <Ellipse cx="30" cy="27" rx="10" ry="13" fill="#A0005A" opacity="0.15" />
      <Ellipse cx="15" cy="15" rx="5" ry="3.5" fill="#fff" opacity="0.18" />
      <Ellipse cx="24" cy="31.5" rx="9" ry="7" fill="#FCE4EF" opacity="0.9" />
      <Ellipse cx="24" cy="32" rx="6.5" ry="5" fill="#FCB8D8" opacity="0.35" />
      <Ellipse cx="24" cy="26.5" rx="4" ry="3" fill="#A0005A" />
      <Ellipse cx="22.5" cy="25.3" rx="1.4" ry="1" fill="#fff" opacity="0.5" />
      <Path
        d="M24 29.5 L24 27"
        stroke="#A0005A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <Path
        d="M17 34 Q24 39.5 31 34"
        stroke="#A0005A"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Ellipse cx="24" cy="37.5" rx="3.5" ry="3" fill="#E5297E" />
      <Circle cx="16.5" cy="21" r="6" fill="#fff" />
      <Circle cx="31.5" cy="21" r="6" fill="#fff" />
      <Circle cx="16.5" cy="21.5" r="4" fill="#1A1A1A" />
      <Circle cx="31.5" cy="21.5" r="4" fill="#1A1A1A" />
      <Circle cx="16.5" cy="21.5" r="2.3" fill="#A0005A" />
      <Circle cx="31.5" cy="21.5" r="2.3" fill="#A0005A" />
      <Circle cx="14.8" cy="19.5" r="2" fill="#fff" />
      <Circle cx="29.8" cy="19.5" r="2" fill="#fff" />
      <Ellipse cx="9" cy="27" rx="4.5" ry="3.5" fill="#FCB8D8" opacity="0.6" />
      <Ellipse cx="39" cy="27" rx="4.5" ry="3.5" fill="#FCB8D8" opacity="0.6" />
      <Path
        d="M11 15.5 Q16.5 11.5 21 15.5"
        stroke="#A0005A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Path
        d="M27 15.5 Q31.5 11.5 37 15.5"
        stroke="#A0005A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Line
        x1="5"
        y1="28"
        x2="15"
        y2="30"
        stroke="#A0005A"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <Line
        x1="4"
        y1="32"
        x2="14.5"
        y2="31.5"
        stroke="#A0005A"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <Line
        x1="43"
        y1="28"
        x2="33"
        y2="30"
        stroke="#A0005A"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <Line
        x1="44"
        y1="32"
        x2="33.5"
        y2="31.5"
        stroke="#A0005A"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </Svg>
  );
}

export function Leon({ size = 48 }) {
  const rayos = [0, 40, 80, 120, 160, 200, 240, 280, 320];
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {rayos.map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 24 + 19 * Math.cos(rad);
        const y1 = 26 + 19 * Math.sin(rad);
        const x2 = 24 + 23 * Math.cos(rad);
        const y2 = 26 + 23 * Math.sin(rad);
        return (
          <Line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#C25F00"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      })}
      <Circle cx="24" cy="26" r="19" fill="#FF8C00" />
      <Circle
        cx="24"
        cy="26"
        r="19"
        fill="none"
        stroke="#C25F00"
        strokeWidth="1.5"
      />
      <Ellipse cx="27" cy="29" rx="14" ry="14" fill="#C25F00" opacity="0.2" />
      <Ellipse cx="16" cy="16" rx="4.5" ry="3" fill="#FFB84D" opacity="0.35" />
      <Circle cx="24" cy="26" r="12.5" fill="#FFB84D" />
      <Ellipse cx="18" cy="20" rx="3.5" ry="2.5" fill="#fff" opacity="0.25" />
      <Ellipse cx="24" cy="31" rx="6.5" ry="5" fill="#FFA040" opacity="0.7" />
      <Path
        d="M21.5 27.5 L24 26 L26.5 27.5 Q24 30.5 21.5 27.5Z"
        fill="#C25F00"
      />
      <Path
        d="M24 30 L24 27.5"
        stroke="#C25F00"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M18 33 Q24 37.5 30 33"
        stroke="#C25F00"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Ellipse cx="18.5" cy="23.5" rx="3.5" ry="3.8" fill="#2D2D2D" />
      <Ellipse cx="29.5" cy="23.5" rx="3.5" ry="3.8" fill="#2D2D2D" />
      <Circle cx="18.5" cy="23.5" r="2.2" fill="#7BC441" />
      <Circle cx="29.5" cy="23.5" r="2.2" fill="#7BC441" />
      <Circle cx="18.5" cy="23.5" r="1.2" fill="#1A1A1A" />
      <Circle cx="29.5" cy="23.5" r="1.2" fill="#1A1A1A" />
      <Circle cx="17.7" cy="22.5" r="0.8" fill="#fff" />
      <Circle cx="28.7" cy="22.5" r="0.8" fill="#fff" />
      <Path
        d="M15 19.5 Q18.5 17 21.5 19.5"
        stroke="#C25F00"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M26.5 19.5 Q29.5 17 33 19.5"
        stroke="#C25F00"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Ellipse
        cx="13"
        cy="28"
        rx="3.5"
        ry="2.5"
        fill="#FFB300"
        opacity="0.45"
      />
      <Ellipse
        cx="35"
        cy="28"
        rx="3.5"
        ry="2.5"
        fill="#FFB300"
        opacity="0.45"
      />
      <Circle
        cx="11"
        cy="12"
        r="5"
        fill="#FF8C00"
        stroke="#C25F00"
        strokeWidth="1.5"
      />
      <Circle
        cx="37"
        cy="12"
        r="5"
        fill="#FF8C00"
        stroke="#C25F00"
        strokeWidth="1.5"
      />
      <Circle cx="11" cy="12" r="2.5" fill="#FFB84D" opacity="0.6" />
      <Circle cx="37" cy="12" r="2.5" fill="#FFB84D" opacity="0.6" />
    </Svg>
  );
}

export function Panda({ size = 48 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Circle cx="10" cy="12" r="8" fill="#6B5CE7" />
      <Circle cx="38" cy="12" r="8" fill="#6B5CE7" />
      <Circle cx="10" cy="12" r="4.5" fill="#EDE9FF" opacity="0.6" />
      <Circle cx="38" cy="12" r="4.5" fill="#EDE9FF" opacity="0.6" />
      <Circle cx="24" cy="28" r="18" fill="#EDE9FF" />
      <Ellipse cx="29" cy="31" rx="10" ry="13" fill="#6B5CE7" opacity="0.1" />
      <Ellipse cx="15" cy="18" rx="4" ry="3" fill="#fff" opacity="0.5" />
      <Ellipse cx="17" cy="24.5" rx="6" ry="6.5" fill="#6B5CE7" />
      <Ellipse cx="31" cy="24.5" rx="6" ry="6.5" fill="#6B5CE7" />
      <Ellipse cx="19" cy="26.5" rx="3" ry="3.5" fill="#4A3DAF" opacity="0.3" />
      <Ellipse cx="33" cy="26.5" rx="3" ry="3.5" fill="#4A3DAF" opacity="0.3" />
      <Circle cx="17" cy="24" r="3.5" fill="#fff" />
      <Circle cx="31" cy="24" r="3.5" fill="#fff" />
      <Circle cx="17.5" cy="24.5" r="2" fill="#2D2D2D" />
      <Circle cx="31.5" cy="24.5" r="2" fill="#2D2D2D" />
      <Circle cx="16.8" cy="23.2" r="0.9" fill="#fff" />
      <Circle cx="30.8" cy="23.2" r="0.9" fill="#fff" />
      <Ellipse cx="24" cy="31.5" rx="3.2" ry="2.2" fill="#6B5CE7" />
      <Path
        d="M24 33.5 L24 31.5"
        stroke="#4A3DAF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M19 36 Q24 41 29 36"
        stroke="#4A3DAF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Ellipse cx="12" cy="34" rx="4" ry="3" fill="#9B8EF5" opacity="0.4" />
      <Ellipse cx="36" cy="34" rx="4" ry="3" fill="#9B8EF5" opacity="0.4" />
      <Path
        d="M12.5 19 Q17 15.5 21 19"
        stroke="#4A3DAF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M27 19 Q31 15.5 35.5 19"
        stroke="#4A3DAF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Rect
        x="40"
        y="20"
        width="4"
        height="20"
        rx="2"
        fill="#7BC441"
        opacity="0.7"
      />
      <Ellipse cx="42" cy="26" rx="3" ry="1.5" fill="#9DD85A" opacity="0.5" />
      <Ellipse cx="42" cy="34" rx="3" ry="1.5" fill="#9DD85A" opacity="0.5" />
      <Path
        d="M40 20 Q38 16 40 12 Q42 16 44 12 Q44 16 40 20Z"
        fill="#7BC441"
        opacity="0.6"
      />
    </Svg>
  );
}

export function Pollito({ size = 48 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Ellipse cx="24" cy="47.5" rx="12" ry="2" fill="#CC7A00" opacity="0.2" />
      <Path
        d="M18 44 L16 47 M18 44 L18 47.5 M18 44 L20 47"
        stroke="#FF8C00"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Path
        d="M30 44 L28 47 M30 44 L30 47.5 M30 44 L32 47"
        stroke="#FF8C00"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Circle cx="24" cy="35" r="13" fill="#FFB300" />
      <Circle cx="11.5" cy="30" r="4" fill="#FFB300" />
      <Circle cx="36.5" cy="30" r="4" fill="#FFB300" />
      <Circle cx="10.5" cy="38" r="3.5" fill="#FFB300" />
      <Circle cx="37.5" cy="38" r="3.5" fill="#FFB300" />
      <Circle cx="14" cy="44.5" r="4" fill="#FFB300" />
      <Circle cx="34" cy="44.5" r="4" fill="#FFB300" />
      <Ellipse cx="28" cy="38" rx="7" ry="8" fill="#CC7A00" opacity="0.18" />
      <Ellipse cx="16" cy="27" rx="4" ry="3" fill="#fff" opacity="0.3" />
      <Ellipse cx="10" cy="34" rx="5" ry="3.5" fill="#CC7A00" opacity="0.5" />
      <Ellipse cx="38" cy="34" rx="5" ry="3.5" fill="#CC7A00" opacity="0.5" />
      <Circle cx="24" cy="18" r="14" fill="#FFB300" />
      <Ellipse cx="29" cy="21" rx="7" ry="9" fill="#CC7A00" opacity="0.15" />
      <Path
        d="M17 5 Q19.5 0 22 4.5"
        stroke="#CC7A00"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M22 4.5 Q24 -1 26 4"
        stroke="#CC7A00"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M26 4 Q28.5 0 31 5"
        stroke="#CC7A00"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Circle cx="18.5" cy="17" r="6" fill="#fff" />
      <Circle cx="29.5" cy="17" r="6" fill="#fff" />
      <Circle cx="18.5" cy="17.5" r="4" fill="#1A1A1A" />
      <Circle cx="29.5" cy="17.5" r="4" fill="#1A1A1A" />
      <Circle cx="18.5" cy="17.5" r="2.2" fill="#6B4000" />
      <Circle cx="29.5" cy="17.5" r="2.2" fill="#6B4000" />
      <Circle cx="16.8" cy="15.5" r="2" fill="#fff" />
      <Circle cx="27.8" cy="15.5" r="2" fill="#fff" />
      <Ellipse cx="24" cy="24" rx="4.5" ry="2.5" fill="#FF8C00" />
      <Path
        d="M19.5 24.5 Q24 27.5 28.5 24.5"
        stroke="#C25F00"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M14.5 11.5 Q18.5 8 22.5 11.5"
        stroke="#CC7A00"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M25.5 11.5 Q29.5 8 33.5 11.5"
        stroke="#CC7A00"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

// COMPONENTE 1 — Ícono solo (cualquier tamaño)

export function AnimalIcon({
  salon,
  size = 48
}: {
  salon: string;
  size?: number;
}) {
  switch (salon.toLowerCase()) {
    case "abejas":
      return <Abeja size={size} />;
    case "hormigas":
      return <Hormiga size={size} />;
    case "halcones":
      return <Halcon size={size} />;
    case "lobos":
      return <Lobo size={size} />;
    case "leones":
      return <Leon size={size} />;
    case "pandas":
      return <Panda size={size} />;
    case "pollitos":
      return <Pollito size={size} />;
    default:
      return null;
  }
}

// COMPONENTE 2 — Avatar (tarjeta cuadrada)

const AVATAR_SIZES = {
  lg: { box: 110, radius: 28, border: 3, iconSize: 72, shadow: 6 },
  md: { box: 70, radius: 22, border: 3, iconSize: 48, shadow: 4 },
  sm: { box: 48, radius: 16, border: 2, iconSize: 32, shadow: 3 }
};

export function AnimalAvatar({
  salon,
  size = "md",
  style
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
          overflow: "hidden"
        } as ViewStyle,
        style
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
  style
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
          elevation: 2
        },
        style
      ]}
    >
      <AnimalIcon salon={salon} size={iconSize} />
      <Text
        style={{
          fontFamily: fonts.fontBlack,
          fontSize: fontSize,
          color: g.text
        }}
      >
        {label ?? g.name}
      </Text>
    </View>
  );
}

// COMPONENTE 4 — Pill ligero (fondo claro, borde de color)

export function AnimalPillLight({ salon, label, size = "sm", style }) {
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
          elevation: 1
        },
        style
      ]}
    >
      <AnimalIcon salon={salon} size={iconSize} />
      <Text
        style={{
          fontFamily: fonts.fontBlack,
          fontSize: fontSize,
          color: g.text
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
  onPress
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
          transform: [{ translateY: activo ? -4 : 0 }]
        }}
      >
        <AnimalIcon salon={salon} size={activo ? 36 : 28} />
      </View>
      <Text
        style={{
          fontFamily: fonts.fontBlack,
          fontSize: 9,
          color: activo ? g.color : "#C0C0C0"
        }}
      >
        {g.name}
      </Text>
    </TouchableOpacity>
  );
}
