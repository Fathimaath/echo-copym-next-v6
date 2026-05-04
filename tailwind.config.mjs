/** @type {import('tailwindcss').Config} */
export default {
    important: true,
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./public/assets/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-palanquin)", 'sans-serif'],
                code: ["var(--font-palanquin)", 'sans-serif'],
                grotesk: ["var(--font-palanquin)", 'sans-serif'],
                palanquin: ["var(--font-palanquin)", 'sans-serif'],
                brand: ["var(--font-palanquin)", 'sans-serif'],
            },
            colors: {
                color: {
                    1: "#255f99",
                    2: "#FFC876",
                    3: "#FF776F",
                    4: "#15a36e",
                    5: "#4A90E2",
                    6: "#FF98E2",
                },
                blue: {
                    100: '#ffffff',
                },
                stroke: {
                    1: "#26242C",
                },
                n: {
                    1: "#FFFFFF",
                    2: "#CAC6DD",
                    3: "#ADA8C3",
                    4: "#757185",
                    5: "#3F3A52",
                    6: "#252134",
                    7: "#15131D",
                    8: "#0E0C15",
                    9: "#474060",
                    10: "#43435C",
                    11: "#1B1B2E",
                    12: "#2E2A41",
                    13: "#6C7275",
                },
                primary: {
                    black: '#000000',
                    'dark-gray': '#1a1a1a',
                    'medium-gray': '#2d2d2d',
                    'light-gray': '#f5f5f5',
                    white: '#ffffff'
                },
                accent: {
                    bitcoin: '#f7931a',
                    success: '#00d4aa',
                    warning: '#ffb800',
                    error: '#ff4757'
                },
                icon: {
                    pink: '#FF6B9D',
                    orange: '#FF9F43',
                    yellow: '#FFD93D',
                    blue: '#4ECDC4',
                    purple: '#A55EEA',
                    green: '#26DE81',
                    teal: '#2BCBBA',
                    emerald: '#10B981',
                    'emerald-dark': '#059669',
                    gray: '#6B7280',
                    white: '#FFFFFF'
                }
            },
            letterSpacing: {
                tagline: ".15em",
            },
            spacing: {
                0.25: "0.0625rem",
                7.5: "1.875rem",
                15: "3.75rem",
                26: "6.5rem",
            },
            maxWidth: {
                "10xl": "100rem",
            },
            opacity: {
                15: ".15",
            },
            transitionDuration: {
                DEFAULT: "200ms",
            },
            transitionTimingFunction: {
                DEFAULT: "linear",
            },
            zIndex: {
                1: "1",
                2: "2",
                3: "3",
                4: "4",
                5: "5",
            },
            borderWidth: {
                DEFAULT: "0.0625rem",
            },
            backgroundImage: {
                "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
                "conic-gradient": "conic-gradient(from 225deg, #15a36e, #79FFF7, #255f99, #4A90E2, #15a36e)",
                "benefit-card-1": "url(assets/benefits/card-1.svg)",
                "benefit-card-2": "url(assets/benefits/card-2.svg)",
                "benefit-card-3": "url(assets/benefits/card-3.svg)",
                "benefit-card-4": "url(assets/benefits/card-4.svg)",
                "benefit-card-5": "url(assets/benefits/card-5.svg)",
                "benefit-card-6": "url(assets/benefits/card-6.svg)",
            },
            boxShadow: {
                'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
                'hover': '0 8px 30px rgba(0, 0, 0, 0.12)'
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'gradient': 'gradientBackground 8s ease infinite',
                'sweep': 'sweep 4s ease-in-out infinite',
                'gradient-xy': 'gradientXY 15s ease infinite',
                'scroll-left': 'scrollLeft 15s linear infinite',
                'rotate-coin': 'rotateCoin 4s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                },
                gradientBackground: {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' }
                },
                sweep: {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '20%': { opacity: '0.4' },
                    '50%': { opacity: '0.6' },
                    '80%': { opacity: '0.4' },
                    '100%': { transform: 'translateX(100%)', opacity: '0' }
                },
                gradientXY: {
                    '0%, 100%': { 'background-position': '0% 0%' },
                    '25%': { 'background-position': '100% 0%' },
                    '50%': { 'background-position': '100% 100%' },
                    '75%': { 'background-position': '0% 100%' }
                },
                scrollLeft: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' }
                },
                rotateCoin: {
                    '0%': { transform: 'rotateY(0deg)' },
                    '100%': { transform: 'rotateY(360deg)' }
                }
            }
        },
    },
    plugins: [],
};