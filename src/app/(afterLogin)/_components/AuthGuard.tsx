import { verifySession } from '@/lib/dal'

export async function AuthGuard({ children }: { children: React.ReactNode }) {
  await verifySession()
  return <>{children}</>
}
