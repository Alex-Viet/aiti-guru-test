import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { loginUser } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";

const loginSchema = z.object({
  username: z.string().min(1, "Введите логин"),
  password: z.string().min(1, "Введите пароль"),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function AudioWaveIcon() {
  return (
    <div className="flex items-center justify-center">
      <img src="/logo.svg" alt="Aiti Guru logo" width="52" height="52" />
    </div>
  );
}

export function LoginForm() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "", rememberMe: false },
  });

  const rememberMe = watch("rememberMe");
  const usernameValue = watch("username");

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      setAuth(user, rememberMe);
      navigate("/", { replace: true });
    },
    onError: (error: Error) => {
      setApiError(error.message);
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    setApiError(null);
    mutate({ username: values.username, password: values.password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-[400px] rounded-2xl bg-white bg-[linear-gradient(180deg,_rgba(35,35,35,0.03)_0%,_rgba(35,35,35,0)_50%)] px-8 py-10 shadow-card-lg">
        {/* Logo */}
        <div className="flex justify-center">
          <AudioWaveIcon />
        </div>

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#212529]">
            Добро пожаловать!
          </h1>
          <p className="mt-1 text-sm text-muted">Пожалуйста, авторизируйтесь</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          {/* Username */}
          <div className="space-y-1">
            <label
              htmlFor="username"
              className="text-sm font-medium text-[#495057]"
            >
              Логин
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Логин"
              autoComplete="username"
              error={!!errors.username}
              leftIcon={<User className="h-4 w-4" />}
              rightIcon={
                usernameValue ? (
                  <button
                    type="button"
                    onClick={() => setValue("username", "")}
                    className="text-muted transition-colors hover:text-[#495057]"
                    tabIndex={-1}
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : null
              }
              {...register("username")}
            />
            {errors.username && (
              <p className="text-xs text-danger">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[#495057]"
            >
              Пароль
            </label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              autoComplete="current-password"
              error={!!errors.password}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-muted transition-colors hover:text-[#495057]"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-danger">{errors.password.message}</p>
            )}
          </div>

          {/* Remember me */}
          <Checkbox
            id="rememberMe"
            label="Запомнить данные"
            checked={rememberMe}
            onCheckedChange={(checked) =>
              setValue("rememberMe", checked === true)
            }
          />

          {/* API error */}
          {apiError && (
            <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-danger">
              {apiError}
            </div>
          )}

          {/* Submit */}
          <div className="pt-1">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Входим..." : "Войти"}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-sm text-muted">или</p>
          <p className="mt-2 text-sm text-[#495057]">
            Нет аккаунта?{" "}
            <span className="cursor-pointer font-medium text-primary hover:underline">
              Создать
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
