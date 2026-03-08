import { Tabs } from 'expo-router';
import React, { ComponentProps } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function TabLayout() {
  const activeColor = useThemeColor({}, 'text'); 
  const inactiveColor = useThemeColor({}, 'tint');
  const bgColor = useThemeColor({}, 'background');
  const borderColor = '#E5E5E5'; 

  return (
    <Tabs
      screenOptions={{
        headerShown: true, 
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
          height: Platform.OS === 'ios' ? 88 : 70, 
          paddingBottom: Platform.OS === 'ios' ? 25 : 0,
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