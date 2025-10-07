import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    sequence: { concurrent: false },
    include: ['./tests/**/*.test.ts'],
    environment: 'node',
  },
});
