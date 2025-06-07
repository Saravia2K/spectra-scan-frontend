"use client";

import Swal from "sweetalert2";
import withReact from "sweetalert2-react-content";

import ComponentCard from "@/components/common/ComponentCard";
import Table, { Data } from "@/components/tables";
import Button from "@/components/ui/button/Button";
import { TestCategory } from "@/common/types/test";
import TestsCategoryForm from "@/components/forms/categoria-form";

const mySwal = withReact(Swal);
export default function TestCategoryTable() {
  //#region Submit handlers
  const handleOnAddCategoryFormSubmit = (data: TestCategory) => {
    console.log(data);
  };

  const handleOnEditCategoryFormSubmit = (data: TestCategory) => {
    console.log(data);
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

  const handleDeleteCategoryClick = (row: Data<typeof headers>) => {
    mySwal.fire({
      title: `¿Seguro que deseas eliminar la categoría "${row.name}"?`,
      allowEscapeKey: true,
      showCancelButton: true,
      cancelButtonColor: "#ed6c02",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#d32f2f",
    });
  };
  //#endregion

  const headers = [{ key: "name", text: "Nombre" }] as const;
  return (
    <ComponentCard
      title={<Button onClick={handleAddCategoryClick}>Agregar categoría para pregunta</Button>}
    >
      <Table
        headers={headers}
        data={[{ name: "Test" }]}
        actions={{
          onEdit: handleEditCategoryClick,
          onDelete: handleDeleteCategoryClick,
        }}
      />
    </ComponentCard>
  );
}
