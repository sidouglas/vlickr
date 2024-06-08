/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  root: '.',
  plugins: [react(), tsconfigPaths()],
  test: {
    css: true,
    mockReset: true,
    environment: 'jsdom',
    // reporters: ['html'],
    globals: true,
    setupFiles: './src/test/setup.ts',
    snapshotSerializers: ['./src/test/stubComponent/serializer.stub.js'],
  },
});
