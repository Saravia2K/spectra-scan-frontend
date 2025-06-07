"use client";

import { WithId } from "@/common/types";
import { Test } from "@/common/types/test";
import TestsForm from "@/components/forms/tests-form";
import updateTest from "@/services/test/updateTest";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function EditTestForm({ test }: EditTestFormProps) {
  const router = useRouter();

  const handleSubmit = async (data: Test) => {
    try {
      await updateTest(test.id, data);
      router.push("/dashboard/tests");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al intentar crear un doctor",
      });
    }
  };

  return <TestsForm onSubmit={handleSubmit} test={test} />;
}

type EditTestFormProps = {
  test: WithId<Test>;
};
