/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    important: true,
    theme: {
        extend: {
            keyframes: {
                flicker: {
                    '0%, 100%': {opacity: 1},
                    '50%': {opacity: 0},
                },
            },
            animation: {
                flicker: "flicker infinite 500ms",
            },
            backgroundImage: {
                'topography': "url('./assets/topography.svg')",
            },
        }
    },
    plugins: [],
}

