// ─── Auth ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface LoginCredentials {
  username: string
  password: string
  rememberMe: boolean
}

// ─── Products ────────────────────────────────────────────────────────────────

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  sku: string
  thumbnail: string
  tags: string[]
  isLocal?: boolean // locally added product (not from API)
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

// Used for the "Add Product" form (only required fields)
export interface NewProductPayload {
  title: string
  price: number
  brand: string
  sku: string
}

// ─── Table / Sort ────────────────────────────────────────────────────────────

export type SortField = 'price' | 'rating' | 'title' | 'brand'
export type SortOrder = 'asc' | 'desc'

export interface TableState {
  page: number
  search: string
  sortBy: SortField | null
  order: SortOrder
  localProducts: Product[]
}

// ─── API params ──────────────────────────────────────────────────────────────

export interface GetProductsParams {
  limit: number
  skip: number
  sortBy?: SortField
  order?: SortOrder
}

export interface SearchProductsParams {
  q: string
  limit: number
  skip: number
}

// ─── API error ───────────────────────────────────────────────────────────────

export interface ApiError {
  message: string
  name?: string
}
