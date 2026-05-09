import { User } from "@/types/user";

export async function fetchUserData(userId: number): Promise<User> {
    const response = await fetch(`https://dummyjson.com/user/${userId}`);

    if (!response.ok) {
        console.error(`Erro ao buscar dados do usuário: ${response.statusText}`);
        throw new Error("Ops... Algo deu errado. Tente novamente mais tarde.");
    }

    return response.json();
}

export async function authenticateUser(username: string, password: string): Promise<User> {
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