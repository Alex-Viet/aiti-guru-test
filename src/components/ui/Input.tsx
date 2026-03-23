import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightIcon, error, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 flex items-center text-muted">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'h-11 w-full rounded-lg border bg-white px-3 text-sm text-[#212529] placeholder:text-muted',
            'transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-danger focus:ring-danger/40 focus:border-danger',
            !error && 'border-border',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
