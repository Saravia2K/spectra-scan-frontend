"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { TestCategory } from "@/common/types/test";

export default function TestsCategoryForm({ onSubmit, testCategory }: TestCategoryProps) {
  /**
   * Initializing useForm hook with zod Schema
   */
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TestsFormFields>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      test_category_name: testCategory?.name || "",
    },
  });

  const handleOnSubmit: SubmitHandler<TestsFormFields> = (data) =>
    onSubmit({
      name: data.test_category_name,
    });

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col gap-4 text-start">
      <Label htmlFor="test_name">Nombre de la categoría</Label>
      <Input
        id="test_name"
        placeholder="Escribe el nombre del test"
        error={!!errors.test_category_name}
        hint={errors.test_category_name?.message}
        {...register("test_category_name")}
      />

      <div className="grid md:grid-cols-4">
        <Button>Guardar</Button>
      </div>
    </form>
  );
}

const FormSchema = z.object({
  test_category_name: z.string().nonempty("Campo requerido"),
});
export type TestsFormFields = z.infer<typeof FormSchema>;

type TestCategoryProps = {
  onSubmit: SubmitHandler<TestCategory>;
  testCategory?: TestCategory;
};
