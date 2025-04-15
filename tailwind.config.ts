
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom gaming colors
                booyah: {
                    purple: {
                        DEFAULT: '#9b87f5',
                        dark: '#1A1F2C',
                        light: '#D6BCFA'
                    },
                    neon: {
                        blue: '#1EAEDB',
                        orange: '#F97316',
                        pink: '#D946EF'
                    },
                    fire: '#ea384c',
                    smoke: '#000000e6'
                }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
                'pulse-neon': {
                    '0%, 100%': { 
                        textShadow: '0 0 5px #1EAEDB, 0 0 20px #1EAEDB' 
                    },
                    '50%': { 
                        textShadow: '0 0 15px #1EAEDB, 0 0 30px #1EAEDB, 0 0 45px #1EAEDB'
                    }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'flicker': {
                    '0%, 18%, 22%, 25%, 53%, 57%, 100%': {
                        textShadow: '0 0 7px #D946EF, 0 0 10px #D946EF, 0 0 21px #D946EF'
                    },
                    '20%, 24%, 55%': { textShadow: 'none' }
                },
                'fire': {
                    '0%': { boxShadow: '0 0 5px #ea384c, 0 0 10px #ea384c' },
                    '100%': { boxShadow: '0 0 10px #ea384c, 0 0 20px #ea384c, 0 0 30px #ea384c' }
                },
                'smoke-drift': {
                    '0%': { transform: 'translateX(0) translateY(0)', opacity: '0.8' },
                    '50%': { transform: 'translateX(10px) translateY(-15px)', opacity: '0.5' },
                    '100%': { transform: 'translateX(0) translateY(0)', opacity: '0.8' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'pulse-neon': 'pulse-neon 2s infinite',
                'float': 'float 6s ease-in-out infinite',
                'flicker': 'flicker 1.5s infinite alternate',
                'fire': 'fire 1.5s ease-in-out infinite alternate',
                'smoke-drift': 'smoke-drift 8s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
