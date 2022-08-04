const config = {
    content: [
        './content/**/*.md',
        './{templates,static}/**/*.{html,js}',
    ],

    plugins: [
        require('@tailwindcss/typography'),
        function({ addVariant }) {
            addVariant('child', '& > *');
            addVariant('child-hover', '& > *:hover');
        },
    ],

    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        strong: {
                            'font-weight': 700,
                        }
                    },
                },
            },
        },
    },

    mode: 'jit',

    darkMode: 'class',
}

module.exports = config;
