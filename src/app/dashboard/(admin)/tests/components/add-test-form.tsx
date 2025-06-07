"use client";

import { Test } from "@/common/types/test";
import TestsForm from "@/components/dashboard/forms/tests-form";

export default function AddTestForm() {
  const handleSubmit = (data: Test) => {
    // TODO: conectar con la API
  };

  return <TestsForm onSubmit={handleSubmit} />;
}
