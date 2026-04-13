import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MOCK_PRODUCTS } from '../../constants/products';

const { width } = Dimensions.get('window');

export default function FavoritesScreen() {
  const [activeTab, setActiveTab] = useState<'recent' | 'saved'>('recent');
  const [savedFavorites, setSavedFavorites] = useState<any[]>([]);
  const isFocused = useIsFocused();
  const router = useRouter();

  const loadSavedItems = async () => {
    try {
      const data = await AsyncStorage.getItem('@reuse_favs');
      if (data) setSavedFavorites(JSON.parse(data));
    } catch (e) { console.error(e); }
  };

  useEffect(() => { if (isFocused) loadSavedItems(); }, [isFocused]);

  const handlePress = (item: any) => {
    router.push({
      pathname: "/details" as any,
      params: { ...item, images: Array.isArray(item.images) ? item.images.join(',') : item.images }
    });
  };

  const dataToDisplay = activeTab === 'recent' ? MOCK_PRODUCTS : savedFavorites;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.headerTitle}>Lista de Desejos</ThemedText>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'recent' && styles.activeTabBorder]}
          onPress={() => setActiveTab('recent')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'recent' && styles.activeTabText]}>Recentes</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'saved' && styles.activeTabBorder]}
          onPress={() => setActiveTab('saved')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>Favoritos</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dataToDisplay}
        numColumns={2}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: Array.isArray(item.images) ? item.images[0] : item.images.split(',')[0] }} style={styles.image} />
            </View>
            <ThemedText style={styles.productName} numberOfLines={1}>{item.name}</ThemedText>
            <ThemedText type="defaultSemiBold">R$ {item.price}</ThemedText>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, paddingTop: 60 },
  headerTitle: { marginBottom: 20, fontSize: 24, fontWeight: 'bold' },
  tabContainer: { flexDirection: 'row', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  tabButton: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  activeTabBorder: { borderBottomWidth: 2, borderBottomColor: '#000' },
  tabText: { fontSize: 14, color: '#888' },
  activeTabText: { color: '#000', fontWeight: 'bold' },
  row: { justifyContent: 'space-between', marginBottom: 20 },
  card: { width: (width / 2) - 25 },
  imageContainer: { width: '100%', height: 180, borderRadius: 12, backgroundColor: '#f0f0f0', overflow: 'hidden', marginBottom: 8 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  productName: { fontSize: 14, marginBottom: 4 }
});