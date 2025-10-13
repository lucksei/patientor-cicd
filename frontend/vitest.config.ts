import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    sequence: { concurrent: true },
    include: [
      './src/components/**/*.test.ts',
      './src/components/**/*.test.tsx',
    ],
    environment: 'jsdom',
    isolate: true,
    globals: true,
    // setupFiles: ['./testSetup.ts'],
  },
});
