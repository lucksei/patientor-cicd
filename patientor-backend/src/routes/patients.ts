import express, { Request, Response } from 'express';

import { getPatients, getPatient, addPatient } from '../services/patients';
import { addEntry } from '../services/entries';
import { newPatientParser, newEntryParser } from '../middlewares';
import {
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
  EntryWithoutId,
} from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const patients = getPatients();
  return res.json(patients);
});

router.get('/:id', (req, res: Response<Patient>) => {
  const id = req.params.id;
  const patient = getPatient(id);
  if (patient === undefined) {
    return res.status(404).end();
  }
  return res.json(patient);
});

router.post(
  '/',
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<NewPatientEntry>
  ) => {
    const newPatient = addPatient(req.body);
    return res.json(newPatient);
  }
);

router.post(
  '/:id/entries',
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, EntryWithoutId>,
    res: Response<EntryWithoutId>
  ) => {
    const patientId = req.params.id;
    const newEntry = addEntry(patientId, req.body);
    return res.json(newEntry);
  }
);

export default router;
