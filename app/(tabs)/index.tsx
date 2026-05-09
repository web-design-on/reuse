import CardsCarousel from "@/components/CardsCarousel";
import ProductsCarousel from "@/components/ProductsCarousel";
import { useProducts } from "@/hooks/use-Products";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {

  const { data: products, isLoading, error } = useProducts();

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

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : error ? (
        <View style={styles.loadingContainer}>
          <Text>Erro ao carregar produtos sustentáveis.</Text>
        </View>
      ) : (
        /* O seu componente agora recebe os dados da API em vez do MOCK */
        <ProductsCarousel products={products} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center"
  }
});