# Aiti Guru — Products Admin Panel

Тестовое задание: SPA для управления списком товаров с авторизацией.

## Стек

| Технология | Назначение | Обоснование |
|---|---|---|
| **React 19 + Vite** | UI + сборка | Instant HMR, оптимальный production bundle, нет оверхеда SSR |
| **TypeScript** (`strict: true`) | Типизация | Обязательное условие ТЗ |
| **React Router v6** | Маршрутизация | Стандарт для SPA, protected routes |
| **Zustand** | Глобальный стейт | Минимальный бойлерплейт, нет Provider, persist middleware |
| **TanStack Query v5** | Server state | Кэш, loading states, paginated queries, invalidation |
| **TailwindCSS v3** | Стили | Utility-first, нет runtime, точное воспроизведение дизайна |
| **Radix UI** | Headless компоненты | Доступность (a11y), Checkbox, Dialog без навязанных стилей |
| **React Hook Form + Zod** | Формы | Типобезопасная валидация, минимум ре-рендеров |
| **Sonner** | Toast-уведомления | Современный API, красивая анимация |
| **Lucide React** | Иконки | Лёгкие SVG-иконки, tree-shakeable |

## Запуск

```bash
npm install
npm run dev
```

Приложение запустится на `http://localhost:5173`

Приложение доступно на `https://aiti-guru-test-sigma.vercel.app/`

## Тестовые учётные данные

Используются учётные данные из [DummyJSON Users](https://dummyjson.com/users):

- **Логин:** `emilys`
- **Пароль:** `emilyspass`

## Функциональность

### Авторизация
- Валидация полей через Zod (обязательность)
- Показ ошибок API под полями
- Чекбокс «Запомнить данные»: токен → `localStorage` (постоянно) или `sessionStorage` (до закрытия вкладки)

### Таблица товаров
- Загрузка данных из DummyJSON API (20 штук на страницу)
- Skeleton-loader при первоначальной загрузке
- Прогресс-бар при перезагрузке (isFetching)
- Рейтинг < 3.5 подсвечивается красным
- Форматирование цены: `48 652,00`

### Поиск
- Debounce 400ms, запросы к `/products/search?q=`
- Сброс пагинации при изменении запроса

### Сортировка
- Кнопка (3 полоски) открывает дропдаун: поле + направление
- API-сортировка через параметры `sortBy` / `order` для цены, рейтинга, наименования
- Сортировка по вендору — клиентская (DummyJSON не поддерживает стабильную серверную сортировку по `brand`): загружается весь список и сортируется локально
- Состояние сортировки хранится в Zustand

### Добавление товара
- Кнопка «Добавить» → Dialog с формой (4 поля + валидация)
- Оптимистичное добавление в начало таблицы (без API-запроса)
- Toast-уведомление об успешном добавлении

### Обновление (Refresh)
- Кнопка (2 стрелки) → `queryClient.invalidateQueries`
- Анимация вращения иконки при загрузке

### Пагинация
- «Показано X–Y из Z»
- Кнопки страниц с многоточием для длинных списков

## Структура проекта

```
src/
├── api/
│   ├── auth.ts              # loginUser, getAuthUser
│   └── products.ts          # getProducts, searchProducts
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx    # Форма входа (RHF + Zod)
│   │   ├── ProtectedRoute.tsx  # Guard: редирект на /login если нет токена
│   │   └── PublicRoute.tsx     # Guard: редирект на / если авторизован
│   ├── products/
│   │   ├── AddProductModal.tsx      # Модалка добавления товара
│   │   ├── Pagination.tsx           # Пагинация с многоточием
│   │   ├── productTableClasses.ts   # Общие Tailwind-константы таблицы
│   │   ├── ProductsSearch.tsx       # Поиск с debounce 400ms
│   │   ├── ProductsTable.tsx        # Основная таблица товаров
│   │   ├── ProductTableRow.tsx      # Строка таблицы
│   │   ├── SortDrawer.tsx           # Дропдаун сортировки
│   │   └── TableSkeleton.tsx        # Skeleton-loader строк
│   └── ui/
│       ├── Button.tsx       # Кнопка (cva: primary, secondary, ghost)
│       ├── Checkbox.tsx     # Radix UI Checkbox
│       ├── Dialog.tsx       # Radix UI Dialog
│       ├── Input.tsx        # Инпут с leftIcon / rightIcon / error
│       └── Logo.tsx         # SVG-логотип (AudioWaveIcon)
├── config/
│   ├── constants.ts         # PAGE_SIZE и другие константы приложения
│   └── env.ts               # VITE_API_BASE_URL с fallback
├── hooks/
│   ├── useClickOutside.ts   # Закрытие по клику вне элемента
│   ├── useDebounce.ts       # Debounce значения с задержкой
│   └── useProducts.ts       # TanStack Query: загрузка и поиск товаров
├── lib/
│   ├── queryClient.ts       # Настройки QueryClient
│   └── utils.ts             # cn, formatPrice, capitalize
├── pages/
│   ├── LoginPage.tsx        # Страница авторизации
│   └── ProductsPage.tsx     # Страница с таблицей товаров
├── router/
│   └── index.tsx            # createBrowserRouter: /login, /, *
├── store/
│   ├── authStore.ts         # Zustand: user, accessToken, rememberMe + persist
│   └── tableStore.ts        # Zustand: page, search, sort, localProducts
└── types/
    └── index.ts             # Product, AuthUser, SortField, ApiError и др.
```
