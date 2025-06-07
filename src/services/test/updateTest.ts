import { WithId } from "@/common/types";
import { Test } from "@/common/types/test";

export default async function updateTest(id: number, test: Partial<Test>) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(test),
  });
  return (await response.json()) as UpdateTestResponse;
}

export type UpdateTestResponse = WithId<Test>;
