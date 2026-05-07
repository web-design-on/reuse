import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import ThemedButton from '@/components/themed-button';

const { width } = Dimensions.get('window');

export default function DetailsScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();

    const [isFav, setIsFav] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const tintColor = useThemeColor({}, 'tint');

    const imageList = typeof params.images === 'string' ? params.images.split(',') : [];
    const variationList = typeof params.variations === 'string'
        ? params.variations.split(',').map(v => v.trim())
        : [];

        const tagsList = typeof params.tags === 'string' ? params.tags.split(',') : [];
        const availability = params.availabilityStatus || 'Estoque não informado';
        const brand = params.brand || 'Marca não informada';
        const rating = params.rating || 'N/A';
        const stock = params.stock || '0';
        const warranty = params.warrantyInformation || 'Sem garantia';
        const shipping = params.shippingInformation || 'Pronta entrega';
    
        // Tratamento seguro das dimensões
        let dimensionText = 'Dimensões indisponíveis';
        try {
            if (typeof params.dimensions === 'string') {
                const d = JSON.parse(params.dimensions);
                dimensionText = `${Math.round(d.width)} x ${Math.round(d.height)} x ${Math.round(d.depth)}`;
    
            }
        } catch (e) { }
    

    useEffect(() => {
        const checkInitialStates = async () => {
            try {
                const favData = await AsyncStorage.getItem('@reuse_favs');
                if (favData) {
                    const list = JSON.parse(favData);
                    setIsFav(list.some((i: any) => String(i.id) === String(params.id)));
                }
                const cartData = await AsyncStorage.getItem('@reuse_cart');
                if (cartData) {
                    const cartList = JSON.parse(cartData);
                    setIsInCart(cartList.some((i: any) => String(i.id) === String(params.id)));
                }
            } catch (e) {
                console.error("Erro ao carregar dados", e);
            }
        };
        checkInitialStates();
    }, [params.id]);

    const toggleFavorite = async () => {
        const data = await AsyncStorage.getItem('@reuse_favs');
        let list = data ? JSON.parse(data) : [];
        if (isFav) list = list.filter((i: any) => String(i.id) !== String(params.id));
        else list.push({ ...params, images: imageList });
        await AsyncStorage.setItem('@reuse_favs', JSON.stringify(list));
        setIsFav(!isFav); // Isso aciona a animação do ícone
    };

    const toggleCart = async () => {
        const data = await AsyncStorage.getItem('@reuse_cart');
        let cartList = data ? JSON.parse(data) : [];
        if (isInCart) {
            cartList = cartList.filter((i: any) => String(i.id) !== String(params.id));
        } else {
            cartList.push({ ...params, images: imageList });
        }
        await AsyncStorage.setItem('@reuse_cart', JSON.stringify(cartList));
        setIsInCart(!isInCart);
    };

    const onScroll = (event: any) => {
        const slide = Math.round(event.nativeEvent.contentOffset.x / width);
        if (slide !== activeIndex) setActiveIndex(slide);
    };

    return (
        <ThemedView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: "Detalhes",
                    headerBackTitle: "Voltar",
                    headerTintColor: "#000",
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <View style={styles.carouselContainer}>
                    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={onScroll} scrollEventThrottle={16}>
                        {imageList.map((img, index) => (
                            <Image key={index} source={{ uri: img }} style={styles.imageSlide} />
                        ))}
                    </ScrollView>
                    <View style={styles.pagination}>
                        {imageList.map((_, index) => (
                            <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
                        ))}
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.headerRow}>
                        <View style={{ flex: 1, paddingRight: 10 }}>
                            <ThemedText type="subtitle" style={styles.poppinsBold}>{params.title || params.name}</ThemedText>
                            <View style={styles.locRow}>
                            <Ionicons name="star" size={14} color="#f1c40f" />
                            <ThemedText style={styles.locText}>{rating} • {brand}</ThemedText>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.listIcon} onPress={() => setModalVisible(true)}>
                        <Ionicons name="information-circle-outline" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>
                    

                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10 }}>
                        <ThemedText style={styles.price}>R$ {params.price}</ThemedText>
                        <ThemedText style={{ color: '#888', fontSize: 12 }}>({stock} em estoque)</ThemedText>
                    </View>

                    <View style={styles.badgeRow}>
                        <View style={[styles.tag, { backgroundColor: '#e6f4ea' }]}>
                            <ThemedText style={[styles.poppinsReg, { color: '#137333', fontSize: 12 }]}>{availability}</ThemedText>
                        </View>
                        {tagsList.filter(Boolean).map((tag: string, idx: number) => (
                            <View key={idx} style={styles.tag}>
                                <ThemedText style={[styles.poppinsReg, { fontSize: 12 }]}>{tag.trim()}</ThemedText>
                            </View>
                        ))}
                    </View>

                    <View style={styles.divider} />

                    <ThemedText type="defaultSemiBold" style={styles.poppinsBold}>Descrição</ThemedText>
                    <ThemedText style={styles.description}>{params.description}</ThemedText>

                    <View style={styles.actionRow}>
                        <TouchableOpacity onPress={toggleFavorite} style={[styles.favBtn, { borderColor: tintColor }]}>

                            <Animated.View key={isFav ? 'fav-on' : 'fav-off'} entering={ZoomIn.duration(300)}>
                                <Ionicons name={isFav ? "heart" : "heart-outline"} size={28} color={isFav ? "#ff4d4d" : tintColor} />
                            </Animated.View>
                        </TouchableOpacity>

                        <View style={{ flex: 2 }}>
                            <ThemedButton
                                key={isInCart ? "cart-remove" : "cart-add"}
                                title={isInCart ? "Remover do Carrinho" : "Adicionar ao Carrinho"}
                                onPress={toggleCart}
                                lightColor={isInCart ? "#444444" : "#4F40E2"}
                                darkColor={isInCart ? "#333333" : "#8075e7"}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
                    {modalVisible && (
                        <Animated.View entering={FadeInDown.duration(500)} style={styles.modalContent} onStartShouldSetResponder={() => true}>
                            <View style={styles.modalIndicator} />
                            <ThemedText type="subtitle" style={styles.modalTitle}>Variações</ThemedText>
                
                            <ThemedText type="subtitle" style={styles.modalTitle}>Especificações</ThemedText>
                            
                            <View style={{ flexDirection: 'row', gap: 15, flexWrap: 'wrap' }}>
                                <View>
                                    <ThemedText style={styles.label}>Marca</ThemedText>
                                    <View style={styles.tagPink}><ThemedText style={styles.poppinsReg}>{brand}</ThemedText></View>
                                </View>
                                <View>
                                    <ThemedText style={styles.label}>Dimensões</ThemedText>
                                    <View style={styles.tagPink}><ThemedText style={styles.poppinsReg}>{dimensionText}</ThemedText></View>
                                </View>
                                <View>
                                    <ThemedText style={styles.label}>Frete</ThemedText>
                                    <View style={styles.tagPink}><ThemedText style={styles.poppinsReg}>{shipping}</ThemedText></View>
                                </View>
                                <View>
                                    <ThemedText style={styles.label}>Garantia</ThemedText>
                                    <View style={styles.tagPink}><ThemedText style={styles.poppinsReg}>{warranty}</ThemedText></View>
                                </View>
                            </View>
                        </Animated.View>
                    )}
                </TouchableOpacity>
            </Modal>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    carouselContainer: { width: width, height: width, backgroundColor: '#f0f0f0' },
    imageSlide: { width: width, height: width, resizeMode: 'cover' },
    pagination: { flexDirection: 'row', position: 'absolute', bottom: 20, alignSelf: 'center' },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.5)', marginHorizontal: 4 },
    activeDot: { backgroundColor: '#fff', width: 20 },
    content: { padding: 20 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    locRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
    locText: { fontSize: 13, color: '#666', fontFamily: 'Poppins_400Regular' },
    listIcon: { backgroundColor: '#f5f5f5', padding: 10, borderRadius: 12 },
    price: { fontSize: 24, color: '#2ecc71', marginTop: 8, fontFamily: 'Poppins_700Bold' },
    poppinsBold: { fontFamily: 'Poppins_700Bold' },
    poppinsReg: { fontFamily: 'Poppins_400Regular' },
    divider: { height: 1, backgroundColor: '#eee', marginVertical: 20 },
    description: { fontSize: 14, lineHeight: 22, opacity: 0.8, marginBottom: 15, fontFamily: 'Poppins_400Regular' },
    actionRow: { flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 30},
    favBtn: { padding: 10, borderWidth: 1, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
    modalIndicator: { width: 40, height: 5, backgroundColor: '#eee', borderRadius: 3, alignSelf: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 20, marginBottom: 15, fontFamily: 'Poppins_700Bold' },
    badgeRow: { flexDirection: 'row', gap: 8, marginTop: 12, flexWrap: 'wrap' },
    tag: { backgroundColor: '#f5f5f5', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
    label: { color: '#888', marginBottom: 8, fontSize: 14, fontFamily: 'Poppins_400Regular' },
    tagPink: { backgroundColor: '#f4f3ff', padding: 10, borderRadius: 10, alignSelf: 'flex-start', marginBottom: 15 },
});