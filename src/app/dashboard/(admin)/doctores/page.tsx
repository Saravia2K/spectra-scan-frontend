"use server";

import { Metadata } from "next";
import Link from "next/link";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Table from "@/components/tables";
import Button from "@/components/ui/button/Button";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Doctores | SpectraScan",
});

export default async function DoctoresPage() {
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
          data={[]}
        />
      </ComponentCard>
    </>
  );
}
