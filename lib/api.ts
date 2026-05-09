import { AuthResponse, User } from "@/types/user";
import * as SecureStore from 'expo-secure-store';

export async function storeTokens(accessToken: string, refreshToken: string): Promise<void> {
    try {
        await SecureStore.setItemAsync('accessToken', accessToken);
        await SecureStore.setItemAsync('refreshToken', refreshToken);
    } catch (error) {
        console.error("Erro ao armazenar tokens:", error);
        throw error;
    }
}

export async function getAccessToken(): Promise<string | null> {
    try {
        return await SecureStore.getItemAsync('accessToken');
    } catch (error) {
        console.error("Erro ao recuperar access token:", error);
        return null;
    }
}

export async function getRefreshToken(): Promise<string | null> {
    try {
        return await SecureStore.getItemAsync('refreshToken');
    } catch (error) {
        console.error("Erro ao recuperar refresh token:", error);
        return null;
    }
}

export async function clearTokens(): Promise<void> {
    try {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
    } catch (error) {
        console.error("Erro ao limpar tokens:", error);
        throw error;
    }
}

export async function fetchUserData(userId: number): Promise<User> {
    const accessToken = await getAccessToken();
    
    const response = await fetch(`https://dummyjson.com/user/${userId}`, {
        headers: {
            ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
        },
    });

    if (!response.ok) {
        console.error(`Erro ao buscar dados do usuário: ${response.statusText}`);
        throw new Error("Ops... Algo deu errado. Tente novamente mais tarde.");
    }

    return response.json();
}

export async function authenticateUser(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`https://dummyjson.com/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, expiresInMins: 30 }),
        credentials: 'include',
    });

    if (!response.ok) {
        if (response.status === 400) {
            throw new Error("Credenciais inválidas. Por favor, revise os dados e tente novamente.");
        }

        console.error(`Erro ao autenticar usuário: ${response.statusText}, ${response.status}, ${await response.text()}`);
        throw new Error("Ops... Algo deu errado. Tente novamente mais tarde.");
    }
    
    return response.json();
}

export async function refreshAccessToken(): Promise<string | null> {
    const refreshToken = await getRefreshToken();
    
    if (!refreshToken) {
        console.error("Refresh token não encontrado");
        return null;
    }

    try {
        const response = await fetch(`https://dummyjson.com/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
            credentials: 'include',
        });

        if (!response.ok) {
            console.error(`Erro ao renovar token: ${response.statusText}`);
            await clearTokens();
            return null;
        }

        const data = await response.json();
        
        await storeTokens(data.accessToken, refreshToken);
        
        return data.accessToken;
    } catch (error) {
        console.error("Erro ao renovar access token:", error);
        return null;
    }
}

export async function logoutUser(): Promise<void> {
    await clearTokens();
}