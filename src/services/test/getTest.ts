import { WithId } from "@/common/types";
import { Test } from "@/common/types/test";

export default async function getTest(id: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test/${id}`);
  const data = (await response.json()) as GetTestsResponse;
  return data;
}

export type GetTestsResponse = WithId<Test>;
