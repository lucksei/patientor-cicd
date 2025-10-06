import { NextFunction, Request, Response } from 'express';
import { newEntrySchema, newPatientSchema } from './utils';
import z from 'zod';

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error);
  if (error instanceof z.ZodError) {
    return res.status(400).json({ error: error.issues });
  } else {
    return res.status(400).json({ error: 'Something went wrong' });
  }
};

export { errorMiddleware, newPatientParser, newEntryParser };
