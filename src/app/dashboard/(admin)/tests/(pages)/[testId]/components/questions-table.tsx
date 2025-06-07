"use client";

import Swal from "sweetalert2";

import Table, { Data } from "@/components/tables";
import { TestQuestion } from "@/common/types/test";
import { WithId } from "@/common/types";
import { useRef } from "react";
import deleteCategory from "@/services/test-category/deleteCategory";

export default function QuestionsTable({ questions }: QuestionsTableProps) {
  const previusEditName = useRef<string | null>(null);

  const handleDeleteCategoryClick = async (row: Data<typeof headers>) => {
    previusEditName.current = row.text as string;
    const swalResponse = await Swal.fire({
      title: `¿Seguro que deseas eliminar la pregunta?`,
      allowEscapeKey: true,
      showCancelButton: true,
      cancelButtonColor: "#ed6c02",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#d32f2f",
    });
    if (swalResponse.isConfirmed) {
      const id = questions.find((c) => c.text == previusEditName.current)?.id;
      await deleteCategory(id ?? 0);
      window.location.reload();
    }
  };
  //#endregion

  const headers = [
    { key: "category", text: "Categoría" },
    { key: "text", text: "Texto" },
    { key: "scorable_values", text: "Valores que suman" },
  ] as const;
  return (
    <Table
      headers={headers}
      data={questions.map((q) => ({
        category: q.category?.name,
        text: q.text,
        scorable_values: q.scorable_values.join(", "),
      }))}
      actions={{
        onDelete: handleDeleteCategoryClick,
      }}
    />
  );
}

type QuestionsTableProps = {
  questions: WithId<TestQuestion>[];
};
