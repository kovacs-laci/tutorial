// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Tutorials',
  tagline: 'Tananyagok leendő szoftverfejlesztők számára',
  favicon: 'img/favicon.ico',

  url: 'https://kovacslaci.hu',
  baseUrl: '/tananyagok/',

  organizationName: 'kovacs-laci', // saját név vagy GitHub org
  projectName: 'tutorial',        // projekt neve

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'hu',
    locales: ['hu'],
  },
  plugins: [ require.resolve('docusaurus-lunr-search'), ],
  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // nincs editUrl → nem jelenik meg "Edit this page"
        },
        blog: false, // nincs blog
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    tableOfContents: {
      minHeadingLevel: 2, // pl. ##-tól kezdve
      maxHeadingLevel: 4, // ####-ig építse fel
    },
    // algolia: {
    //   appId: 'SAJÁT_APP_ID',
    //   apiKey: 'SAJÁT_API_KEY',
    //   indexName: 'SAJÁT_INDEX_NÉV',
    // },
    navbar: {

      items: [
        {
          to: '/',              // kezdő oldal
          position: 'left',     // bal oldali menüben jelenjen meg
          html: '<span title="Kezdőlap" style="font-size: 1.2rem;">🏠</span>',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tananyagok',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [], // nincs extra link
      copyright: `Copyright © 2025–${new Date().getFullYear()} Kovács László - Built with <a href="https://docusaurus.io" target="_blank" rel="noopener noreferrer">Docusaurus</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
