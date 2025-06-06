"use client";

import DoctoresForm, { TDoctoresFormData } from "./forms/doctores-form";

export default function EditDoctorForm() {
  const handleSubmit = (data: TDoctoresFormData) => {
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
