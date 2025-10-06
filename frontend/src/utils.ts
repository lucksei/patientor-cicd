import { HealthCheckRating } from './types';
export const toHealthCheckRating = (rating: string): HealthCheckRating => {
  switch (rating) {
    case 'Healthy':
      return HealthCheckRating.Healthy;
    case 'LowRisk':
      return HealthCheckRating.LowRisk;
    case 'HighRisk':
      return HealthCheckRating.HighRisk;
    case 'CriticalRisk':
      return HealthCheckRating.CriticalRisk;
    default:
      return HealthCheckRating.Healthy;
  }
};
