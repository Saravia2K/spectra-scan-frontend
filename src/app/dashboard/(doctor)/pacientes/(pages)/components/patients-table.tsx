"use client";

import Table from "@/components/tables";
import usePatients from "@/hooks/usePatients";
import { useAuthStore } from "@/hooks/useUser";
import deleteDoctor from "@/services/doctors/deleteDoctor";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function PatientsTable() {
  const { patients, patientsLoading } = usePatients(useAuthStore.getState().doctor?.id ?? 0);
  const router = useRouter();

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

  if (!patients || patientsLoading) return;
  console.log(patients);
  return (
    <Table
      headers={
        [
          { key: "names", text: "Nombres" },
          { key: "last_names", text: "Apellidos" },
          { key: "age", text: "Edad" },
          { key: "tutor", text: "Tutor" },
        ] as const
      }
      data={(patients || []).map((p) => ({
        names: p.names,
        last_names: p.last_names,
        age: p.age,
        tutor: p.tutors && p.tutors.length > 0 ? p.tutors[0].names : "N/A",
      }))}
      //   actions={{
      //     onEdit: (r) =>
      //       router.push(`/dashboard/doctores/${doctors.find((d) => d.email == r.email)?.id}/editar`),
      //     onDelete: (r) => handleDelete(doctors.find((d) => d.email == r.email)?.id ?? 0),
      //   }}
    />
  );
}
