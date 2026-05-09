import { useProducts } from '@/hooks/use-Products';
import { fetchUserData } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const BLUE = '#4F40E2';


const stories = [
  { id: '1', source: require('../../assets/images/following1.png'), isLive: true },
  { id: '2', source: require('../../assets/images/following2.png'), isLive: false },
  { id: '3', source: require('../../assets/images/following3.png'), isLive: false },
  { id: '4', source: require('../../assets/images/following04.png'), isLive: false },
];

export default function ProfileScreen() {
  const [activeOrder, setActiveOrder] = useState('pay');
  const router = useRouter();
  const { data: recentProducts, isLoading } = useProducts();

  const handleProductPress = (item: any) => {
    router.push({
      pathname: "/details" as any,
      params: {
        ...item,
        images: Array.isArray(item.images) ? item.images.join(',') : (item.images || item.thumbnail),
        tags: Array.isArray(item.tags) ? item.tags.join(',') : item.tags,
        dimensions: typeof item.dimensions === 'object' ? JSON.stringify(item.dimensions) : item.dimensions
      }
    });
  };

  const { data } = useQuery({
    queryKey: ['userId', 1],
    queryFn: () => fetchUserData(1)
  });

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Image
          source={data?.image ? { uri: data.image } : require('../../assets/images/user.jpg')}
          style={styles.avatarHeader}
        />

        <Text style={styles.btnActivity}>
          <Text style={styles.btnActivityText}>Meu perfil</Text>
        </Text>

        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Image source={require('../../assets/images/Vouchers.png')} style={styles.iconImg} />
          </TouchableOpacity>

          <TouchableOpacity style={{ position: 'relative' }}>
            <Image source={require('../../assets/images/Top Menu.png')} style={styles.iconImg} />
            <View style={styles.dotBadge} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={require('../../assets/images/Settings.png')} style={styles.iconImg} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.section}>
          <Text style={styles.greeting}>Olá, {data?.firstName}!</Text>
        </View>

        <View style={styles.announcementCard}>
          <View style={styles.announcementText}>
            <Text style={styles.announcementTitle}>Notificação</Text>
            <Text style={styles.announcementBody}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{'\n'}
              Maecenas hendrerit luctus libero ac vulputate.
            </Text>
          </View>
          <TouchableOpacity style={styles.announcementArrow}>
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visto recentemente</Text>
          {isLoading ? (
            <Text style={{ marginTop: 10, color: '#888' }}>Carregando...</Text>
          ) : (
            <FlatList
              data={recentProducts}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item?.id?.toString()}
              contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
              renderItem={({ item }) => {
                const imageUrl = Array.isArray(item.images) 
                  ? item.images[0] 
                  : (typeof item.images === 'string' ? item.images.split(',')[0] : item.thumbnail);
                  
                return (
                  <TouchableOpacity onPress={() => handleProductPress(item)}>
                    <View style={styles.recentAvatarContainer}>
                      <Image source={{ uri: imageUrl }} style={styles.recentAvatar} />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meus pedidos</Text>
          <View style={styles.ordersRow}>
            <TouchableOpacity
              style={styles.orderBtn}
              onPress={() => setActiveOrder('pay')}
            >
              <Text style={styles.orderBtnText}>A pagar</Text>
            </TouchableOpacity>

            <View style={{ position: 'relative' }}>
              <TouchableOpacity
                style={styles.orderBtn}
                onPress={() => setActiveOrder('receive')}
              >
                <Text style={styles.orderBtnText}>A receber</Text>
              </TouchableOpacity>
              <View style={styles.orderDot} />
            </View>

            <TouchableOpacity
              style={styles.orderBtn}
              onPress={() => setActiveOrder('review')}
            >
              <Text style={styles.orderBtnText}>A avaliar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seguindo</Text>
          <FlatList
            data={stories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
            renderItem={({ item }) => (
              <View style={styles.storyCard}>
                <Image source={item.source} style={styles.storyThumb} />
                {item.isLive && (
                  <View style={styles.liveBadge}>
                    <Text style={styles.liveText}>Ao vivo</Text>
                  </View>
                )}
                {!item.isLive && (
                  <View style={styles.playBtn}>
                    <Text style={styles.playIcon}>▶</Text>
                  </View>
                )}
              </View>
            )}
          />
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  avatarHeader: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  btnActivity: {
    flex: 1,
    backgroundColor: BLUE,
    borderRadius: 24,
    paddingVertical: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
  btnActivityText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconImg: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  dotBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BLUE,
    borderWidth: 1.5,
    borderColor: '#fff',
  },

  section: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 2,
  },

  announcementCard: {
    marginHorizontal: 16,
    backgroundColor: '#F5F6FA',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  announcementText: {
    flex: 1,
  },
  announcementTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#111',
    marginBottom: 4,
  },
  announcementBody: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  announcementArrow: {
    backgroundColor: BLUE,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  arrowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  recentAvatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  recentAvatar: {
    width: 64,
    height: 100,
    resizeMode: 'cover',
    top: -5,
  },

  ordersRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  orderBtn: {
    backgroundColor: '#E5EBFC',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  orderBtnText: {
    fontSize: 14,
    color: '#4F40E2',
    fontWeight: '500',
  },
  orderDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    borderWidth: 1.5,
    borderColor: '#fff',
  },

  storyCard: {
    width: (width - 52) / 3,
    height: 160,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  storyThumb: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  liveBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  liveText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  playBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -16,
    marginLeft: -16,
    backgroundColor: 'rgba(255,255,255,0.85)',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 12,
    color: '#333',
    marginLeft: 2,
  },

});
