export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
}

export type NonLatinDiagnose = Omit<Diagnose, 'latin'>;

export type noSsnPatients = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;