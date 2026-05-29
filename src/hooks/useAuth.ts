'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMe } from '@/lib/api/users'
import { logout } from '@/lib/api/auth'

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear()
      window.location.href = '/login'
    },
  })
}
