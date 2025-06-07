import { Doctor } from "./doctor";

export type Patient = {
  doctor: Doctor;
  names: string;
  last_names: string;
  age: number;
  registration_date: Date;
  tutors?: Tutor[];
};

export type Tutor = {
  patient: Patient;
  names: string;
  last_names: string;
  email: string;
  relationship: string;
};
