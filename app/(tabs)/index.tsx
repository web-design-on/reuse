import CardsCarousel from "@/components/CardsCarousel";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const items = [
    {
      id: 1,
      title: "Conheça a história por trás da ReUse!",
      image: require("@/assets/images/header1.png"),
      buttonTitle: "Saiba mais",
    },
    {
      id: 2,
      title: "Recicle e ganhe pontos com nossas parcerias",
      image: require("@/assets/images/header1.png"),
      buttonTitle: "Participar",
    },
    {
      id: 3,
      title: "Encontre produtos sustentáveis perto de você",
      image: require("@/assets/images/header1.png"),
      buttonTitle: "Saiba mais",
    },
    {
      id: 4,
      title: "Junte-se à comunidade eco-friendly",
      image: require("@/assets/images/header1.png"),
      buttonTitle: "Saiba mais",
    },
  ];

  const handleCardPress = (id: number) => {
    console.log(`Card ${id} pressed`);
  };

  return (
    <View style={styles.container}>
      <CardsCarousel items={items} onCardPress={handleCardPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});