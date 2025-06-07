"use server";

import { Metadata } from "next";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TestCategoryTable from "../../components/category-table";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Tests | SpectraScan",
});

export default async function TestPage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Tests" />
      <TestCategoryTable />
    </>
  );
}
