import { WithId } from "@/common/types";
import { Doctor } from "@/common/types/doctor";

export default async function GetAllDoctors() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctor`);
  const data = (await response.json()) as GetAllDoctorsResponse;
  return (data ?? []).map((d) => ({
    ...d,
    registration_date: new Date(d.registration_date),
    last_login: new Date(d.last_login),
  }));
}

export type GetAllDoctorsResponse = WithId<Doctor>[];
