"use server";

import { Metadata } from "next";
import Link from "next/link";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import PatientsTable from "./components/patients-table";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Doctores | SpectraScan",
});

export default async function PatientsPage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Pacientes" />
      <ComponentCard
        title={
          <Link href="/dashboard/pacientes/agregar">
            <Button>Agregar paciente</Button>
          </Link>
        }
      >
        <PatientsTable />
      </ComponentCard>
    </>
  );
}
