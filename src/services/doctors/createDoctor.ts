import { WithId } from "@/common/types";
import { Doctor } from "@/common/types/doctor";
import { DoctorData } from "@/components/forms/doctores-form";

export default async function createDoctor(doctor: DoctorData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(doctor),
  });
  return (await response.json()) as CreateDoctorResponse;
}

export type CreateDoctorResponse = WithId<Doctor>;
