import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon.svg'],
        manifest: {
          id: '/',
          name: 'ShishuDose BD - Pediatric Dosing',
          short_name: 'ShishuDose',
          description: 'Pediatric drug dosing calculator and clinical guidelines for Bangladeshi doctors by Dr. Ashraful Haque Oly.',
          theme_color: '#0284c7',
          background_color: '#0f172a',
          display: 'standalone',
          display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
          orientation: 'portrait-primary',
          categories: ['medical', 'health', 'productivity', 'utilities'],
          dir: 'ltr',
          lang: 'en',
          iarc_rating_id: 'e84b072d-71b3-4d3e-86ae-31a8ce4e53b7',
          start_url: '/',
          scope: '/',
          prefer_related_applications: false,
          scope_extensions: [
            {
              origin: 'https://ais-pre-47sgepddpti6gm3ltqnsrh-558617189645.asia-southeast1.run.app',
            },
            {
              origin: 'https://shishudosebd.com',
            },
            {
              origin: 'https://www.shishudosebd.com',
            },
          ],
          icons: [
            {
              src: 'https://i.ibb.co.com/Z66670g4/launchericon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'https://i.ibb.co.com/Z66670g4/launchericon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
          screenshots: [
            {
              src: '/screenshot-narrow.png',
              sizes: '720x1280',
              type: 'image/png',
              form_factor: 'narrow',
              label: 'Pediatric Drug Dosing & Emergency Crash Sheet',
            },
            {
              src: '/screenshot-wide.png',
              sizes: '1280x720',
              type: 'image/png',
              form_factor: 'wide',
              label: 'Pediatric Multi-Medication Prescription Pad',
            },
          ],
          shortcuts: [
            {
              name: 'Emergency Protocols',
              short_name: 'Emergency',
              description: 'Quick resuscitation, shock & crash cart drugs',
              url: '/?tab=emergency',
              icons: [{ src: 'https://i.ibb.co.com/Z66670g4/launchericon-512x512.png', sizes: '512x512' }],
            },
            {
              name: 'Drug Dosing Directory',
              short_name: 'Drugs',
              description: 'DGDA pediatric dosage calculator',
              url: '/?tab=drugs',
              icons: [{ src: 'https://i.ibb.co.com/Z66670g4/launchericon-512x512.png', sizes: '512x512' }],
            },
            {
              name: 'Prescription Pad',
              short_name: 'Rx Pad',
              description: 'Multi-drug pediatric prescription generator',
              url: '/?tab=drugs&openRx=true',
              icons: [{ src: 'https://i.ibb.co.com/Z66670g4/launchericon-512x512.png', sizes: '512x512' }],
            },
            {
              name: 'Clinical Guidelines',
              short_name: 'Guidelines',
              description: 'ICDDR,B, WHO IMCI & BPA protocols',
              url: '/?tab=guidelines',
              icons: [{ src: 'https://i.ibb.co.com/Z66670g4/launchericon-512x512.png', sizes: '512x512' }],
            },
          ],
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: false,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.', '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      sourcemap: false, // Never generate source maps in production to hide raw TypeScript source code
      minify: true, // Minify and mangle all variable/function names
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('jspdf') || id.includes('html2canvas')) {
              return 'pdf';
            }
            if (id.includes('firebase')) {
              return 'firebase';
            }
          }
        }
      }
    },
  };
});
