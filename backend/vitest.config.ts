import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    sequence: { concurrent: false },
    include: ['./src/**/*.test.ts'],
    environment: 'node',
  },
});
