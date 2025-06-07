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
