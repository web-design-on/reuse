import { User } from "@/types/user";

export async function fetchUserData(userId: number): Promise<User> {
    const response = await fetch(`https://dummyjson.com/user/${userId}`);

    if (!response.ok) {
        console.error(`Erro ao buscar dados do usuário: ${response.statusText}`);
        throw new Error("Ops... Algo deu errado. Tente novamente mais tarde.");
    }

    return response.json();
}