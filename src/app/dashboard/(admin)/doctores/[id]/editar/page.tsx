import { Metadata } from "next";

import ComponentCard from "@/components/common/ComponentCard";
import EditDoctorForm from "../../components/edit-doctor-form";

export const metadata: Metadata = {
  title: "Agregar doctor | SpectraScan",
};

export default function AgregarDoctorPage() {
  return (
    <ComponentCard title="Editar doctor">
      <EditDoctorForm />
    </ComponentCard>
  );
}
