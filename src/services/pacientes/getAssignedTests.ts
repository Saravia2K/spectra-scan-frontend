import { WithId } from "@/common/types";
import { AssignedTest } from "@/common/types/test";
import { useAuthStore } from "@/hooks/useUser";

export default async function getAssignedPatients() {
  const id = useAuthStore.getState().doctor?.id ?? 0;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patient/tests/by-doctor/${id}`);
  const data = (await response.json()) as getAssignedTestsResponse;
  return data;
}

export type getAssignedTestsResponse = WithId<AssignedTest>[];
