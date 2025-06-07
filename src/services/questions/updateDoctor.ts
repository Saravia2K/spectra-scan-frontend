import { WithId } from "@/common/types";
import { Doctor } from "@/common/types/doctor";
import { DoctorData } from "@/components/forms/doctores-form";

export default async function updateDoctor(id: number, doctor: Partial<DoctorData>) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctor/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(doctor),
  });
  return (await response.json()) as UpdateDoctorResponse;
}

export type UpdateDoctorResponse = WithId<Doctor>;
