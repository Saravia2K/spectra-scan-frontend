import { WithId } from "@/common/types";
import { TestCategory } from "@/common/types/test";

export default async function getAllCategories() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test-question/category`);
  const data = (await response.json()) as GetAllCategoriesResponse;
  return data;
}

export type GetAllCategoriesResponse = WithId<TestCategory>[];
