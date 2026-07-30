import {defineConfig, UserConfig} from 'vite';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts',
        browser: {
            screenshotFailures: false,
            screenshotDirectory: '.vitest-screenshots',
            enabled: true,
            name: 'chromium',
            provider: playwright(),
            instances: [
                {
                    browser: 'chromium'
                }
            ],
            // headless: process.env.CI ? true : false
            headless: true
        },
        deps: {
            inline: ['@exodus/bytes']
        }
    }
} as UserConfig)
