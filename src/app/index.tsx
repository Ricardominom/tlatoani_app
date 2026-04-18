import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
  useFonts
} from "@expo-google-fonts/nunito";
import { Text, View } from "react-native";

import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";

export default function Index() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
    Pacifico_400Regular
  });

  if (!fontsLoaded) return null;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text>My App</Text>
    </View>
  );
}
