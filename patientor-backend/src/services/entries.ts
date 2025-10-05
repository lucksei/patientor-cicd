import { v1 as uuid } from 'uuid';
import patientsData from '../data/patients';
import { Entry, EntryWithoutId } from '../types';

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const id = uuid();
  const newEntry = {
    id,
    ...entry,
  };

  patientsData.map((p) => {
    if (p.id === patientId) {
      p.entries.push(newEntry);
    }
  });
  return newEntry;
};

export { addEntry };
