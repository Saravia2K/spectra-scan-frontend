import { Metadata } from "next";

import ComponentCard from "@/components/common/ComponentCard";
import EditTestForm from "../../../../components/edit-test-form";

export const metadata: Metadata = {
  title: "Editar test | SpectraScan",
};

export default function EditarTestPage() {
  return (
    <ComponentCard title="Editar test">
      <EditTestForm />
    </ComponentCard>
  );
}
