import { WithId } from "@/common/types";
import { Patient } from "@/common/types/patient";

export default async function createPaciente(
  paciente: Omit<Patient, "doctor" | "registration_date" | "tutor"> & { doctor_id: number }
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paciente),
  });
  return (await response.json()) as CreatePacienteResponse;
}

export type CreatePacienteResponse = WithId<Patient>;
