/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,ts,svelte}'],
	theme: {
		extend: {
			animation: {
				popup: 'popup 300ms ease-in-out'
			},
			keyframes: {
				popup: {
					'0%': { transform: 'scale(0,0)' },
					'70%': { transform: 'scale(1.1,1.1)' },
					'100%': { transform: 'scale(1,1)' }
				}
			}
		}
	},
	plugins: []
};
