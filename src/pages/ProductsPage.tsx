import { LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useTableStore } from '@/store/tableStore'
import { queryClient } from '@/lib/queryClient'
import { ProductsTable } from '@/components/products/ProductsTable'
import { ProductsSearch } from '@/components/products/ProductsSearch'

export default function ProductsPage() {
  const logout = useAuthStore((s) => s.logout)
  const reset = useTableStore((s) => s.reset)

  const handleLogout = () => {
    reset()
    void queryClient.clear()
    logout()
  }

  return (
    <div className="min-h-screen bg-page">
      {/* Top header */}
      <header className="sticky top-0 z-30 border-b border-border bg-white shadow-card">
        <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-6 py-3">
          <h1 className="text-xl font-bold text-[#212529]">Товары</h1>

          {/* Search */}
          <div className="flex-1">
            <ProductsSearch />
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-[#F1F3F5] hover:text-[#495057] focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="Выйти"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Выйти</span>
          </button>
        </div>
      </header>

      {/* Page content */}
      <main className="mx-auto max-w-[1280px] px-6 py-6">
        <ProductsTable />
      </main>
    </div>
  )
}
