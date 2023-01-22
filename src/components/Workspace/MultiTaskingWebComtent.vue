<template>
  <div ref="container" class="multi-taking-view"></div>
</template>

<script>
import Vue from 'vue';
import WebContent from '@/components/Workspace/WebContent';

export default {
  name: 'WebContent',
  props: {
    url: String, // The URL of currently visible app
  },
  data: () => ({
    openApps: [], // List of all currently open apps
  }),
  watch: {
    /* Update the currently open app, when URL changes */
    url() {
      this.launchApp();
    },
  },
  methods: {
    /* Check if app already open or not, and call appropriate opener */
    launchApp() {
      if (this.openApps.includes(this.url)) {
        this.openExistingApp();
      } else {
        this.openApps.push(this.url);
        this.appendNewApp();
      }
    },
    /* Opens a new app */
    appendNewApp() {
      const ComponentClass = Vue.extend(WebContent);
      const instance = new ComponentClass({
        propsData: { url: this.url, id: btoa(this.url) },
      });
      instance.$mount(); // pass nothing
      this.$refs.container.append(instance.$el);
    },
    /* Switches visibility to an already open app */
    openExistingApp() {
      for (const frame of document.querySelectorAll('.web-content')) {
        frame.classList.add('hide');
      }
      document.getElementById(btoa(this.url)).classList.remove('hide');
    },
  },
};
</script>

<style lang="scss" scoped>
iframe {
  position: absolute;
  left: var(--side-bar-width);
  height: calc(100% - var(--header-height));
  width: calc(100% - var(--side-bar-width));
  border: none;
  background: white;
}
</style>
