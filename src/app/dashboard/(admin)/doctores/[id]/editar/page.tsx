"use server";

import { Metadata } from "next";

import ComponentCard from "@/components/common/ComponentCard";
import EditDoctorForm from "../../components/edit-doctor-form";
import getDoctor from "@/services/doctors/getDoctor";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Agregar doctor | SpectraScan",
});

export default async function AgregarDoctorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doctor = await getDoctor(+id);

  return (
    <ComponentCard title="Editar doctor">
      <EditDoctorForm doctor={doctor} />
    </ComponentCard>
  );
}
