import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Ellipse, Path } from "react-native-svg";
import { fonts, radii } from "../../styles/global";

const ANIMALES = [
  {
    nombre: "Abejas",
    svg: (
      <Svg width={35} height={35} viewBox="0 0 48 48">
        <Ellipse cx="24" cy="30" rx="7" ry="9" fill="#FFD600" />
        <Ellipse cx="24" cy="14" rx="6" ry="7" fill="#FFD600" />
        <Ellipse cx="10" cy="20" rx="5" ry="3" fill="#C8E8F5" opacity="0.8" />
      </Svg>
    )
  },
  {
    nombre: "Hormigas",
    svg: (
      <Svg width={35} height={35} viewBox="0 0 48 48">
        <Ellipse cx="24" cy="34" rx="9" ry="8" fill="#7BC441" />
        <Ellipse cx="24" cy="22" rx="6" ry="6" fill="#5A9A2A" />
        <Circle cx="24" cy="13" r="7" fill="#7BC441" />
      </Svg>
    )
  },
  {
    nombre: "Halcones",
    svg: (
      <Svg width={35} height={35} viewBox="0 0 48 48">
        <Path d="M8 22 Q18 10 38 8 Q30 16 24 20Z" fill="#00AECC" />
        <Ellipse cx="24" cy="30" rx="7" ry="9" fill="#00AECC" />
        <Circle cx="8" cy="23" r="4" fill="#007A8F" />
      </Svg>
    )
  },
  {
    nombre: "Lobos",
    svg: (
      <Svg width={35} height={35} viewBox="0 0 48 48">
        <Ellipse cx="24" cy="32" rx="12" ry="9" fill="#E5297E" />
        <Ellipse cx="24" cy="17" rx="11" ry="10" fill="#E5297E" />
        <Path d="M14 11 L10 3 L19 9Z" fill="#A01D59" />
        <Path d="M34 11 L38 3 L29 9Z" fill="#A01D59" />
      </Svg>
    )
  },
  {
    nombre: "Pollitos",
    svg: (
      <Svg width={35} height={35} viewBox="0 0 48 48">
        <Ellipse cx="24" cy="30" rx="9" ry="11" fill="#FFD600" />
        <Circle cx="24" cy="14" r="9" fill="#FFD600" />
      </Svg>
    )
  }
];

const ITEMS = [...ANIMALES, ...ANIMALES, ...ANIMALES];

const CHIP_WIDTH = 130;
const TOTAL_WIDTH = ANIMALES.length * CHIP_WIDTH;
const DURACION = 10000;

export default function CarruselAnimales() {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animar = () => {
      translateX.setValue(0);

      Animated.timing(translateX, {
        toValue: -TOTAL_WIDTH,
        duration: DURACION,
        useNativeDriver: true
      }).start(() => {
        animar();
      });
    };

    animar();
  }, []);

  return (
    <View style={styles.contenedor}>
      <Animated.View style={[styles.fila, { transform: [{ translateX }] }]}>
        {ITEMS.map((animal, index) => (
          <View key={index} style={styles.chip}>
            {animal.svg}
            <Text style={styles.nombre}>{animal.nombre}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: "100%",
    overflow: "hidden",
    marginTop: 12
  },
  fila: {
    flexDirection: "row",
    gap: 6,
    paddingVertical: 4
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F5F5F5",
    borderRadius: radii.pill,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    width: CHIP_WIDTH - 6
  },
  nombre: {
    fontFamily: fonts.fontBold,
    fontSize: 11,
    color: "#999"
  }
});
