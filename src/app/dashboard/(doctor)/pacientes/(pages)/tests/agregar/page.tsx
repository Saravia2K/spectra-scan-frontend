"use server";

import { Metadata } from "next";
import AddPatientTestForm from "../../../components/add-patient-test-form";
import getAllPatients from "@/services/pacientes/getAllPatients";
import getAllTests from "@/services/test/getAllTests";

export const generateMetada = async (): Promise<Metadata> => ({
  title: "Agregar paciente | SpectraScan",
});

export default async function AddPatientTestPage() {
  const patients = await getAllPatients();
  const tests = await getAllTests();
  return <AddPatientTestForm patients={patients} tests={tests} />;
}
