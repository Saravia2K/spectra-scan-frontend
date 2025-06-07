import { WithId } from "@/common/types";
import { Patient } from "@/common/types/patient";
import { useAuthStore } from "@/hooks/useUser";

export default async function getPatients() {
  const doctorId = useAuthStore.getState().doctor?.id;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patient/by-doctor/${doctorId}`);
  const data = (await response.json()) as getPatientsResponse;
  return data;
}

export type getPatientsResponse = WithId<Patient>[];
