import daisyui from "daisyui";
// import daisyUIThemes from "daisyui/src/theming/themes";
// import { Flowbite } from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	// darkMode: 'class',
	theme: {
		extend: {},
	},
	plugins: [daisyui],

};