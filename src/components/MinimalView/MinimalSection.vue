<template>
  <div :class="`minimal-section-inner ${selected ? 'selected' : ''} ${showAll ? 'show-all' : ''}`">
    <div v-if="items && (selected || showAll)" class="section-items">
      <template v-for="item in items">
        <SubItemGroup
          v-if="item.subItems"
          :key="item.id"
          :item-id="item.id"
          :title="item.title"
          :sub-items="item.subItems"
          @triggerModal="triggerModal"
        />
        <Item
          v-else
          :key="item.id"
          :item="item"
          :item-size="itemSize"
          :parent-section-title="title"
          :is-add-new="false"
          :section-display-data="displayData"
          @itemClicked="$emit('itemClicked')"
          @triggerModal="triggerModal"
        />
      </template>
    </div>
    <div v-if="widgets && selected && !showAll" class="minimal-widget-wrap">
      <WidgetBase
        v-for="(widget, widgetIndx) in widgets"
        :key="widgetIndx"
        :widget="widget"
        :index="widgetIndx"
        @navigateToSection="navigateToSection"
      />
    </div>
    <div v-if="selected && !showAll && !widgets && items.length === 0" class="empty-section">
      <p>{{ $t('home.no-items-section') }}</p>
    </div>
    <IframeModal
      :ref="`iframeModal-${groupId}`"
      :name="`iframeModal-${groupId}`"
      @closed="$emit('itemClicked')"
    />
  </div>
</template>

<script>
import router from '@/router';
import Item from '@/components/LinkItems/Item.vue';
import WidgetBase from '@/components/Widgets/WidgetBase';
import SubItemGroup from '@/components/LinkItems/SubItemGroup.vue';
import IframeModal from '@/components/LinkItems/IframeModal.vue';

export default {
  name: 'ItemGroup',
  components: {
    Item,
    WidgetBase,
    SubItemGroup,
    IframeModal,
  },
  props: {
    groupId: String,
    title: String,
    icon: String,
    displayData: Object,
    items: Array,
    widgets: Array,
    itemSize: String,
    modalOpen: Boolean,
    index: Number,
    selected: Boolean,
    showAll: Boolean,
  },
  computed: {
    appConfig() {
      return this.$store.getters.appConfig;
    },
  },
  methods: {
    selectSection(index) {
      this.$emit('sectionSelected', index);
    },
    /* Returns a unique lowercase string, based on name, for section ID */
    makeId(str) {
      if (!str) return 'unnamed-item';
      return str
        .replace(/\s+/g, '-')
        .replace(/[^ A-Za-z]/g, '')
        .toLowerCase();
    },
    /* Opens the iframe modal */
    triggerModal(url) {
      this.$refs[`iframeModal-${this.groupId}`].show(url);
    },
    shouldEnableStatusCheck(itemPreference) {
      const globalPreference = this.appConfig.statusCheck || false;
      return itemPreference === undefined ? globalPreference : itemPreference;
    },
    getStatusCheckInterval() {
      let interval = this.appConfig.statusCheckInterval;
      if (!interval) return 0;
      if (interval > 60) interval = 60;
      if (interval < 1) interval = 0;
      return interval;
    },
    /* Navigate to the section's single-section view page */
    navigateToSection() {
      const parse = (section) => section.replace(' ', '-').toLowerCase().trim();
      const sectionIdentifier = parse(this.title);
      router.push({ path: `/home/${sectionIdentifier}` });
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/media-queries';
@import '@/styles/style-helpers';

.minimal-section-inner {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background: var(--minimal-view-group-background);
  border-radius: 0 0 var(--curve-factor) var(--curve-factor);

  .section-items {
    display: grid;
    @include phone {
      --minimal-col-count: 1;
    }
    @include tablet {
      --minimal-col-count: 2;
    }
    @include laptop {
      --minimal-col-count: 3;
    }
    @include monitor {
      --minimal-col-count: 4;
    }
    @include big-screen {
      --minimal-col-count: 5;
    }
    @include big-screen-up {
      --minimal-col-count: 6;
    }

    grid-template-columns: repeat(var(--minimal-col-count, 1), minmax(0, 1fr));
  }

  .minimal-widget-wrap {
    padding: 1rem;
  }

  .empty-section {
    padding: 1rem;
    margin: 0.5rem auto;
    color: var(--minimal-view-group-color);
    font-size: 1rem;
    font-style: italic;
    opacity: var(--dimming-factor);
  }

  &.selected {
    border: 1px solid var(--minimal-view-group-color);
    grid-column-start: span var(--col-count, 3);

    &:not(.show-all) {
      min-height: 300px;
    }
  }

  &.show-all {
    border: none;
  }
}
</style>
