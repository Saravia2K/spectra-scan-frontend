import { Metadata } from "next";

import ComponentCard from "@/components/common/ComponentCard";
import EditTestQuestionForm from "../../../../components/edit-question-form";

export const metadata: Metadata = {
  title: "Editar test | SpectraScan",
};

export default function EditarTestQuestionPage() {
  return (
    <ComponentCard title="Editar test">
      <EditTestQuestionForm />
    </ComponentCard>
  );
}
