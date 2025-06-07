"use client";

import ComponentCard from "@/components/common/ComponentCard";
import PatientForm, { PatientFormData } from "@/components/forms/patient-form";
import { useAuthStore } from "@/hooks/useUser";
import createPaciente from "@/services/pacientes/createPaciente";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AddPatientForm() {
  const router = useRouter();

  const handleOnSubmit = async (data: PatientFormData) => {
    try {
      const doctor_id = useAuthStore.getState().doctor?.id ?? 0;
      console.log({ doctor_id });
      await createPaciente({ ...data, doctor_id: +doctor_id });
      router.push("/dashboard/pacientes");
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
      <PatientForm onSubmit={handleOnSubmit} />
    </ComponentCard>
  );
}
