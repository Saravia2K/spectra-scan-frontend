"use client";

import { Test } from "@/common/types/test";
import TestsForm from "@/components/dashboard/forms/tests-form";

export default function EditTestForm() {
  const handleSubmit = (data: Test) => {
    // TODO: conectar con la API
  };

  return (
    <TestsForm
      onSubmit={handleSubmit}
      test={{
        name: "Test 1",
        description: "Descripción test 1",
        cutoff: 1,
      }}
    />
  );
}
