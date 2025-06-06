import { Metadata } from "next";

import ComponentCard from "@/components/common/ComponentCard";
import AddDoctorForm from "@/components/dashboard/add-doctor-form";

export const metadata: Metadata = {
  title: "Agregar doctor | SpectraScan",
};

export default function AgregarDoctorPage() {
  return (
    <ComponentCard title="Agregar nuevo doctor">
      <AddDoctorForm />
    </ComponentCard>
  );
}
