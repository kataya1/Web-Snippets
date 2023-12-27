import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
// https://astro.build/config
export default defineConfig({
    integrations: [react()],
    vite: {

        optimizeDeps: { exclude: ["fsevents"] },//solved the fsevents issue //https://stackoverflow.com/questions/75640753/vite-esbuild-error-no-loader-is-configured-for-node-files-node-modules-fs
        // Prevent Vite from trying to build native node.js modules 
        // exclude: ['fsevents'],

    },

});
