import { UserConfig } from 'vite';

export default {
    build: {
        rollupOptions: {
            input: ['index.html', 'about.html', 'gallery.html'],
            output: {
                entryFileNames: '[hash:1].js',
                chunkFileNames: '[hash:1].js',
                assetFileNames: '[hash:1].[ext]'
            }
        }
    },
    publicDir: 'static'
} satisfies UserConfig;