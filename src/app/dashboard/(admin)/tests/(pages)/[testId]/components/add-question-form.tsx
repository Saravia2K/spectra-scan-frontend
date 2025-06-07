"use client";

import { Test } from "@/common/types/test";
import TestQuestionForm from "@/components/forms/test-question-form";

export default function AddTestQuestionForm() {
  const handleSubmit = (data: Test) => {
    // TODO: conectar con la API
  };

  return <TestQuestionForm onSubmit={() => {}} />;
}
