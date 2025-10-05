import diagnosesData from './../data/diagnoses';

import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnosesData;
};

const getDiagnose = (code: string): Diagnosis | undefined => {
  const diagnose = diagnosesData.find((d) => d.code === code);
  return diagnose;
};

export { getDiagnoses, getDiagnose };
