import InfoCard from "@/components/InfoCard";
import { ThemedView } from "@/components/themed-view";
import { Image, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <ThemedView style={styles.container}>

  <Image
    source={require("@/assets/images/logo.png")}
    style={styles.logo}
  />

  <View style={styles.cardArea}>
    <InfoCard />
  </View>

  </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 70,
  },

  logo: {
    width: 250,
    height: 250,
    marginBottom: 10,
    marginTop: -80,
    resizeMode: "contain",
  },

  buttonContainer: {
    marginTop: 16,
  },

  cardArea: {
  width: "100%",
  alignItems: "center",
  marginTop: -100,
  overflow: "visible",
  },

});