import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/todo-planner/',
  plugins: [react()],
  resolve: {
    alias: {
      '@/': '/src/'
    }
  }
});
