/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}",],
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
        }
    },
    plugins: [],
}
