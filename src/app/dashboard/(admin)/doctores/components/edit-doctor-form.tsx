"use client";

import DoctoresForm, { DoctorData } from "@/components/forms/doctores-form";

export default function EditDoctorForm() {
  const handleSubmit = (data: DoctorData) => {
    // TODO: conectar con la API
  };

  return (
    <DoctoresForm
      onSubmit={handleSubmit}
      defaultValues={{
        names: "Diego",
        last_names: "Saravia",
        email: "diego@email.com",
      }}
    />
  );
}
