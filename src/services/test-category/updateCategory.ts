import { WithId } from "@/common/types";
import { TestCategory } from "@/common/types/test";

export default async function updateCategory(id: number, category: Partial<TestCategory>) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test-question/category/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  return (await response.json()) as UpdateCategoryResponse;
}

export type UpdateCategoryResponse = WithId<TestCategory>;
