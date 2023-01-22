<template>
  <SearchBar
    ref="MinimalSearchBar"
    :active="true"
    :minimal-search="true"
    @user-is-searching="userIsTypingSomething"
  />
</template>

<script>
import SearchBar from '@/components/Settings/SearchBar';

export default {
  name: 'MinimalSearch',
  components: {
    SearchBar,
  },
  props: {
    active: Boolean,
  },
  data() {
    return {
      input: '', // Users current search term
    };
  },
  computed: {
    appConfig() {
      return this.$store.getters.appConfig;
    },
    webSearchEnabled() {
      if (this.appConfig && this.appConfig.webSearch) {
        return !this.appConfig.webSearch.disableWebSearch;
      }
      return true;
    },
  },
  mounted() {
    window.addEventListener('keydown', this.startFiltering);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.startFiltering);
  },
  methods: {
    /* Emits users's search term up to parent */
    userIsTypingSomething(searchValue) {
      this.input = searchValue;
      this.$emit('user-is-searching', searchValue);
    },
  },
};
</script>
