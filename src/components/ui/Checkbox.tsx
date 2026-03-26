import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {
  label?: string;
}

function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <CheckboxPrimitive.Root
        id={id}
        className={cn(
          "h-[22px] w-[22px] cursor-pointer rounded-[4px] border border-[#b2b3b9] bg-white",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:secondary",
          "data-[state=checked]:bg-secondary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      ></CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={id}
          className="font-inter text-base leading-[150%] font-medium cursor-pointer select-none text-[#9c9c9c]"
        >
          {label}
        </label>
      )}
    </div>
  );
}

export { Checkbox };
