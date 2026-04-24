import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { AnimalPillLight } from "../../components/ui/AnimalKit";

const ANIMALES = [
  { salon: "abejas" },
  { salon: "hormigas" },
  { salon: "halcones" },
  { salon: "lobos" },
  { salon: "pollitos" },
  { salon: "leones" },
  { salon: "pandas" }
];

const ITEMS = [...ANIMALES, ...ANIMALES, ...ANIMALES];

const CHIP_WIDTH = 130;
const TOTAL_WIDTH = ANIMALES.length * CHIP_WIDTH;
const DURACION = 18000;

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
          <AnimalPillLight
            key={index}
            salon={animal.salon}
            size="md"
            style={{ width: CHIP_WIDTH - 6 }}
          />
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
  }
});
