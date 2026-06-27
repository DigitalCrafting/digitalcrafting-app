import { defineConfig } from 'tsup';
import sassPlugin from"esbuild-plugin-sass";

export default defineConfig({
    entry: ['src/index.ts'], // or your specific entry points
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,

    esbuildPlugins: [
        sassPlugin()
    ],
});