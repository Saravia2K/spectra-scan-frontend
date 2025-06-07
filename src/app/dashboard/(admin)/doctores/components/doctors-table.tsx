"use client";

import Table from "@/components/tables";
import deleteDoctor from "@/services/doctors/deleteDoctor";
import { GetAllDoctorsResponse } from "@/services/doctors/getAllDoctors";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function DoctorsTable({ doctors }: DoctorsTableProps) {
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

  return (
    <Table
      headers={
        [
          { key: "names", text: "Nombres" },
          { key: "last_names", text: "Apellidos" },
          { key: "email", text: "Correo electrónico" },
          { key: "last_login", text: "Último ingreso" },
          { key: "registration_date", text: "Fecha de registro" },
        ] as const
      }
      data={doctors.map((d) => ({
        names: d.names,
        last_names: d.last_names,
        email: d.email,
        last_login: d.last_login.toLocaleDateString(),
        registration_date: d.registration_date.toLocaleDateString(),
      }))}
      actions={{
        onEdit: (r) =>
          router.push(`/dashboard/doctores/${doctors.find((d) => d.email == r.email)?.id}/editar`),
        onDelete: (r) => handleDelete(doctors.find((d) => d.email == r.email)?.id ?? 0),
      }}
    />
  );
}

type DoctorsTableProps = {
  doctors: GetAllDoctorsResponse;
};
