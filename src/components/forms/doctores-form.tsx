"use client";

import { useMemo } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";

export default function DoctoresForm({
  onSubmit,
  defaultValues,
}: TDoctoresFormProps) {
  /**
   * Creating Schema with validations based on defaultValues
   */
  const Schema = useMemo(() => {
    const isEdit = !!defaultValues;
    return z
      .object({
        names: z.string().max(255, "Máximo 255 caracteres"),
        last_names: z.string().max(255, "Máximo 255 caracteres"),
        email: z.string().email("Correo inválido"),
        password: z.string().refine((val) => isEdit || val.length >= 6, {
          message: "Mínimo 6 caracteres",
        }),
        confirmPassword: z.string().refine((val) => isEdit || val !== "", {
          message: "Campo requerido",
        }),
      })
      .refine((data) => isEdit || data.password === data.confirmPassword, {
        message: "La contraseña no es la misma",
        path: ["confirmPassword"],
      });
  }, []);

  /**
   * Initializing useForm hook with zod Schema
   */
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TDoctoresFormFields>({
    resolver: zodResolver(Schema),
    defaultValues: {
      names: defaultValues?.names || "",
      last_names: defaultValues?.last_names || "",
      email: defaultValues?.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleOnSubmit: SubmitHandler<TDoctoresFormFields> = (data) => {
    const { confirmPassword, ...doctorData } = data;
    onSubmit(doctorData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div>
          <Label>Nombres</Label>
          <Input
            placeholder="Escribe tu(s) nombres(s) aquí"
            maxLength={255}
            error={!!errors.names}
            hint={errors.names?.message}
            {...register("names")}
          />
        </div>
        <div>
          <Label>Apellidos</Label>
          <Input
            placeholder="Escribe tu(s) apellido(s) aquí"
            maxLength={255}
            error={!!errors.last_names}
            hint={errors.last_names?.message}
            {...register("last_names")}
          />
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <Label>Correo electrónico</Label>
          <Input
            placeholder="Escribe tu correo electrónico aquí"
            maxLength={255}
            error={!!errors.email}
            hint={errors.email?.message}
            {...register("email")}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Contraseña</Label>
          <Input
            type="password"
            placeholder="Escribe tu contraseña aquí"
            maxLength={120}
            error={!!errors.password}
            hint={errors.password?.message}
            {...register("password")}
          />
        </div>
        <div>
          <Label>Confirmar contraseña</Label>
          <Input
            type="password"
            placeholder="Repite tu contraseña aquí"
            maxLength={120}
            error={!!errors.confirmPassword}
            hint={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
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
  onSubmit: SubmitHandler<DoctorData>;
  defaultValues?: Partial<Omit<DoctorData, "password">>;
};
