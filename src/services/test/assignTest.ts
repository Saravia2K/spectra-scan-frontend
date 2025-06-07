import { WithId } from "@/common/types";
import { Test } from "@/common/types/test";

export default async function assignTest(patient_id: number, test_id: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test/assign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ patient_id, test_id }),
  });
  return (await response.json()) as CreateTestResponse;
}

export type CreateTestResponse = WithId<Test>;
