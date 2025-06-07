"use client";

import DoctoresForm, { DoctorData } from "@/components/forms/doctores-form";

export default function AddDoctorForm() {
  const handleSubmit = (data: DoctorData) => {
    // TODO: conectar con la API
  };

  return <DoctoresForm onSubmit={handleSubmit} />;
}
