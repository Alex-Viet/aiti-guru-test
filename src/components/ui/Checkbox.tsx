import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string
}

function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <CheckboxPrimitive.Root
        id={id}
        className={cn(
          'h-4 w-4 shrink-0 rounded border border-[#CED4DA] bg-white',
          'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
          <Check className="h-3 w-3" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={id}
          className="cursor-pointer select-none text-sm text-[#495057]"
        >
          {label}
        </label>
      )}
    </div>
  )
}

export { Checkbox }
