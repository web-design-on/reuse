import InfoCard from "@/components/InfoCard";
import { Image, ScrollView, StyleSheet } from "react-native";

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
      />

      <InfoCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  logo: {
    width: 250,
    height: 90,
    marginHorizontal: "auto",
    resizeMode: "contain",
  },
  buttonContainer: {
    marginTop: 16,
  },
});