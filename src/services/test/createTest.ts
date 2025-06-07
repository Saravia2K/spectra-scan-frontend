import { WithId } from "@/common/types";
import { Test } from "@/common/types/test";

export default async function createTest(test: Test) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(test),
  });
  return (await response.json()) as CreateTestResponse;
}

export type CreateTestResponse = WithId<Test>;
