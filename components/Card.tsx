import ThemedButton from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image, StyleSheet, View } from "react-native";

interface CardProps {
  title: string;
  image: any;
  buttonTitle?: string;
  onPress?: () => void;
}

export default function Card({
  title,
  image,
  buttonTitle = "Saiba mais",
  onPress,
}: CardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={image}
        style={styles.image}
        resizeMode="cover"
      />

      <ThemedView style={styles.content}>
        <ThemedText style={styles.text}>
          {title}
        </ThemedText>

        <ThemedButton
          title={buttonTitle}
          onPress={onPress}
        />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    width: 230,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Poppins_400Regular",
    marginBottom: 12,
    minHeight: 80
  },
  content: {
    padding: 16,
  },
});