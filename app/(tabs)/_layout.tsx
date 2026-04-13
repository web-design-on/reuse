import { useThemeColor } from '@/hooks/use-theme-color';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

function TabIcon({
  name,
  color,
  focused
}: {
  name: ComponentProps<typeof Ionicons>['name'];
  color: string;
  focused: boolean
}) {
  return (
    <View style={styles.iconContainer}>
      <Ionicons name={name} size={26} color={color} />
      {focused && <View style={[styles.indicator, { backgroundColor: color }]} />}
    </View>
  );
}

export default function TabLayout() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const activeColor = useThemeColor({}, 'text');
  const inactiveColor = useThemeColor({}, 'tint');
  const bgColor = useThemeColor({}, 'background');
  const borderColor = '#E5E5E5';

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: bgColor,
          borderTopWidth: 1,
          borderTopColor: borderColor,
          height: Platform.OS === 'ios' ? 88 : 95,
          paddingBottom: 25,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? 'home' : 'home-outline'}
              color={focused ? activeColor : inactiveColor}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? 'heart' : 'heart-outline'}
              color={focused ? activeColor : inactiveColor}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          title: 'Mensagens',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? 'mail' : 'mail-outline'}
              color={focused ? activeColor : inactiveColor}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? 'bag-handle' : 'bag-handle-outline'}
              color={focused ? activeColor : inactiveColor}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? 'person' : 'person-outline'}
              color={focused ? activeColor : inactiveColor}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 45,
    marginTop: 10, 
  },
  indicator: {
    position: 'absolute',
    bottom: 1,
    height: 3,
    width: 20,
    borderRadius: 10,
  },
});