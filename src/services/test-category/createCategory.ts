import { WithId } from "@/common/types";
import { TestCategory } from "@/common/types/test";

export default async function createCategory(category: TestCategory) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test-question/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  return (await response.json()) as CreateCategoryResponse;
}

export type CreateCategoryResponse = WithId<TestCategory>;
