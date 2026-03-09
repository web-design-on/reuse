import ThemedButton from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image, StyleSheet, View } from "react-native";

export default function InfoCard() {
  return (
    <View style={styles.card}>

      <Image
        source={require("@/assets/images/header1.png")}
        style={styles.image}
        resizeMode="cover"
      />

      <ThemedView style={styles.content}>

        <ThemedText style={styles.text}>
          Milhares de produtos são descartados todos os dias enquanto outras pessoas precisam deles.
          Conectamos essas pontas, incentivando a reutilização e o consumo consciente.
        </ThemedText>

        <ThemedButton
          title="Vamos começar"
          onPress={() => alert("Bem-vindo ao ReUse!")}
        />

      </ThemedView>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    width: "100%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 240,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 26,
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "Poppins_400Regular"
  },
  content: {
    padding: 16,
  },
});