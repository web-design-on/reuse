
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function Loginscreen() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleEntrar = () => {
        console.log('Login:', email, senha);
    };

    const handleCancelar = () => {
        console.log('Cancelado');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            <Image
                source={require('../../assets/images/bubble04.png')}
                style={styles.bubble04}
                resizeMode="contain"
            />

            <Image
                source={require('../../assets/images/bubble02.png')}
                style={styles.bubble02}
                resizeMode="contain"
            />

            <Image
                source={require('../../assets/images/bubble01.png')}
                style={styles.bubble01}
                resizeMode="contain"
            />

            <Image
                source={require('../../assets/images/bubble03.png')}
                style={styles.bubble03}
                resizeMode="contain"
            />

            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.content}>
                    <View style={styles.headerSection}>
                        <Text style={styles.title}>Login</Text>
                        <Text style={styles.subtitle}>
                            Que bom te ver de novo! <Text style={styles.heart}>♥</Text>
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            placeholderTextColor="#aaa"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            placeholderTextColor="#aaa"
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry
                        />

                        <TouchableOpacity
                            style={styles.btnEntrar}
                            onPress={handleEntrar}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.btnEntrarText}>Entrar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btnCancelar}
                            onPress={handleCancelar}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.btnCancelarText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardView: {
        flex: 1,
    },

    bubble01: {
        position: 'absolute',
        top: 0,
        left: -20,
        width: width * 0.60,
        height: width * 0.60,
        zIndex: 3,
    },
    bubble02: {
        position: 'absolute',
        top: 80,
        left: 0,
        width: width * 0.55,
        height: width * 0.55,
        zIndex: 2,
    },
    bubble03: {
        position: 'absolute',
        top: 200,
        right: -15,
        width: width * 0.20,
        height: width * 0.20,
        zIndex: 3,
    },
    bubble04: {
        position: 'absolute',
        top: -50,
        left:200,
        width: width * 0.55,
        height: width * 3.00,
        zIndex: 0,
        opacity: 1.18,
    },

    content: {
        flex: 1,
        paddingHorizontal: 28,
        justifyContent: 'center',
        marginTop: height * 0.24,
    },
    headerSection: {
        marginBottom: 32,
    },
    title: {
        fontSize: 42,
        fontWeight: '700',
        color: '#111',
        letterSpacing: -0.5,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        color: '#555',
        fontWeight: '400',
    },
    heart: {
        color: '#111',
    },

    // ── Formulário ──
    form: {
        gap: 14,
    },
    input: {
        backgroundColor: '#F8F8F8',
        borderRadius: 14,
        height: 54,
        paddingHorizontal: 18,
        fontSize: 15,
        color: '#222',
        marginBottom: 2,
    },
    btnEntrar: {
        backgroundColor: '#4F40E2',
        borderRadius: 14,
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    btnEntrarText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    btnCancelar: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    btnCancelarText: {
        color: '#555',
        fontSize: 15,
        fontWeight: '400',
    },
});
