"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Select from "../form/Select";
import { Patient } from "@/common/types/patient";
import { Test } from "@/common/types/test";
import { WithId } from "@/common/types";
import { ChevronDownIcon } from "@/icons";

const Schema = z.object({
  patient_id: z.number({ coerce: true }),
  test_id: z.number({ coerce: true }),
});

export default function PatientTestForm({
  onSubmit,
  defaultValues,
  patients,
  tests,
}: TDoctoresFormProps) {
  /**
   * Initializing useForm hook with zod Schema
   */
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      patient_id: patients.length > 0 ? patients[0].id : defaultValues?.patient_id ?? 0,
      test_id: tests.length > 0 ? tests[0].id : defaultValues?.test_id ?? 0,
    },
  });

  const patientId = watch("patient_id");
  const testsId = watch("test_id");
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category_id">Categoría</Label>
          <div className="relative">
            <Select
              defaultValue={`${patientId}`}
              options={patients.map((p) => ({
                label: `${p.names} ${p.last_names}`,
                value: `${p.id}`,
              }))}
              placeholder="Selecciona una categoría"
              onChange={(value) => setValue("patient_id", +value)}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>

          {errors.patient_id && (
            <span className="text-red-500 text-xs">{errors.patient_id.message}</span>
          )}
        </div>

        <div>
          <Label htmlFor="category_id">Categoría</Label>
          <div className="relative">
            <Select
              defaultValue={`${testsId}`}
              options={tests.map((p) => ({
                label: p.name,
                value: `${p.id}`,
              }))}
              placeholder="Selecciona una categoría"
              onChange={(value) => setValue("patient_id", +value)}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>

          {errors.patient_id && (
            <span className="text-red-500 text-xs">{errors.patient_id.message}</span>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-6">
        <Button>Guardar</Button>
      </div>
    </form>
  );
}

export type DoctorData = {
  names: string;
  last_names: string;
  email: string;
  password: string;
};

export type TDoctoresFormFields = DoctorData & {
  confirmPassword: string;
};

type TDoctoresFormProps = {
  onSubmit: SubmitHandler<{ patient_id: number; test_id: number }>;
  defaultValues?: { patient_id: number; test_id: number };
  patients: WithId<Patient>[];
  tests: WithId<Test>[];
};
