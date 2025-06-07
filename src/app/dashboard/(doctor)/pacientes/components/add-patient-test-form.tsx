"use client";

import { WithId } from "@/common/types";
import { Patient } from "@/common/types/patient";
import { Test } from "@/common/types/test";
import ComponentCard from "@/components/common/ComponentCard";
import { PatientFormData } from "@/components/forms/patient-form";
import PatientTestForm from "@/components/forms/patient-test-form";
import { useAuthStore } from "@/hooks/useUser";
import createPaciente from "@/services/pacientes/createPaciente";
import assignTest from "@/services/test/assignTest";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AddPatientTestForm({
  patients,
  tests,
}: {
  patients: WithId<Patient>[];
  tests: WithId<Test>[];
}) {
  const router = useRouter();

  const handleOnSubmit = async (data: { patient_id: number; test_id: number }) => {
    try {
      await assignTest(data.patient_id, data.test_id);
      router.push("/dashboard/pacientes/tests");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error al intentar crear un doctor",
      });
    }
  };

  return (
    <ComponentCard title="Agregar un paciente">
      <PatientTestForm onSubmit={handleOnSubmit} patients={patients} tests={tests} />
    </ComponentCard>
  );
}
