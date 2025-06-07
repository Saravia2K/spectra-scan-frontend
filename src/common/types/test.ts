import { SCORABLE_VALUES } from "../enums/test";

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
  text: string;
  scorable_values: SCORABLE_VALUES[];
};
