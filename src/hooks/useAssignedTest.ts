import getAssignedPatients from "@/services/pacientes/getAssignedTests";
import { useQuery } from "@tanstack/react-query";

export default function useAssignedTests() {
  const { data, isLoading } = useQuery({
    queryKey: ["patientes", "assigend"],
    queryFn: getAssignedPatients,
    staleTime: Infinity,
  });

  return {
    tests: data,
    testsLoading: isLoading,
  };
}
