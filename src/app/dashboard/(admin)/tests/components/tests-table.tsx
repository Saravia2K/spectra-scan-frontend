"use client";

import { WithId } from "@/common/types";
import { Test } from "@/common/types/test";
import Table from "@/components/tables";
import { useRouter } from "next/navigation";

export default function TestsTable({ tests }: TestsTableProps) {
  const router = useRouter();

  return (
    <Table
      headers={
        [
          { key: "name", text: "Nombre" },
          { key: "description", text: "Descripción" },
          { key: "cutoff", text: "Corte" },
        ] as const
      }
      data={tests}
      actions={{
        onEdit: (r) =>
          router.push(`/dashboard/tests/${tests.find((t) => t.name == r.name)?.id}/editar`),
        onShow: (r) =>
          router.push(`/dashboard/tests/${tests.find((t) => t.name == r.name)?.id}/preguntas`),
      }}
    />
  );
}

type TestsTableProps = {
  tests: WithId<Test>[];
};
