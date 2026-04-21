import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import TabBar from "../../../components/ui/TabBar";
import { colors, fonts } from "../../../styles/global";

export default function DetalleHijo() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.root}>
      <View style={styles.contenido}>
        <Text style={styles.txt}>Detalle de: {id}</Text>
      </View>
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.fondo },
  contenido: { flex: 1, alignItems: "center", justifyContent: "center" },
  txt: { fontFamily: fonts.fontBold, fontSize: 16, color: colors.texto2 }
});
