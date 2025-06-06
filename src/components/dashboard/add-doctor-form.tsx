"use client";

import DoctoresForm, { TDoctoresFormFields } from "./forms/doctores-form";

export default function AddDoctorForm() {
  const handleSubmit = (data: TDoctoresFormFields) => {
    // TODO: conectar con la API
  };

  return <DoctoresForm onSubmit={handleSubmit} />;
}
