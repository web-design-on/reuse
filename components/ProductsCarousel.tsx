import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import ProductsCarouselItem from "./ProductsCarouseltem";
import { ThemedText } from "./themed-text";

const { width: screenWidth } = Dimensions.get("window");
const ITEM_WIDTH = screenWidth / 2 - 10;

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  location: string;
  material: string;
  origin: string;
  variations: string[];
  images: string[];
}

interface ProductsCarouselProps {
  products: Product[];
  onProductPress?: (productId: string) => void;
}

export default function ProductsCarousel({
  products,
  onProductPress,
}: ProductsCarouselProps) {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>
            Produtos em destaque
          </ThemedText>
          <ThemedText style={styles.viewMore}>Ver mais</ThemedText>
        </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View
            style={{
              width: ITEM_WIDTH,
              marginHorizontal: 8,
            }}
          >
            <ProductsCarouselItem product={item} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal={true}
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    paddingLeft: 16,
    fontWeight: "600",
  },
  viewMore: {
    fontSize: 16,
    paddingRight: 16,
    textDecorationLine: "underline",
  },
});
