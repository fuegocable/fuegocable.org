import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {
	type NativeIdealImageOptions,
} from 'docusaurus-plugin-native-ideal-image'

const config: Config = {
  title: 'fuegocable',
  tagline: 'open source usb audio modding',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://fuegocable.org',
  baseUrl: '/',

  organizationName: 'fuegocable',
  projectName: 'fuegocable.org',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('./plugins/dynamic-file-list'),
      {
        directories: ['assets/tc-applied-technologies'],
      },
    ],
		[
			'native-ideal-image',
			{
				presets: {
					default: {
						sizes: [650, 950, 1200, 9999],
						formats: ['webp'],
					},
				},
				disableInDev: false,
			} satisfies NativeIdealImageOptions,
		],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'fuegocable logo',
        src: 'img/logo-fuegocable.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/fuegocable/fuegocable.org',
          label: 'Edit on GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Site',
          items: [
            {
              label: 'Docs',
              to: '/docs/what-is-fuegocable',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Reddit',
              href: 'https://www.reddit.com/r/fuegocable/',
            },
            {
              label: 'Mastodon',
              href: 'https://mastodon.social/@fuegocable',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Edit this web',
              href: 'https://github.com/fuegocable/fuegocable.org',
            },
            {
              label: 'XMOS firmware',
              href: 'https://github.com/fuegocable/xmos-firmware',
            },
          ],
        },
      ],
      copyright: `fuegocable is open-source - <a href="https://en.wikipedia.org/wiki/Right_to_repair" target="_blank">right to repair</a> - built with docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
