import { WithId } from ".";
import { Patient } from "./patient";

export type Test = {
  name: string;
  description: string;
  cutoff: number;
};

export type TestCategory = {
  name: string;
};

export type TestQuestion = {
  test_id: number;
  category_id: number;
  category?: TestCategory;
  text: string;
  scorable_values: string[];
};

export type AssignedTest = {
  patient_id: number;
  test_id: number;
  token: string;
  access_code: string;
  total_score: number | null;
  details: string | null;
  created_at: string;
  patient: WithId<Patient>;
  test: WithId<Test>;
};
