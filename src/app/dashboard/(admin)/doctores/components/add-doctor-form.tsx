"use client";

import DoctoresForm, { DoctorData } from "@/components/forms/doctores-form";
import createDoctor from "@/services/doctors/createDoctor";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AddDoctorForm() {
  const router = useRouter();

  const handleSubmit = async (data: DoctorData) => {
    try {
      await createDoctor(data);
      router.push("/dashboard/doctores");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al intentar crear un doctor",
      });
    }
  };

  return <DoctoresForm onSubmit={handleSubmit} />;
}
