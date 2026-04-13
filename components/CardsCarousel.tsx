import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import Card from "./Card";

const { width: screenWidth } = Dimensions.get("window");

interface CardItem {
  id: number;
  title: string;
  image: any;
  buttonTitle?: string;
}

interface CardsCarouselProps {
  items: CardItem[];
  onCardPress?: (id: number) => void;
}

export default function CardsCarousel({
  items,
  onCardPress,
}: CardsCarouselProps) {
  const handleCardPress = (id: number) => {
    onCardPress?.(id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 8 }}>
            <Card
              title={item.title}
              image={item.image}
              buttonTitle={item.buttonTitle}
              onPress={() => handleCardPress(item.id)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
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
    paddingVertical: 32,
  },
});
