import { Metadata } from "next";
import AddPatientForm from "../../components/add-patient-form";

export const metadata: Metadata = {
  title: "Agregar paciente | SpectraScan",
};

export default function AddPatientPage() {
  return <AddPatientForm />;
}
