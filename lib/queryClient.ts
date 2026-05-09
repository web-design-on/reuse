import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2, // Quantidade de tentativas em caso de falha
            staleTime: 1000 * 60, // Tempo em milissegundos para considerar os dados "frescos" (1 minuto)
        },
    },
});   