"use server";

import { Metadata } from "next";
import ComponentCard from "@/components/common/ComponentCard";
import AddTestQuestionForm from "../../../components/add-question-form";
import getAllCategories from "@/services/test-category/getAllCategories";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Preguntas del test | SpectraScan",
});

export default async function TestQuestionsPage() {
  const categories = await getAllCategories();

  return (
    <ComponentCard title="Agregar nueva pregunta">
      <AddTestQuestionForm categories={categories} />
    </ComponentCard>
  );
}
