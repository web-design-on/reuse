
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Hello, World!</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 8,
  },
});