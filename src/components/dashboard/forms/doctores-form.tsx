"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";

export default function DoctoresForm({ onSubmit }: TDocotresFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TDoctoresFormFields>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      names: "",
      last_names: "",
      email: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
        <div>
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

type TDocotresFormProps = {
  onSubmit: SubmitHandler<TDoctoresFormFields>;
};

const FormSchema = z
  .object({
    names: z
      .string()
      .nonempty("Campo requerido")
      .max(255, "Máximos de 255 caracteres"),
    last_names: z
      .string()
      .nonempty("Campo requerido")
      .max(255, "Máximos de 255 caracteres"),
    email: z
      .string()
      .email("Ingrese un correo electrónico válido")
      .nonempty("Campo requerido"),
    password: z
      .string()
      .nonempty("Campo requerido")
      .min(6, "Mínimo 6 caractéres"),
    confirmPassword: z.string().nonempty("Campo requerido"),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "La contraseña no es la misma",
    path: ["confirmPassword"],
  });

export type TDoctoresFormFields = z.infer<typeof FormSchema>;
