import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // Set the base path for GitHub Pages
  base: '/diaries/',  // Replace 'your-repo-name' with the actual repo name
  
  server: {
    host: '0.0.0.0',
  }
});