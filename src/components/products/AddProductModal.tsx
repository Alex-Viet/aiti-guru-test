import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useTableStore } from '@/store/tableStore'
import { useState } from 'react'

const addProductSchema = z.object({
  title: z.string().min(1, 'Введите наименование'),
  price: z
    .string()
    .min(1, 'Введите цену')
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, 'Цена должна быть числом больше 0'),
  brand: z.string().min(1, 'Введите вендора'),
  sku: z.string().min(1, 'Введите артикул'),
})

type AddProductFormValues = z.infer<typeof addProductSchema>

export function AddProductModal() {
  const addLocalProduct = useTableStore((s) => s.addLocalProduct)
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: { title: '', price: '', brand: '', sku: '' },
  })

  const onSubmit = (values: AddProductFormValues) => {
    const newProduct = {
      id: Date.now(), // temporary ID for local product
      title: values.title,
      price: Number(values.price),
      brand: values.brand,
      sku: values.sku,
      rating: 0,
      category: '',
      description: '',
      discountPercentage: 0,
      stock: 0,
      tags: [],
      thumbnail: '',
      isLocal: true,
    }

    addLocalProduct(newProduct)
    toast.success('Товар успешно добавлен', {
      description: `«${values.title}» добавлен в список`,
    })
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="md" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Добавить
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить товар</DialogTitle>
          <DialogDescription>
            Заполните основные поля для добавления нового товара в список
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Title */}
          <div className="space-y-1">
            <label htmlFor="prod-title" className="text-sm font-medium text-[#495057]">
              Наименование <span className="text-danger">*</span>
            </label>
            <Input
              id="prod-title"
              placeholder="Введите наименование товара"
              error={!!errors.title}
              {...register('title')}
            />
            {errors.title && (
              <p className="text-xs text-danger">{errors.title.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-1">
            <label htmlFor="prod-price" className="text-sm font-medium text-[#495057]">
              Цена, ₽ <span className="text-danger">*</span>
            </label>
            <Input
              id="prod-price"
              placeholder="0.00"
              inputMode="decimal"
              error={!!errors.price}
              {...register('price')}
            />
            {errors.price && (
              <p className="text-xs text-danger">{errors.price.message}</p>
            )}
          </div>

          {/* Brand / Vendor */}
          <div className="space-y-1">
            <label htmlFor="prod-brand" className="text-sm font-medium text-[#495057]">
              Вендор <span className="text-danger">*</span>
            </label>
            <Input
              id="prod-brand"
              placeholder="Введите вендора"
              error={!!errors.brand}
              {...register('brand')}
            />
            {errors.brand && (
              <p className="text-xs text-danger">{errors.brand.message}</p>
            )}
          </div>

          {/* SKU */}
          <div className="space-y-1">
            <label htmlFor="prod-sku" className="text-sm font-medium text-[#495057]">
              Артикул <span className="text-danger">*</span>
            </label>
            <Input
              id="prod-sku"
              placeholder="Введите артикул"
              error={!!errors.sku}
              {...register('sku')}
            />
            {errors.sku && (
              <p className="text-xs text-danger">{errors.sku.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary" size="md">
                Отмена
              </Button>
            </DialogClose>
            <Button type="submit" variant="primary" size="md">
              Добавить
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
