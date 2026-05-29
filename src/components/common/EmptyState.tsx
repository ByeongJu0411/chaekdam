interface EmptyStateProps {
  message: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ message, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 text-3xl">
        📭
      </div>
      <p className="mt-5 text-base font-semibold text-slate-700">{message}</p>
      {description && (
        <p className="mt-1.5 text-sm text-slate-400">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
