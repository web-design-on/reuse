import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image, StyleSheet, View } from "react-native";

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

interface ProductsCarouselItemProps {
    product: Product;
}

export default function ProductsCarouselItem({ product }: ProductsCarouselItemProps) {
    return (
        <ThemedView style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.images[0] }}
                    style={styles.image}
                />
                <ThemedView style={styles.locationBadge}>
                    <ThemedText style={styles.location}>
                        📍 {product.location}
                    </ThemedText>
                </ThemedView>
            </View>

            <ThemedView style={styles.content}>
                <ThemedText style={styles.name} numberOfLines={2}>
                    {product.name}
                </ThemedText>

                <ThemedText style={styles.description} numberOfLines={2}>
                    {product.description}
                </ThemedText>

                <ThemedText style={styles.price}>
                    R$ {product.price}
                </ThemedText>

            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        overflow: "hidden",
    },
    imageContainer: {
        position: "relative",
        width: "100%",
        height: 120,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    content: {
        padding: 12,
    },
    name: {
        fontSize: 16,
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: "700",
    },
    description: {
        fontSize: 11,
        lineHeight: 14,
        marginBottom: 4,
        opacity: 0.6,
    },
    locationBadge: {
        position: "absolute",
        top: 6,
        right: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    location: {
        fontSize: 10,
    },
});
