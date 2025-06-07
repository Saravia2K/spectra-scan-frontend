"use client";

import { Test } from "@/common/types/test";
import TestQuestionForm from "@/components/forms/test-question-form";

export default function EditTestQuestionForm() {
  const handleSubmit = (data: Test) => {
    // TODO: conectar con la API
  };

  return (
    <TestQuestionForm
      onSubmit={() => {}}
      question={{
        text: "Sexo",
        category_id: 2,
      }}
    />
  );
}
