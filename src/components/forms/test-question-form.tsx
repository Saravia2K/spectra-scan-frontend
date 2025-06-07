"use client";

import { useParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Select from "@/components/form/Select";
import MultiSelect from "@/components/form/MultiSelect";
import { ChevronDownIcon } from "@/icons";
import { TestQuestion } from "@/common/types/test";

const SCORABLE_OPTIONS = [
  { value: "completamente_de_acuerdo", text: "Completamente de acuerdo", selected: false },
  { value: "ligeramente_de_acuerdo", text: "Ligeramente de acuerdo", selected: false },
  { value: "ligeramente_en_desacuerdo", text: "Ligeramente en desacuerdo", selected: false },
  { value: "completamente_en_desacuerdo", text: "Completamente en desacuerdo", selected: false },
];

export type TestQuestionFormValues = {
  test_question_text: string;
  test_question_category_id: string;
  test_question_scorable_values: number[];
};

type TestQuestionFormProps = {
  onSubmit?: SubmitHandler<TestQuestion>;
  question?: Partial<TestQuestion>;
};

export default function TestQuestionForm({ onSubmit, question }: TestQuestionFormProps) {
  const { id: test_id } = useParams<{ id: string }>();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormFields>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      test_question_text: question?.text || "",
      test_question_category_id: question?.category_id || 0,
      test_question_scorable_values: question?.scorable_values || [],
    },
  });

  // TODO: Replace with real categories from API
  const categories = [
    { value: "1", label: "Categoría 1" },
    { value: "2", label: "Categoría 2" },
  ];

  const categoryId = watch("test_question_category_id");
  return (
    <form onSubmit={handleSubmit(() => {})} className="flex flex-col gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="text">Texto de la pregunta</Label>
          <Input
            id="text"
            placeholder="Escribe la pregunta"
            error={!!errors.test_question_text}
            hint={errors.test_question_text?.message}
            {...register("test_question_text")}
          />
        </div>
        <div>
          <Label htmlFor="category_id">Categoría</Label>
          <div className="relative">
            <Select
              defaultValue={`${categoryId}`}
              options={categories}
              placeholder="Selecciona una categoría"
              onChange={(value) => setValue("test_question_category_id", +value)}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>

          {errors.test_question_category_id && (
            <span className="text-red-500 text-xs">{errors.test_question_category_id.message}</span>
          )}
        </div>
      </div>
      {/* Aquí iría el manejo de scorable_values */}
      <div>
        <MultiSelect
          label="Selecciona los valores que aplican a esta pregunta"
          options={SCORABLE_OPTIONS}
          onChange={(values) => setValue("test_question_scorable_values", values.map(Number))}
        />
        {errors.test_question_scorable_values && (
          <span className="text-red-500 text-xs">
            {errors.test_question_scorable_values.message}
          </span>
        )}
      </div>
      <div className="grid md:grid-cols-6">
        <Button>Guardar</Button>
      </div>
    </form>
  );
}

const FormSchema = z.object({
  test_question_text: z.string().nonempty("Campo requerido"),
  test_question_category_id: z.number(),
  test_question_scorable_values: z.number().array().min(1, "Debes seleccionar al menos un valor"),
});

type FormFields = z.infer<typeof FormSchema>;
