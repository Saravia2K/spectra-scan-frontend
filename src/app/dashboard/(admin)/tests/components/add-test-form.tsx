"use client";

import { Test } from "@/common/types/test";
import TestsForm from "@/components/forms/tests-form";
import createTest from "@/services/test/createTest";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AddTestForm() {
  const router = useRouter();

  const handleSubmit = async (data: Test) => {
    try {
      await createTest(data);
      router.push("/dashboard/tests");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al intentar crear un doctor",
      });
    }
  };

  return <TestsForm onSubmit={handleSubmit} />;
}
