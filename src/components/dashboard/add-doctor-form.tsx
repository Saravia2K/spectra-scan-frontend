"use client";

import DoctoresForm, { TDoctoresFormData } from "./forms/doctores-form";

export default function AddDoctorForm() {
  const handleSubmit = (data: TDoctoresFormData) => {
    // TODO: conectar con la API
  };

  return <DoctoresForm onSubmit={handleSubmit} />;
}
