import { useQuery } from '@tanstack/react-query';

export function useProducts() {
  return useQuery({
    queryKey: ['products'], 
    queryFn: async () => {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      return data.products; // Retorna diretamente o array de produtos
    },
    staleTime: 1000 * 60 * 10, // 10 minutos de cache: se mudar de tela, não carrega de novo
  });
}