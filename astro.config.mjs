import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'dlc dev kit',
			social: {
				github: 'https://github.com/bennyhodl/dlcdevkit',
				twitter: 'https://twitter.com/bennyhodl',
			},
			sidebar: [
				{
					label: 'About',
					link: "/about"
					// items: [
					// 	// Each item here is one entry in the navigation menu.
					// 	// { label: 'Example Guide', link: '/guides/example/' },
					// ],
				},
				{
					label: 'Getting Started',
					items: [
						{ label: "Quickstart", link: "/getting-started/quickstart/"}
					]
				},
				{
					label: 'Custom DDK',
					items: [
						{label: "Overview", link: "/custom-ddk/overview"},
						{label: "Transport", link: "/custom-ddk/transport"},
						{label: "Storage", link: "/custom-ddk/storage"},
						{label: "Oracle", link: "/custom-ddk/oracle"},
					]
				},
			],
		}),
	],
});
