<template>
  <div class="work-space">
    <SideBar
      :sections="sections"
      :init-url="getInitialUrl()"
      @launch-app="launchApp"
      @launch-widget="launchWidget"
    />
    <WebContent v-if="!isMultiTaskingEnabled" :url="url" />
    <MultiTaskingWebContent v-else :url="url" />
    <WidgetView v-if="widgets" :widgets="widgets" />
  </div>
</template>

<script>
import HomeMixin from '@/mixins/HomeMixin';
import SideBar from '@/components/Workspace/SideBar';
import WebContent from '@/components/Workspace/WebContent';
import WidgetView from '@/components/Workspace/WidgetView';
import MultiTaskingWebContent from '@/components/Workspace/MultiTaskingWebContent';
import Defaults from '@/utils/defaults';
import { GetTheme, ApplyLocalTheme, ApplyCustomVariables } from '@/utils/ThemeHelper';

export default {
  name: 'Workspace',
  components: {
    SideBar,
    WebContent,
    WidgetView,
    MultiTaskingWebContent: MultiTaskingWebContent,
  },
  mixins: [HomeMixin],
  data: () => ({
    url: '',
    widgets: null,
    GetTheme,
    ApplyLocalTheme,
    ApplyCustomVariables,
  }),
  computed: {
    sections() {
      return this.$store.getters.sections;
    },
    appConfig() {
      return this.$store.getters.appConfig;
    },
    isMultiTaskingEnabled() {
      return this.appConfig.enableMultiTasking || false;
    },
  },
  mounted() {
    this.setTheme();
    this.initiateFontAwesome();
    this.url = this.getInitialUrl();
  },
  methods: {
    launchApp(options) {
      if (options.target === 'newtab') {
        window.open(options.url, '_blank');
      } else {
        this.url = options.url;
      }
      this.widgets = null;
    },
    launchWidget(widgets) {
      this.url = '';
      this.widgets = widgets;
    },
    initiateFontAwesome() {
      const fontAwesomeScript = document.createElement('script');
      const faKey = this.appConfig.fontAwesomeKey || Defaults.fontAwesomeKey;
      fontAwesomeScript.setAttribute('src', `https://kit.fontawesome.com/${faKey}.js`);
      document.head.append(fontAwesomeScript);
    },
    /* Returns a service URL, if set as a URL param, or if user has specified landing URL */
    getInitialUrl() {
      const route = this.$route;
      if (route.query && route.query.url) {
        return decodeURI(route.query.url);
      } else if (this.appConfig.workspaceLandingUrl) {
        return this.appConfig.workspaceLandingUrl;
      }
      return;
    },
  },
};
</script>

<style scoped lang="scss">
.work-space {
  min-height: calc(100vh - var(--footer-height));
}
</style>
