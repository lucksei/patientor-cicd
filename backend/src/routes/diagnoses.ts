import express from 'express';

import { getDiagnoses, getDiagnose } from '../services/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses = getDiagnoses();
  res.json(diagnoses);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const diagnose = getDiagnose(id);
  if (diagnose === undefined) {
    return res.status(404).end();
  }
  return res.json(diagnose);
});

export default router;
