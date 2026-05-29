import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function AfterLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-8">{children}</main>
      <Footer />
    </div>
  )
}
