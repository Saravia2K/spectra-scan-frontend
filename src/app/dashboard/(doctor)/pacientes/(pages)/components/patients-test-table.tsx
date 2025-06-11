"use client";

import Table from "@/components/tables";
import useAssignedTests from "@/hooks/useAssignedTest";
import deleteDoctor from "@/services/doctors/deleteDoctor";
import Swal from "sweetalert2";

export default function PatientsTestTable() {
  const { tests, testsLoading } = useAssignedTests();
  const handleDelete = async (id: number) => {
    const swalResponse = await Swal.fire({
      icon: "warning",
      title: "¿Seguro que deseas eliminar este doctor?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    });
    if (swalResponse.isConfirmed) {
      await deleteDoctor(id);
      window.location.reload();
    }
  };

  if (!tests) return;
  return (
    <Table
      headers={
        [
          { key: "patient", text: "Paciente" },
          { key: "test", text: "Test" },
          { key: "url", text: "url" },
          { key: "code", text: "Código de acceso" },
        ] as const
      }
      data={tests.map((t) => ({
        patient: t.patient.names,
        test: t.test.name,
        url: `http://localhost:3000/${t.token}/test`,
        code: t.access_code,
      }))}
      //   actions={{
      //     onEdit: (r) =>
      //       router.push(`/dashboard/doctores/${doctors.find((d) => d.email == r.email)?.id}/editar`),
      //     onDelete: (r) => handleDelete(doctors.find((d) => d.email == r.email)?.id ?? 0),
      //   }}
    />
  );
}
