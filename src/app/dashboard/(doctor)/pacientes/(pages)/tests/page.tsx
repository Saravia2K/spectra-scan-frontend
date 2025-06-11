"use server";

import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import PatientsTestTable from "../components/patients-test-table";

export default async function PacientesTestsPage() {
  return (
    <ComponentCard
      title={
        <Link href="tests/agregar">
          <Button>Asignar test</Button>
        </Link>
      }
    >
      <PatientsTestTable />
    </ComponentCard>
  );
}
