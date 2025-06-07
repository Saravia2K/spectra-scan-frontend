import { WithId } from "@/common/types";
import { Test } from "@/common/types/test";

export default async function getAllTests() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test`);
  return (await response.json()) as GetAllTestsResponse;
}

export type GetAllTestsResponse = WithId<Test>[];
