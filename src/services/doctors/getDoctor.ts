import { WithId } from "@/common/types";
import { Doctor } from "@/common/types/doctor";

export default async function getDoctor(id: number): Promise<GetDoctorResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctor/${id}`);
  const data = (await response.json()) as GetDoctorResponse;
  return {
    ...data,
    registration_date: new Date(data.registration_date),
    last_login: new Date(data.last_login),
  };
}

export type GetDoctorResponse = WithId<Doctor>;
