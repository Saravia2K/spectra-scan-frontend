"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import Label from "../form/Label";
import Input from "../form/input/InputField";
import Switch from "../form/switch/Switch";
import type { Patient, Tutor } from "@/common/types/patient";
import Button from "../ui/button/Button";

const TutorSchema = z.object({
  names: z.string().nonempty("Campo requerido"),
  last_names: z.string().nonempty("Campo requerido"),
  email: z.string().email("Ingrese un correo electrónico correcto"),
  relationship: z.string().nonempty("Campo requerido"),
});

const PatientSchema = z.object({
  patient_names: z.string().nonempty("Campo requerido"),
  patient_last_names: z.string().nonempty("Campo requerido"),
  patient_age: z.number().min(3, "Ingrese una edad superior a 3 años"),
  tutor: TutorSchema.optional(),
});

type TPatientSchema = z.infer<typeof PatientSchema>;

export default function PatientForm({ onSubmit }: PatientFormProps) {
  const [showTutorForm, setShowTutorForm] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PatientSchema),
    defaultValues: {},
  });

  const handleOnSubmit: SubmitHandler<TPatientSchema> = (data) => {
    onSubmit({
      names: data.patient_names,
      last_names: data.patient_last_names,
      age: data.patient_age,
      tutor: data.tutor,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col gap-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="patient_names">Nombres del paciente</Label>
          <Input
            id="patient_names"
            placeholder="Ingrese el nombre del paciente"
            error={!!errors.patient_names}
            hint={errors.patient_names?.message}
            {...register("patient_names")}
          />
        </div>
        <div>
          <Label htmlFor="patient_last_names">Apellidos del paciente</Label>
          <Input
            id="patient_last_names"
            placeholder="Ingrese el apellido del paciente"
            error={!!errors.patient_last_names}
            hint={errors.patient_last_names?.message}
            {...register("patient_last_names")}
          />
        </div>
        <div>
          <Label htmlFor="patient_names">Edad del paciente</Label>
          <Input
            id="patient_names"
            placeholder="Ingrese el nombre del paciente"
            error={!!errors.patient_names}
            hint={errors.patient_names?.message}
            {...register("patient_names")}
          />
        </div>
        <div>
          <Switch label="Con tutor" onChange={setShowTutorForm} />
        </div>
      </div>
      {showTutorForm && (
        <div className="grid lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="tutor.tutor_names">Nombres del tutor</Label>
            <Input
              id="tutor.tutor_names"
              placeholder="Ingrese el nombre del tutor"
              error={!!errors.tutor?.names}
              hint={errors.tutor?.names?.message}
              {...register("tutor.names")}
            />
          </div>
          <div>
            <Label htmlFor="tutor_last_names">Apellidos del tutor</Label>
            <Input
              id="tutor_last_names"
              placeholder="Ingrese el apellido del tutor"
              error={!!errors.tutor?.last_names}
              hint={errors.tutor?.last_names?.message}
              {...register("tutor.last_names")}
            />
          </div>
          <div>
            <Label htmlFor="tutor_email">Correo del tutor</Label>
            <Input
              id="tutor_email"
              placeholder="Ingrese el correo del tutor"
              error={!!errors.tutor?.email}
              hint={errors.tutor?.email?.message}
              {...register("tutor.email")}
            />
          </div>
          <div>
            <Label htmlFor="tutor_relasionship">Relación con el paciente</Label>
            <Input
              id="tutor_relasionship"
              placeholder="Ingrese la relación con el paciente"
              error={!!errors.tutor?.relationship}
              hint={errors.tutor?.relationship?.message}
              {...register("tutor.relationship")}
            />
          </div>
        </div>
      )}
      <div className="grid md:grid-cols-6">
        <Button>Guardar</Button>
      </div>
    </form>
  );
}

type PatientFormData = Omit<Patient, "doctor" | "registration_date" | "tutor"> & {
  tutor?: Omit<Tutor, "patient">;
};

type PatientFormProps = {
  onSubmit: (data: PatientFormData) => void;
};
