"use server";

import { Metadata } from "next";
import Link from "next/link";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Table from "@/components/tables";
import Button from "@/components/ui/button/Button";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Tests | SpectraScan",
});

export default async function TestPage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Tests" />
      <ComponentCard
        title={
          <Link href="tests/agregar">
            <Button>Agregar test</Button>
          </Link>
        }
      >
        <Table
          headers={
            [
              { key: "name", text: "Nombre" },
              { key: "description", text: "Descripción" },
              { key: "cutoff", text: "Corte" },
            ] as const
          }
          data={[]}
        />
      </ComponentCard>
    </>
  );
}
