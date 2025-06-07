import { WithId } from "@/common/types";
import { Patient } from "@/common/types/patient";
import { useAuthStore } from "@/hooks/useUser";

export default async function getAllPatients() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patient`);
  const data = (await response.json()) as getPatientsResponse;
  return data;
}

export type getPatientsResponse = WithId<Patient>[];
