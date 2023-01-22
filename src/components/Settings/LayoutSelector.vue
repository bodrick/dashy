<template>
  <div>
    <span class="options-label">{{ $t('settings.layout-label') }}</span>
    <div class="display-options">
      <IconDefault
        v-tooltip="tooltip($t('settings.layout-auto'))"
        :class="`layout-icon ${displayLayout === 'auto' ? 'selected' : ''}`"
        tabindex="-2"
        @click="updateDisplayLayout('auto')"
      />
      <IconHorizontal
        v-tooltip="tooltip($t('settings.layout-horizontal'))"
        :class="`layout-icon ${displayLayout === 'horizontal' ? 'selected' : ''}`"
        tabindex="-2"
        @click="updateDisplayLayout('horizontal')"
      />
      <IconVertical
        v-tooltip="tooltip($t('settings.layout-vertical'))"
        :class="`layout-icon ${displayLayout === 'vertical' ? 'selected' : ''}`"
        tabindex="-2"
        @click="updateDisplayLayout('vertical')"
      />
    </div>
  </div>
</template>

<script>
import StoreKeys from '@/utils/StoreMutations';
import IconDefault from '@/assets/interface-icons/layout-default.svg';
import IconHorizontal from '@/assets/interface-icons/layout-horizontal.svg';
import IconVertical from '@/assets/interface-icons/layout-vertical.svg';

export default {
  name: 'LayoutSelector',
  components: {
    IconDefault,
    IconHorizontal,
    IconVertical,
  },
  props: {
    displayLayout: {
      type: String,
      default: undefined,
    },
  },
  methods: {
    updateDisplayLayout(layout) {
      this.$store.commit(StoreKeys.SET_ITEM_LAYOUT, layout);
    },
    tooltip(content) {
      return { content, trigger: 'hover focus', delay: 250 };
    },
  },
};
</script>

<style scoped lang="scss">
span.options-label {
  color: var(--settings-text-color);
}

.display-options {
  color: var(--settings-text-color);

  svg {
    path {
      fill: var(--settings-text-color);
    }

    width: 1rem;
    height: 1rem;
    margin: 0.2rem;
    padding: 0.2rem;
    text-align: center;
    background: var(--background);
    border: 1px solid currentcolor;
    border-radius: var(--curve-factor);
    cursor: pointer;

    &:hover,
    &.selected {
      background: var(--settings-text-color);

      path {
        fill: var(--background);
      }
    }
  }
}
</style>
