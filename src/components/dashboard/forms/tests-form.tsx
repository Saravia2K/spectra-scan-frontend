"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import TextArea from "@/components/form/input/TextArea";
import { Test } from "@/common/types/test";

export default function TestsForm({ onSubmit, test }: TTestsFormProps) {
  /**
   * Initializing useForm hook with zod Schema
   */
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TTestsFormFields>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      test_name: test?.name || "",
      test_description: test?.description || "",
      test_cutoff: test?.cutoff || 1,
    },
  });

  const handleOnSubmit: SubmitHandler<TTestsFormFields> = (data) =>
    onSubmit({
      name: data.test_name,
      description: data.test_description,
      cutoff: data.test_cutoff,
    });

  const testDescription = watch("test_description");
  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="test_name">Nombre</Label>
          <Input
            id="test_name"
            placeholder="Escribe el nombre del test"
            error={!!errors.test_name}
            hint={errors.test_name?.message}
            {...register("test_name")}
          />
        </div>
        <div>
          <Label htmlFor="test_cutoff">Punto de corte</Label>
          <Input
            placeholder="Escribe el punto de corte del test"
            id="test_cutoff"
            type="number"
            min={1}
            error={!!errors.test_cutoff}
            hint={errors.test_cutoff?.message}
            {...register("test_cutoff")}
          />
        </div>
      </div>

      <div>
        <Label>Descripción</Label>
        <TextArea
          id="test_description"
          name="test_description"
          rows={4}
          style={{ resize: "none" }}
          value={testDescription}
          onChange={(value) => setValue("test_description", value)}
          error={!!errors.test_description}
          hint={errors.test_description?.message}
          maxLength={255}
        />
      </div>

      <div className="grid md:grid-cols-6">
        <Button>Guardar</Button>
      </div>
    </form>
  );
}

const FormSchema = z.object({
  test_name: z.string().nonempty("Campo requerido"),
  test_description: z.string().nonempty("Campo requerido"),
  test_cutoff: z
    .number({ coerce: true, message: "Inserte un número correcto" })
    .min(1, "El valor mínimo para el punto de corte es 1")
    .max(255, "El valor máximo es 255"),
});
export type TTestsFormFields = z.infer<typeof FormSchema>;

type TTestsFormProps = {
  onSubmit: SubmitHandler<Test>;
  test?: Test;
};
