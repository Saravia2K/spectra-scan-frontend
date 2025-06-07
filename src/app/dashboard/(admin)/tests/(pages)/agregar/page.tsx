import { Metadata } from "next";

import ComponentCard from "@/components/common/ComponentCard";
import AddTestForm from "../../components/add-test-form";

export const metadata: Metadata = {
  title: "Agregar test | SpectraScan",
};

export default function AgregarTestPage() {
  return (
    <ComponentCard title="Agregar nuevo test">
      <AddTestForm />
    </ComponentCard>
  );
}
