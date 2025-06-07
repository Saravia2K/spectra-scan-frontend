"use server";

import { Metadata } from "next";
import Link from "next/link";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Table from "@/components/tables";
import Button from "@/components/ui/button/Button";
import GetAllDoctors from "@/services/doctors/getAllDoctors";
import DoctorsTable from "./components/doctors-table";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Doctores | SpectraScan",
});

export default async function DoctoresPage() {
  const doctores = await GetAllDoctors();
  return (
    <>
      <PageBreadcrumb pageTitle="Doctores" />
      <ComponentCard
        title={
          <Link href="doctores/agregar">
            <Button>Agregar doctor</Button>
          </Link>
        }
      >
        <DoctorsTable doctors={doctores} />
      </ComponentCard>
    </>
  );
}
