# Aiti Guru — Products Admin Panel

Тестовое задание: SPA для управления списком товаров с авторизацией.

## Стек

| Технология | Назначение | Обоснование |
|---|---|---|
| **React 18 + Vite** | UI + сборка | Instant HMR, оптимальный production bundle, нет оверхеда SSR |
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
- API-сортировка через параметры `sortBy` / `order`
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
├── api/            # Типизированные API-функции (auth, products)
├── components/
│   ├── ui/         # Переиспользуемые компоненты (Button, Input, Checkbox, Dialog)
│   ├── auth/       # LoginForm
│   └── products/   # ProductsTable, ProductTableRow, AddProductModal, SortDrawer, Pagination
├── hooks/          # useProducts (TanStack Query), useDebounce
├── lib/            # queryClient, utils (cn, formatPrice)
├── pages/          # LoginPage, ProductsPage
├── router/         # Маршруты + ProtectedRoute
├── store/          # authStore (persist), tableStore
└── types/          # Все TypeScript типы
```
