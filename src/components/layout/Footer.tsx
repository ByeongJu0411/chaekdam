export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white py-6">
      <div className="mx-auto max-w-7xl px-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-indigo-600">
            <span className="text-[9px] font-black text-white">책</span>
          </div>
          <span className="text-xs font-bold text-slate-400">책담</span>
        </div>
        <p className="text-xs text-slate-400">© 2026 책담. All rights reserved.</p>
      </div>
    </footer>
  )
}
