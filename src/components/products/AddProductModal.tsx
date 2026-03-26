import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useTableStore } from "@/store/tableStore";
import { useState } from "react";

const addProductSchema = z.object({
  title: z.string().min(1, "Введите наименование"),
  price: z
    .string()
    .min(1, "Введите цену")
    .refine(
      (v) => !isNaN(Number(v)) && Number(v) > 0,
      "Цена должна быть числом больше 0",
    ),
  brand: z.string().min(1, "Введите вендора"),
  sku: z.string().min(1, "Введите артикул"),
});

type AddProductFormValues = z.infer<typeof addProductSchema>;

export function AddProductModal() {
  const addLocalProduct = useTableStore((s) => s.addLocalProduct);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: { title: "", price: "", brand: "", sku: "" },
  });

  const onSubmit = (values: AddProductFormValues) => {
    const newProduct = {
      id: Date.now(), // temporary ID for local product
      title: values.title,
      price: Number(values.price),
      brand: values.brand,
      sku: values.sku,
      rating: 0,
      category: "",
      description: "",
      discountPercentage: 0,
      stock: 0,
      tags: [],
      thumbnail: "",
      isLocal: true,
    };

    addLocalProduct(newProduct);
    toast.success("Товар успешно добавлен", {
      description: `«${values.title}» добавлен в список`,
    });
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="md" className="gap-1.5 h-[42px]">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 2.0625C9.23233 2.0625 7.50436 2.58668 6.03459 3.56874C4.56483 4.55081 3.41929 5.94665 2.74283 7.57977C2.06637 9.21288 1.88938 11.0099 2.23424 12.7436C2.57909 14.4773 3.43031 16.0698 4.68024 17.3198C5.93017 18.5697 7.52268 19.4209 9.25638 19.7658C10.9901 20.1106 12.7871 19.9336 14.4202 19.2572C16.0534 18.5807 17.4492 17.4352 18.4313 15.9654C19.4133 14.4956 19.9375 12.7677 19.9375 11C19.935 8.6304 18.9926 6.35856 17.317 4.683C15.6414 3.00743 13.3696 2.065 11 2.0625ZM11 18.5625C9.50428 18.5625 8.04215 18.119 6.7985 17.288C5.55486 16.457 4.58555 15.2759 4.01316 13.894C3.44078 12.5122 3.29101 10.9916 3.58282 9.52463C3.87462 8.05765 4.59487 6.71014 5.65251 5.65251C6.71014 4.59487 8.05765 3.87461 9.52463 3.58281C10.9916 3.29101 12.5122 3.44077 13.894 4.01316C15.2759 4.58555 16.457 5.55485 17.288 6.7985C18.119 8.04215 18.5625 9.50428 18.5625 11C18.5602 13.005 17.7627 14.9272 16.345 16.345C14.9272 17.7627 13.005 18.5602 11 18.5625ZM15.125 11C15.125 11.1823 15.0526 11.3572 14.9236 11.4861C14.7947 11.6151 14.6198 11.6875 14.4375 11.6875H11.6875V14.4375C11.6875 14.6198 11.6151 14.7947 11.4861 14.9236C11.3572 15.0526 11.1823 15.125 11 15.125C10.8177 15.125 10.6428 15.0526 10.5139 14.9236C10.3849 14.7947 10.3125 14.6198 10.3125 14.4375V11.6875H7.5625C7.38017 11.6875 7.2053 11.6151 7.07637 11.4861C6.94744 11.3572 6.875 11.1823 6.875 11C6.875 10.8177 6.94744 10.6428 7.07637 10.5139C7.2053 10.3849 7.38017 10.3125 7.5625 10.3125H10.3125V7.5625C10.3125 7.38016 10.3849 7.2053 10.5139 7.07636C10.6428 6.94743 10.8177 6.875 11 6.875C11.1823 6.875 11.3572 6.94743 11.4861 7.07636C11.6151 7.2053 11.6875 7.38016 11.6875 7.5625V10.3125H14.4375C14.6198 10.3125 14.7947 10.3849 14.9236 10.5139C15.0526 10.6428 15.125 10.8177 15.125 11Z"
              fill="white"
            />
          </svg>
          Добавить
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-cairo text-xl font-bold text-[#2D2F35]">Добавить товар</DialogTitle>
          <DialogDescription className="font-open-sans text-sm text-[#495057]">
            Заполните основные поля для добавления нового товара в список
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          {/* Title */}
          <div className="space-y-1">
            <label
              htmlFor="prod-title"
              className="text-sm font-medium text-[#495057]"
            >
              Наименование <span className="text-danger">*</span>
            </label>
            <Input
              id="prod-title"
              placeholder="Введите наименование товара"
              className="p-4"
              error={!!errors.title}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-danger">{errors.title.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-1">
            <label
              htmlFor="prod-price"
              className="text-sm font-medium text-[#495057]"
            >
              Цена, ₽ <span className="text-danger">*</span>
            </label>
            <Input
              id="prod-price"
              placeholder="0.00"
              inputMode="decimal"
              className="p-4"
              error={!!errors.price}
              {...register("price")}
            />
            {errors.price && (
              <p className="text-xs text-danger">{errors.price.message}</p>
            )}
          </div>

          {/* Brand / Vendor */}
          <div className="space-y-1">
            <label
              htmlFor="prod-brand"
              className="text-sm font-medium text-[#495057]"
            >
              Вендор <span className="text-danger">*</span>
            </label>
            <Input
              id="prod-brand"
              placeholder="Введите вендора"
              className="p-4"
              error={!!errors.brand}
              {...register("brand")}
            />
            {errors.brand && (
              <p className="text-xs text-danger">{errors.brand.message}</p>
            )}
          </div>

          {/* SKU */}
          <div className="space-y-1">
            <label
              htmlFor="prod-sku"
              className="text-sm font-medium text-[#495057]"
            >
              Артикул <span className="text-danger">*</span>
            </label>
            <Input
              id="prod-sku"
              placeholder="Введите артикул"
              className="p-4"
              error={!!errors.sku}
              {...register("sku")}
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
  );
}
