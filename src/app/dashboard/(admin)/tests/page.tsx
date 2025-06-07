"use server";

import { Metadata } from "next";
import Link from "next/link";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import TestsTable from "./components/tests-table";
import getAllTests from "@/services/test/getAllTests";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Tests | SpectraScan",
});

export default async function TestPage() {
  const tests = await getAllTests();
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
        <TestsTable tests={tests} />
      </ComponentCard>
    </>
  );
}
