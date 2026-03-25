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
          'h-6 w-6 shrink-0 rounded border border-[#CED4DA] bg-white',
          'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:#242edb',
          'data-[state=checked]:bg-[#242edb] data-[state=checked]:border-[#242edb]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
          <Check className="h-4 w-4" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={id}
          className="font-inter text-base leading-[150%] font-medium cursor-pointer select-none text-[#9c9c9c]"
        >
          {label}
        </label>
      )}
    </div>
  )
}

export { Checkbox }
