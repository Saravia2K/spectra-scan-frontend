import { Metadata } from "next";
import ComponentCard from "@/components/common/ComponentCard";
import AddTestQuestionForm from "../../../components/add-question-form";

export const metadata: Metadata = {
  title: "Preguntas del test | SpectraScan",
};

export default function TestQuestionsPage() {
  return (
    <ComponentCard title="Agregar nueva pregunta">
      <AddTestQuestionForm />
    </ComponentCard>
  );
}
