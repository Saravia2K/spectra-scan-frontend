"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Select from "@/components/form/Select";
import MultiSelect from "@/components/form/MultiSelect";
import { ChevronDownIcon } from "@/icons";
import { TestCategory, TestQuestion } from "@/common/types/test";
import { SCORABLE_VALUES } from "@/common/enums/test";
import { WithId } from "@/common/types";

const SCORABLE_OPTIONS = [
  {
    value: SCORABLE_VALUES.DEFINITELY_AGREE.toString(),
    text: "Completamente de acuerdo",
    selected: false,
  },
  {
    value: SCORABLE_VALUES.SLIGHTLY_AGREE.toString(),
    text: "Ligeramente de acuerdo",
    selected: false,
  },
  {
    value: SCORABLE_VALUES.SLIGHTLY_DISAGREE.toString(),
    text: "Ligeramente en desacuerdo",
    selected: false,
  },
  {
    value: SCORABLE_VALUES.DEFINITELY_DISAGREE.toString(),
    text: "Completamente en desacuerdo",
    selected: false,
  },
];

export type TestQuestionFormValues = {
  test_question_text: string;
  test_question_category_id: string;
  test_question_scorable_values: number[];
};

type TestQuestionFormProps = {
  onSubmit: SubmitHandler<Omit<TestQuestion, "category" | "test_id">>;
  question?: Partial<TestQuestion>;
  categories: WithId<TestCategory>[];
};

export default function TestQuestionForm({
  onSubmit,
  question,
  categories,
}: TestQuestionFormProps) {
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
      test_question_category_id: question?.category_id || categories[0].id,
      test_question_scorable_values: question?.scorable_values || [],
    },
  });

  const handleOnSubmit: SubmitHandler<FormFields> = (data) => {
    onSubmit({
      category_id: data.test_question_category_id,
      scorable_values: data.test_question_scorable_values,
      text: data.test_question_text,
    });
  };

  const categoryId = watch("test_question_category_id");
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col gap-4">
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
              options={categories.map((c) => ({ label: c.name, value: `${c.id}` }))}
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
          onChange={(values) => setValue("test_question_scorable_values", values)}
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
  test_question_scorable_values: z.string().array().min(1, "Debes seleccionar al menos un valor"),
});

type FormFields = z.infer<typeof FormSchema>;
