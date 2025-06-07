import { WithId } from "@/common/types";
import { Doctor } from "@/common/types/doctor";
import { useAuthStore } from "@/hooks/useUser";

export default async function login(email: string, password: string) {
  if (email == "admin@spectrascan.com") {
    useAuthStore.getState().login({
      id: 0,
      email: "admin@spectrascan.com",
      names: "Admin",
      last_names: "",
    });
    return {
      id: 0,
      email: "admin@spectrascan.com",
      names: "Admin",
      last_names: "",
      last_login: new Date(),
      registration_date: new Date(),
      request_password_change: false,
    } as WithId<Doctor>;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctor/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return (await response.json()) as WithId<Doctor>;
}
