import { cn } from '@/lib/utils/cn'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed',
        {
          primary: 'bg-blue-500 text-white shadow-sm shadow-blue-500/20 hover:bg-blue-600 hover:shadow-blue-500/30',
          secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200',
          outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300',
          ghost: 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
          danger: 'bg-red-500 text-white shadow-sm shadow-red-500/20 hover:bg-red-600',
        }[variant],
        { sm: 'h-8 px-3 text-xs', md: 'h-9 px-4 text-sm', lg: 'h-11 px-6 text-sm' }[size],
        className
      )}
      {...props}
    />
  )
}
