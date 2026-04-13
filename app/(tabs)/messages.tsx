import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

interface Message {
  id: string;
  text: string;
  image?: string;
  sender: 'me' | 'other';
}

export default function MessagesScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');


  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const savedChat = await AsyncStorage.getItem('@reuse_chat_1');
    if (savedChat) setMessages(JSON.parse(savedChat));
  };

  const saveMessages = async (newMessages: Message[]) => {
    await AsyncStorage.setItem('@reuse_chat_1', JSON.stringify(newMessages));
  };

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    const newMessage: Message = { id: Date.now().toString(), text: inputText, sender: 'me' };
    const updated = [...messages, newMessage];
    setMessages(updated);
    saveMessages(updated);
    setInputText('');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      const newMessage: Message = { id: Date.now().toString(), text: '', image: result.assets[0].uri, sender: 'me' };
      const updated = [...messages, newMessage];
      setMessages(updated);
      saveMessages(updated);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Cabeçalho de Contexto */}
      <ThemedView style={styles.header}>
        <ThemedText type="defaultSemiBold">Chat: Reutilização de Item</ThemedText>
      </ThemedView>

      {/* Lista de Mensagens (Bolhas) */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={[styles.bubble, item.sender === 'me' ? styles.myBubble : styles.otherBubble]}>
            {item.text ? <ThemedText style={item.sender === 'me' ? { color: 'white' } : { color: 'black' }}>{item.text}</ThemedText> : null}
            {item.image && <Image source={{ uri: item.image }} style={styles.messageImage} />}
          </ThemedView>
        )}
        contentContainerStyle={styles.chatList}
      />

      {/* Campo de Digitação Fixo */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
        <ThemedView style={styles.inputContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
            <Ionicons name="camera" size={24} color="#6B4EFF" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite uma mensagem..."
            placeholderTextColor="#999"
            onSubmitEditing={sendMessage}
            returnKeyType="send"
            blurOnSubmit={false}
          />

          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </ThemedView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center', paddingTop: 60 },
  chatList: { padding: 16 },
  bubble: {
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: '80%',
  },
  myBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#6B4EFF',
    borderBottomRightRadius: 2,
  },
  otherBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    borderBottomLeftRadius: 2,
  },
  messageImage: { width: 200, height: 150, borderRadius: 10, marginTop: 5 },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginBottom: 20
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  iconButton: { padding: 5 },
  sendButton: {
    backgroundColor: '#6B4EFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});