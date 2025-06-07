import { WithId } from "@/common/types";
import { Doctor } from "@/common/types/doctor";
import { TestQuestion } from "@/common/types/test";
import { DoctorData } from "@/components/forms/doctores-form";

export default async function createQuestion(question: TestQuestion) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test-question`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question),
  });
  return (await response.json()) as CreateQuestionResponse;
}

export type CreateQuestionResponse = WithId<TestQuestion>;
