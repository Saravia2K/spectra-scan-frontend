"use server";

import { Metadata } from "next";

import ComponentCard from "@/components/common/ComponentCard";
import EditTestForm from "../../../../components/edit-test-form";
import getTest from "@/services/test/getTest";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Editar test | SpectraScan",
});

export default async function EditarTestPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;
  const test = await getTest(+testId);
  return (
    <ComponentCard title="Editar test">
      <EditTestForm test={test} />
    </ComponentCard>
  );
}
