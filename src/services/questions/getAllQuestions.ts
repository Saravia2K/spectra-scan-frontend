import { WithId } from "@/common/types";
import { TestQuestion } from "@/common/types/test";

export default async function getAllQuestions(testId: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test/${testId}/questions`);
  const data = (await response.json()) as GetAllQuestions;
  return data;
}

export type GetAllQuestions = WithId<TestQuestion>[];
