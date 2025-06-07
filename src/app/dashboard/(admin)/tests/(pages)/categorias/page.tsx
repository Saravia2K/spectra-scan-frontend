"use server";

import { Metadata } from "next";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TestCategoryTable from "../../components/category-table";
import getAllCategories from "@/services/test-category/getAllCategories";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Tests | SpectraScan",
});

export default async function TestPage() {
  const categories = await getAllCategories();

  return (
    <>
      <PageBreadcrumb pageTitle="Tests" />
      <TestCategoryTable categories={categories} />
    </>
  );
}
