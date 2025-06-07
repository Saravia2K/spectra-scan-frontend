"use client";

import { WithId } from "@/common/types";
import { TestCategory, TestQuestion } from "@/common/types/test";
import TestQuestionForm from "@/components/forms/test-question-form";
import createQuestion from "@/services/questions/createDoctor";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AddTestQuestionForm({
  categories,
}: {
  categories: WithId<TestCategory>[];
}) {
  const { testId } = useParams<{ testId: string }>();
  const router = useRouter();

  const handleSubmit = async (data: Omit<TestQuestion, "test_id">) => {
    try {
      await createQuestion({ ...data, test_id: +testId });
      router.push(`/dashboard/tests/${testId}/preguntas`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al intentar crear un doctor",
      });
    }
  };

  return <TestQuestionForm onSubmit={handleSubmit} categories={categories} />;
}
