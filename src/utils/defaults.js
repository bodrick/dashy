export const pageInfo = {
  title: 'Dashy',
  description: '',
  navLinks: [],
  footerText: '',
};
export const appConfig = {};
export const language = 'en';
export const startingView = 'default';
export const iconSize = 'medium';
export const layout = 'auto';
export const theme = 'default';
export const fontAwesomeKey = '0821c65656';
export const faviconApi = 'allesedv';
export const sortOrder = 'default';
export const openingMethod = 'newtab';
export const routePaths = {
  home: '/home',
  minimal: '/minimal',
  workspace: '/workspace',
  about: '/about',
  login: '/login',
  download: '/download',
  notFound: '/404',
};
export const serviceEndpoints = {
  statusPing: '/status-ping',
  statusCheck: '/status-check',
  save: '/config-manager/save',
  rebuild: '/config-manager/rebuild',
  systemInfo: '/system-info',
  corsProxy: '/cors-proxy',
};
export const builtInThemes = [
  'default',
  'callisto',
  'material',
  'material-dark',
  'dashy-docs',
  'colorful',
  'dracula',
  'one-dark',
  'lissy',
  'cherry-blossom',
  'nord-frost',
  'nord',
  'argon',
  'fallout',
  'whimsy',
  'oblivion',
  'adventure',
  'crayola',
  'deep-ocean',
  'minimal-dark',
  'minimal-light',
  'thebe',
  'matrix',
  'matrix-red',
  'color-block',
  'raspberry-jam',
  'bee',
  'tiger',
  'glow',
  'vaporware',
  'cyberpunk',
  'material-original',
  'material-dark-original',
  'high-contrast-dark',
  'high-contrast-light',
  'adventure-basic',
  'basic',
];
export const swatches = [
  ['#eb5cad', '#985ceb', '#5346f3', '#5c90eb'],
  ['#5cdfeb', '#00CCB4', '#5ceb8d', '#afeb5c'],
  ['#eff961', '#ebb75c', '#eb615c', '#eb2d6c'],
  ['#060913', '#141b33', '#1c2645', '#263256'],
  ['#2b2d42', '#1a535c', '#372424', '#312437'],
  ['#f5f5f5', '#d9d9d9', '#bfbfbf', '#9a9a9a'],
  ['#636363', '#363636', '#313941', '#0d0d0d'],
];
export const mainCssVars = ['primary', 'background', 'background-darker'];
export const visibleComponents = {
  splashScreen: false,
  navigation: true,
  pageTitle: true,
  searchBar: true,
  settings: true,
  footer: true,
};
export const hideFurnitureOn = ['minimal', 'login', 'download'];
export const localStorageKeys = {
  LANGUAGE: 'language',
  HIDE_WELCOME_BANNER: 'hideWelcomeHelpers',
  LAYOUT_ORIENTATION: 'layoutOrientation',
  COLLAPSE_STATE: 'collapseState',
  ICON_SIZE: 'iconSize',
  THEME: 'theme',
  PRIMARY_THEME: 'primaryTheme',
  CUSTOM_COLORS: 'customColors',
  CONF_SECTIONS: 'confSections',
  CONF_WIDGETS: 'confSections',
  PAGE_INFO: 'pageInfo',
  APP_CONFIG: 'appConfig',
  BACKUP_ID: 'backupId',
  BACKUP_HASH: 'backupHash',
  HIDE_SETTINGS: 'hideSettings',
  USERNAME: 'username',
  MOST_USED: 'mostUsed',
  LAST_USED: 'lastUsed',
  KEYCLOAK_INFO: 'keycloakInfo',
};
export const cookieKeys = {
  AUTH_TOKEN: 'dashyAuthToken',
};
export const sessionStorageKeys = {
  SW_STATUS: 'serviceWorkerStatus',
  ERROR_LOG: 'errorLog',
};
export const modalNames = {
  CONF_EDITOR: 'CONF_EDITOR',
  REBUILD_APP: 'REBUILD_APP',
  ABOUT_APP: 'ABOUT_APP',
  LANG_SWITCHER: 'LANG_SWITCHER',
  EDIT_ITEM: 'EDIT_ITEM',
  EDIT_SECTION: 'EDIT_SECTION',
  EDIT_PAGE_INFO: 'EDIT_PAGE_INFO',
  EDIT_APP_CONFIG: 'EDIT_APP_CONFIG',
  EDIT_MULTI_PAGES: 'EDIT_MULTI_PAGES',
  EXPORT_CONFIG_MENU: 'EXPORT_CONFIG_MENU',
  MOVE_ITEM_TO: 'MOVE_ITEM_TO',
};
export const topLevelConfKeys = {
  PAGE_INFO: 'pageInfo',
  APP_CONFIG: 'appConfig',
  SECTIONS: 'sections',
};
export const splashScreenTime = 1000;
export const metaTagData = [
  { name: 'description', content: "A simple static homepage for you're server" },
];
export const toastedOptions = {
  position: 'bottom-center',
  duration: 2500,
  keepOnHover: true,
  className: 'toast-message',
  iconPack: 'fontawesome',
};
export const tooltipOptions = {
  defaultTrigger: 'hover focus',
  defaultHideOnTargetClick: true,
  autoHide: true,
  defaultHtml: false,
  defaultPlacement: 'auto',
  defaultLoadingContent: 'Loading...',
  defaultDelay: { show: 380, hide: 0 },
  // delay: { show: 380, hide: 0 },
};
export const backupEndpoint = 'https://dashy-sync-service.as93.net';
export const faviconApiEndpoints = {
  allesedv: 'https://f1.allesedv.com/128/$URL',
  clearbit: 'https://logo.clearbit.com/$URL',
  iconhorse: 'https://icon.horse/icon/$URL',
  faviconkit: 'https://api.faviconkit.com/$URL/64',
  duckduckgo: 'https://icons.duckduckgo.com/ip2/$URL.ico',
  yandex: 'https://favicon.yandex.net/favicon/$URL',
  google: 'https://www.google.com/s2/favicons?sz=128&domain_url=$URL',
  besticon: 'https://besticon-demo.herokuapp.com/icon?url=$URL&size=80..120..200',
  webmasterapi: 'https://api.webmasterapi.com/v1/favicon/yEwx0ZFs0CSPshHq/$URL',
  mcapi: 'https://eu.mc-api.net/v3/server/favicon/$URL',
};
export const iconCdns = {
  fa: 'https://kit.fontawesome.com',
  mdi: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.0.96/css/materialdesignicons.min.css',
  si: 'https://unpkg.com/simple-icons@v7/icons',
  generative: 'https://avatars.dicebear.com/api/identicon/{icon}.svg',
  generativeFallback: 'https://evatar.io/{icon}',
  localPath: './item-icons',
  faviconName: 'favicon.ico',
  homeLabIcons: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/{icon}.png',
  homeLabIconsFallback: 'https://raw.githubusercontent.com/NX211/homer-icons/master/png/{icon}.png',
};
export const widgetApiEndpoints = {
  anonAddy: 'https://app.anonaddy.com',
  astronomyPictureOfTheDay: 'https://go-apod.herokuapp.com/apod',
  blacklistCheck: 'https://api.blacklistchecker.com/check',
  codeStats: 'https://codestats.net/',
  covidStats: 'https://disease.sh/v3/covid-19',
  cryptoPrices: 'https://api.coingecko.com/api/v3/coins/',
  cryptoWatchList: 'https://api.coingecko.com/api/v3/coins/markets/',
  cveVulnerabilities: 'https://www.cvedetails.com/json-feed.php',
  domainMonitor: 'https://api.whoapi.com',
  ethGasPrices: 'https://ethgas.watch/api/gas',
  ethGasHistory: 'https://ethgas.watch/api/gas/trend',
  exchangeRates: 'https://v6.exchangerate-api.com/v6/',
  flights: 'https://aerodatabox.p.rapidapi.com/flights/airports/icao/',
  githubTrending: 'https://gh-trending-repos.herokuapp.com/',
  healthChecks: 'https://healthchecks.io/api/v1/checks',
  holidays: 'https://kayaposoft.com/enrico/json/v2.0/?action=getHolidaysForDateRange',
  jokes: 'https://v2.jokeapi.dev/joke/',
  news: 'https://api.currentsapi.services/v1/latest-news',
  mullvad: 'https://am.i.mullvad.net/json',
  publicIp: 'https://ipapi.co/json',
  publicIp2: 'https://api.ipgeolocation.io/ipgeo',
  publicIp3: 'http://ip-api.com/json',
  readMeStats: 'https://github-readme-stats.vercel.app/api',
  rssToJson: 'https://api.rss2json.com/v1/api.json',
  sportsScores: 'https://www.thesportsdb.com/api/v1/json',
  stockPriceChart: 'https://www.alphavantage.co/query',
  tflStatus: 'https://api.tfl.gov.uk/line/mode/dlr,elizabeth-line,overground,tram,tube/status',
  walletBalance: 'https://api.blockcypher.com/v1',
  walletQrCode: 'https://www.bitcoinqrcodemaker.com/api',
  weather: 'https://api.openweathermap.org/data/2.5/weather',
  weatherForecast: 'https://api.openweathermap.org/data/2.5/forecast/daily',
  xkcdComic: 'https://xkcd.vercel.app/',
};
export const searchEngineUrls = {
  // Common
  duckduckgo: 'https://duckduckgo.com/?q=',
  google: 'https://google.com/search?q=',
  whoogle: 'https://whoogle.sdf.org/search?q=',
  qwant: 'https://www.qwant.com/?q=',
  startpage: 'https://www.startpage.com/do/search?query=',
  // Niche
  'searx-bar': 'https://searx.bar/search?q=',
  'searx-info': 'https://searx.info/search?q=',
  'searx-tiekoetter': 'https://searx.tiekoetter.com/search?q=',
  'searx-bissisoft': 'https://searx.bissisoft.com/search?q=',
  ecosia: 'https://www.ecosia.org/search?q=',
  metager: 'https://metager.org/meta/meta.ger3?eingabe=',
  swisscows: 'https://swisscows.com/web?query=',
  mojeek: 'https://www.mojeek.com/search?q=',
  peekier: 'https://peekier.com/#!',
  // Specific
  wikipedia: 'https://en.wikipedia.org/w/?search=',
  stackoverflow: 'https://stackoverflow.com/search?q=',
  wolframalpha: 'https://www.wolframalpha.com/input/?i=',
  reddit: 'https://www.reddit.com/search/?q=',
  youtube: 'https://youtube.com/results?q=',
  github: 'https://github.com/search?q=',
  bbc: 'https://www.bbc.co.uk/search?q=',
};
export const defaultSearchEngine = 'duckduckgo';
export const defaultSearchOpeningMethod = 'newtab';
export const searchBangs = {
  '/b': 'bbc',
  '/d': 'duckduckgo',
  '/g': 'google',
  '/r': 'reddit',
  '/w': 'wikipedia',
  '/y': 'youtube',
  '/gh': 'github',
  '/so': 'stackoverflow',
  '/wa': 'wolframalpha',
};
export const sentryDsn =
  'https://3138ea85f15a4fa883a5b27a4dc8ee28@o937511.ingest.sentry.io/5887934';
export const userStateEnum = {
  notConfigured: 0,
  loggedIn: 1,
  guestAccess: 2,
  notLoggedIn: 3,
  keycloakEnabled: 4,
};
export const pwa = {
  name: 'Dashy',
  manifestPath: './manifest.json',
  themeColor: '#00af87',
  msTileColor: '#0b1021',
  mode: 'production',
  iconPaths: {
    manifestCrossorigin: 'use-credentials',
    favicon64: './web-icons/favicon-64x64.png',
    favicon32: './web-icons/favicon-32x32.png',
    maskIcon: './web-icons/dashy-logo.png',
    msTileImage: './web-icons/dashy-logo.png',
  },
};

export default {
  pageInfo,
};
