import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";

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
    const [isFav, setIsFav] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkIfFavorited = async () => {
            try {
                const data = await AsyncStorage.getItem("@reuse_favs");
                if (data) {
                    const favorites = JSON.parse(data);
                    const isFavorited = favorites.some((item: any) => item.id === product.id);
                    setIsFav(isFavorited);
                }
            } catch (e) {
                console.error("Erro ao carregar favoritos", e);
            }
        };
        checkIfFavorited();
    }, [product.id]);

    const toggleFavorite = async () => {
        try {
            const data = await AsyncStorage.getItem("@reuse_favs");
            let favorites = data ? JSON.parse(data) : [];

            if (isFav) {
                favorites = favorites.filter((item: any) => item.id !== product.id);
            } else {
                favorites.push(product);
            }

            await AsyncStorage.setItem("@reuse_favs", JSON.stringify(favorites));
            setIsFav(!isFav);
        } catch (e) {
            console.error("Erro ao favoritar", e);
        }
    };

    const handlePress = (item: any) => {
        router.push({
            pathname: "/details" as any,
            params: { ...item, images: Array.isArray(item.images) ? item.images.join(',') : item.images,
                tags: Array.isArray(item.tags) ? item.tags.join(',') : item.tags,
        dimensions: typeof item.dimensions === 'object' ? JSON.stringify(item.dimensions) : item.dimensions
             }
        });
    };

    return (
        <ThemedView style={styles.card}>
            <TouchableOpacity onPress={() => handlePress(product)}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.images[0] }}
                        style={styles.image}
                    />
                    <View style={styles.topBadges}>
                        <TouchableOpacity
                            onPress={toggleFavorite}
                            style={styles.favBtn}
                        >
                            <Animated.View
                                key={isFav ? "fav-on" : "fav-off"}
                                entering={ZoomIn.duration(300)}
                            >
                                <Ionicons
                                    name={isFav ? "heart" : "heart-outline"}
                                    size={18}
                                    color={isFav ? "#ff4d4d" : "#000"}
                                />
                            </Animated.View>
                        </TouchableOpacity>

                        <ThemedView style={styles.locationBadge}>
                            <ThemedText style={styles.location}>
                                📍 {product.location}
                            </ThemedText>
                        </ThemedView>
                    </View>
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
            </TouchableOpacity>
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
    topBadges: {
        position: "absolute",
        top: 6,
        left: 6,
        right: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    favBtn: {
        paddingVertical: 4,
        paddingHorizontal: 5,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 20,
    },
    locationBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    location: {
        fontSize: 10,
    },
});
