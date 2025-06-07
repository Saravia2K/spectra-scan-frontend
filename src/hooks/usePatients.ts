import getPatients from "@/services/pacientes/getPatients";
import { useQuery } from "@tanstack/react-query";

export default function usePatients(doctorId: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["patientes", "doctor", doctorId],
    queryFn: getPatients,
    staleTime: Infinity,
  });

  return {
    patients: data,
    patientsLoading: isLoading,
  };
}
