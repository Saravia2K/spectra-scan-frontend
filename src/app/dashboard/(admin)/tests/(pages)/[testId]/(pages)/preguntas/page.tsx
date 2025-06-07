"use server";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import getAllQuestions from "@/services/questions/getAllQuestions";
import { Metadata } from "next";
import Link from "next/link";
import QuestionsTable from "../../components/questions-table";
import Button from "@/components/ui/button/Button";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Preguntas del test | SpectraScan",
});

export default async function TestQuestionsPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const { testId } = await params;
  const questions = await getAllQuestions(+testId);

  return (
    <>
      <PageBreadcrumb pageTitle="Preguntas de test" />
      <ComponentCard
        title={
          <Link href="preguntas/agregar">
            <Button>Agregar pregunta</Button>
          </Link>
        }
      >
        <QuestionsTable questions={questions} />
      </ComponentCard>
    </>
  );
}
