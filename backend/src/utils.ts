import { Gender, HealthCheckRating } from './types';
import { z } from 'zod';

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

const newBaseEntrySchema = z.object({
  date: z.string().date(),
  specialist: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  diagnosisCodes: z.array(z.string()).optional(),
});

const newHealthCheckEntrySchema = newBaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const newOccupationalHealthcareEntrySchema = newBaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

const newHospitalEntrySchema = newBaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z
    .object({
      date: z.string().date(),
      criteria: z.string(),
    })
    .optional(),
});

const newEntrySchema = z.union([
  newOccupationalHealthcareEntrySchema,
  newHospitalEntrySchema,
  newHealthCheckEntrySchema,
]);

export {
  newPatientSchema,
  newEntrySchema,
  // newHealthCheckEntrySchema,
  // newOccupationalHealthcareEntrySchema,
  // newHospitalEntrySchema,
};
