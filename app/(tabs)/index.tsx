import CardsCarousel from "@/components/CardsCarousel";
import ProductsCarousel from "@/components/ProductsCarousel";
import { MOCK_PRODUCTS } from "@/constants/products";
import { ScrollView, StyleSheet } from "react-native";

export default function Index() {
  const items = [
    {
      id: 1,
      title: "Conheça a história por trás da ReUse!",
      image: require("@/assets/images/header3.png"),
      buttonTitle: "Saiba mais",
    },
    {
      id: 2,
      title: "Encontre produtos sustentáveis perto de você",
      image: require("@/assets/images/header2.png"),
      buttonTitle: "Saiba mais",
    },
    {
      id: 3,
      title: "Junte-se à comunidade eco-friendly",
      image: require("@/assets/images/header1.png"),
      buttonTitle: "Saiba mais",
    },
  ];

  const handleCardPress = (id: number) => {
    console.log(`Card ${id} pressed`);
  };

  return (
    <ScrollView style={styles.container}>
      <CardsCarousel items={items} onCardPress={handleCardPress} />

      <ProductsCarousel products={MOCK_PRODUCTS}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});