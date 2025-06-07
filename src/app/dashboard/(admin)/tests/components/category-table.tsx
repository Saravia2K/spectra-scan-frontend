"use client";

import Swal from "sweetalert2";
import withReact from "sweetalert2-react-content";

import ComponentCard from "@/components/common/ComponentCard";
import Table, { Data } from "@/components/tables";
import Button from "@/components/ui/button/Button";
import { TestCategory } from "@/common/types/test";
import TestsCategoryForm from "@/components/forms/categoria-form";
import { WithId } from "@/common/types";
import createCategory from "@/services/test-category/createCategory";
import updateCategory from "@/services/test-category/updateCategory";
import { useRef } from "react";
import deleteCategory from "@/services/test-category/deleteCategory";

const mySwal = withReact(Swal);
export default function TestCategoryTable({ categories }: CategoryTableProps) {
  const previusEditName = useRef<string | null>(null);
  //#region Submit handlers
  const handleOnAddCategoryFormSubmit = async (data: TestCategory) => {
    try {
      await createCategory(data);
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al intentar crear una categoría",
      });
    }
  };

  const handleOnEditCategoryFormSubmit = async (data: TestCategory) => {
    try {
      const id = categories.find((c) => c.name == previusEditName.current)?.id;
      await updateCategory(id ?? 0, data);
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al intentar actualizar una categoría",
      });
    }
  };
  //#endregion

  //#region Click handler
  const handleAddCategoryClick = () => {
    mySwal.fire({
      title: "Agregar categoría",
      html: <TestsCategoryForm onSubmit={handleOnAddCategoryFormSubmit} />,
      allowEscapeKey: true,
      showConfirmButton: false,
    });
  };

  const handleEditCategoryClick = (row: Data<typeof headers>) => {
    previusEditName.current = row.name as string;
    mySwal.fire({
      title: `Editar categoría "${row.name}"`,
      html: (
        <TestsCategoryForm
          onSubmit={handleOnEditCategoryFormSubmit}
          testCategory={row as TestCategory}
        />
      ),
      allowEscapeKey: true,
      showConfirmButton: false,
    });
  };

  const handleDeleteCategoryClick = async (row: Data<typeof headers>) => {
    previusEditName.current = row.name as string;
    const swalResponse = await mySwal.fire({
      title: `¿Seguro que deseas eliminar la categoría "${row.name}"?`,
      allowEscapeKey: true,
      showCancelButton: true,
      cancelButtonColor: "#ed6c02",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#d32f2f",
    });
    if (swalResponse.isConfirmed) {
      const id = categories.find((c) => c.name == previusEditName.current)?.id;
      await deleteCategory(id ?? 0);
      window.location.reload();
    }
  };
  //#endregion

  const headers = [{ key: "name", text: "Nombre" }] as const;
  return (
    <ComponentCard
      title={<Button onClick={handleAddCategoryClick}>Agregar categoría para pregunta</Button>}
    >
      <Table
        headers={headers}
        data={categories}
        actions={{
          onEdit: handleEditCategoryClick,
          onDelete: handleDeleteCategoryClick,
        }}
      />
    </ComponentCard>
  );
}

type CategoryTableProps = {
  categories: WithId<TestCategory>[];
};
