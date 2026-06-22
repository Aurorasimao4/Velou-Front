
// src/hooks/useMemories.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Dados falsos — na fase 4 substituís por: import api from '@/lib/api'
const MOCK_MEMORIES = [
  {
    id: 1,
    title: 'O primeiro olhar',
    note: 'Quando ele a viu entrar pela nave da igreja, o tempo parou.',
    date: '2025-06-14T11:30:00',
    category: 'Cerimónia',
    author: 'Mariana',
    reactions: 12,
    comments: 3,
    hasPhoto: false,
  },
  {
    id: 2,
    title: 'Primeira dança',
    note: 'A música escolhida há dois anos finalmente soou.',
    date: '2025-06-14T21:30:00',
    category: 'Recepção',
    author: 'João',
    reactions: 24,
    comments: 7,
    hasPhoto: true,
  },
  {
    id: 3,
    title: 'Discurso do padrinho',
    note: 'Ninguém ficou com os olhos secos.',
    date: '2025-06-14T22:15:00',
    category: 'Recepção',
    author: 'Carlos',
    reactions: 18,
    comments: 5,
    hasPhoto: false,
  },
]

// Simula um pedido à API com um delay
function fetchMemories() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(MOCK_MEMORIES), 600)
  )
}

export function useMemory(id){
  return useQuery({
    queryKey: ['memories', id],
    queryFn: async () => {
      const all = await fetchMemories()
      return all.find((m) => String(m.id) === String(id))
    },
    enabled: !!id, // só corre se houver id
  })
}

function createMemory(newMemory) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id: Date.now(), ...newMemory }), 400)
  )
}

// Hook para ler memórias
export function useMemories() {
  return useQuery({
    queryKey: ['memories'],
    queryFn: fetchMemories,
  })
}

// Hook para criar uma memória
// useMutation é para acções que mudam dados (POST/PUT/DELETE)
export function useCreateMemory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMemory,
    // Quando o servidor confirma, invalida a cache
    // O useQuery re-fetch automaticamente
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memories'] })
    },
  })
}