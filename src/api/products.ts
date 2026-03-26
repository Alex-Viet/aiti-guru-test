import type {
  GetProductsParams,
  ProductsResponse,
  SearchProductsParams,
} from "@/types";
import { API_BASE_URL } from "@/config/env";

/**
 * Fetches a paginated list of products with optional sorting.
 */
export async function getProducts(
  params: GetProductsParams,
): Promise<ProductsResponse> {
  const url = new URL(`${API_BASE_URL}/products`);
  url.searchParams.set("limit", String(params.limit));
  url.searchParams.set("skip", String(params.skip));
  url.searchParams.set(
    "select",
    "id,title,description,category,price,rating,brand,sku,thumbnail,tags,stock,discountPercentage",
  );

  if (params.sortBy) {
    url.searchParams.set("sortBy", params.sortBy);
    url.searchParams.set("order", params.order ?? "asc");
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Ошибка загрузки товаров");
  }

  return (await response.json()) as ProductsResponse;
}

/**
 * Searches products by query string with pagination.
 */
export async function searchProducts(
  params: SearchProductsParams,
): Promise<ProductsResponse> {
  const url = new URL(`${API_BASE_URL}/products/search`);
  url.searchParams.set("q", params.q);
  url.searchParams.set("limit", String(params.limit));
  url.searchParams.set("skip", String(params.skip));
  url.searchParams.set(
    "select",
    "id,title,description,category,price,rating,brand,sku,thumbnail,tags,stock,discountPercentage",
  );

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Ошибка поиска товаров");
  }

  return (await response.json()) as ProductsResponse;
}
