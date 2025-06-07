"use client";

import ComponentCard from "@/components/common/ComponentCard";
import PatientForm from "@/components/forms/patient-form";

export default function AddPatientForm() {
  return (
    <ComponentCard title="Agregar un paciente">
      <PatientForm onSubmit={() => {}} />
    </ComponentCard>
  );
}
