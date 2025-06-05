"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <Label>
            Correo electrónico <span className="text-error-500">*</span>
          </Label>
          <Input
            placeholder="Ingresa tu correo aquí"
            error={!!errors.email}
            hint={errors.email?.message}
            {...register("email")}
          />
        </div>
        <div>
          <Label>
            Constraseña <span className="text-error-500">*</span>
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Ingresa tu contraseña aquí"
              error={!!errors.password}
              hint={errors.password?.message}
              {...register("password")}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </span>
          </div>
        </div>
        <div>
          <Button className="w-full" size="sm">
            Iniciar sesión
          </Button>
        </div>
      </div>
    </form>
  );
}

const FormSchema = z.object({
  email: z.string().email("Ingrese un correo electrónico válido"),
  password: z.string().nonempty("Campo requerido"),
});

type FormFields = z.infer<typeof FormSchema>;
