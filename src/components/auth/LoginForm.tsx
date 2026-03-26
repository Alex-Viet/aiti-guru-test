import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { AudioWaveIcon } from "@/components/ui/Logo";
import { loginUser } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";

const loginSchema = z.object({
  username: z.string().min(1, "Введите логин"),
  password: z.string().min(1, "Введите пароль"),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const FORM_LABEL_CLASS =
  "font-inter text-lg leading-[150%] font-medium text-[#232323]";
const ICON_BUTTON_CLASS = "text-muted transition-colors hover:text-[#495057]";
const FIELD_ERROR_CLASS = "text-xs text-danger";
const LOGIN_CARD_OUTER_CLASS =
  "relative w-full max-w-[527px] rounded-[40px] bg-white p-[6px] shadow-[0_24px_32px_0_rgba(0,0,0,0.04)]";
const LOGIN_CARD_INNER_CLASS =
  "relative overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,_rgba(35,35,35,0.03)_0%,_rgba(35,35,35,0)_50%)] px-12 py-12";

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
    <div className="flex min-h-screen items-center justify-center bg-page px-4">
      <div className={LOGIN_CARD_OUTER_CLASS}>
        <div className={LOGIN_CARD_INNER_CLASS}>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-[34px] border-x border-t border-[#efefef]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 top-0 w-px"
            style={{
              background:
                "linear-gradient(180deg, rgba(239,239,239,0.95) 0%, rgba(239,239,239,0.9) 88%, rgba(255,255,255,0) 99%)",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-0 right-0 top-0 w-px"
            style={{
              background:
                "linear-gradient(180deg, rgba(239,239,239,0.95) 0%, rgba(239,239,239,0.9) 88%, rgba(255,255,255,0) 99%)",
            }}
          />

          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <AudioWaveIcon />
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="font-inter text-[40px] font-semibold leading-[110%] text-[#232323]">
              Добро пожаловать!
            </h1>
            <p className="mt-3 font-inter font-medium text-lg leading-[150%] text-muted">
              Пожалуйста, авторизируйтесь
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            {/* Username */}
            <div className="space-y-1">
              <label htmlFor="username" className={FORM_LABEL_CLASS}>
                Логин
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Логин"
                autoComplete="username"
                error={!!errors.username}
                leftIcon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="7.25"
                      r="4"
                      stroke="#C9C9C9"
                      strokeWidth="2"
                    />
                    <path
                      d="M9 13.75H15C16.6569 13.75 18 15.0931 18 16.75V20.75H6V16.75C6 15.0931 7.34315 13.75 9 13.75Z"
                      stroke="#CACACA"
                      strokeWidth="2"
                    />
                  </svg>
                }
                rightIcon={
                  usernameValue ? (
                    <button
                      type="button"
                      onClick={() => setValue("username", "")}
                      className={ICON_BUTTON_CLASS}
                      tabIndex={-1}
                    >
                      <svg
                        width="17"
                        height="18"
                        viewBox="0 0 17 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.01031 1.00002L15.0103 17"
                          stroke="#C9C9C9"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M15 1.00002L1 17"
                          stroke="#C9C9C9"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  ) : null
                }
                {...register("username")}
              />
              {errors.username && (
                <p className={FIELD_ERROR_CLASS}>{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className={FORM_LABEL_CLASS}>
                Пароль
              </label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                autoComplete="current-password"
                error={!!errors.password}
                leftIcon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_i_1046_82)">
                      <path
                        d="M17 11V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V11M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H8.8C7.11984 11 6.27976 11 5.63803 11.327C5.07354 11.6146 4.6146 12.0735 4.32698 12.638C4 13.2798 4 14.1198 4 15.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z"
                        stroke="#EDEDED"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_i_1046_82"
                        x="3"
                        y="2"
                        width="18"
                        height="24"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite
                          in2="hardAlpha"
                          operator="arithmetic"
                          k2="-1"
                          k3="1"
                        />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="shape"
                          result="effect1_innerShadow_1046_82"
                        />
                      </filter>
                    </defs>
                  </svg>
                }
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className={ICON_BUTTON_CLASS}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-6 w-6" />
                    ) : (
                      <Eye className="h-6 w-6" />
                    )}
                  </button>
                }
                {...register("password")}
              />
              {errors.password && (
                <p className={FIELD_ERROR_CLASS}>{errors.password.message}</p>
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
            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full font-inter font-semibold text-lg leading-[120%] text-white px-2 py-3 rounded-xl"
                disabled={isPending}
              >
                {isPending ? "Входим..." : "Войти"}
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center">
            <div className="flex items-center gap-2.5">
              <div className="h-px flex-1 bg-[#ededed]" />
              <p
                className="font-inter text-[16px] font-medium leading-[150%] text-[#ebebeb]"
              >
                или
              </p>
              <div className="h-px flex-1 bg-[#ededed]" />
            </div>
            <p className="mt-8 font-inter text-lg leading-[150%] text-[#6c6c6c]">
              Нет аккаунта?{" "}
              <span className="cursor-pointer font-medium text-primary underline hover:no-underline">
                Создать
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
