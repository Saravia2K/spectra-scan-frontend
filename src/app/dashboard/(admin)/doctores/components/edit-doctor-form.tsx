"use client";

import { WithId } from "@/common/types";
import { Doctor } from "@/common/types/doctor";
import DoctoresForm, { DoctorData } from "@/components/forms/doctores-form";
import updateDoctor from "@/services/doctors/updateDoctor";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function EditDoctorForm({ doctor }: EditDoctorFormProps) {
  const router = useRouter();

  const handleSubmit = async (data: DoctorData) => {
    try {
      await updateDoctor(doctor.id, data);
      router.push("/dashboard/doctores");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al intentar crear un doctor",
      });
    }
  };

  return <DoctoresForm onSubmit={handleSubmit} defaultValues={doctor} />;
}

type EditDoctorFormProps = {
  doctor: WithId<Doctor>;
};
