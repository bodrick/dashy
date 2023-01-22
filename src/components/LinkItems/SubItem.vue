<template ref="container">
  <div class="sub-item-wrapper">
    <a
      :id="`link-${id}`"
      v-longPress="true"
      v-tooltip="subItemTooltip"
      :href="hyperLinkHref"
      :target="anchorTarget"
      rel="noopener noreferrer"
      tabindex="0"
      class="sub-item-link item"
      @click="itemClicked"
      @contextmenu.prevent
      @long-press="openContextMenu"
      @mouseup.right="openContextMenu"
    >
      <!-- Item Icon -->
      <Icon
        :icon="item.icon"
        :url="item.url"
        size="small"
        :style="customStyles"
        class="sub-icon-img bounce"
      />
    </a>
    <!-- Right-click context menu -->
    <ContextMenu
      :id="`context-menu-${id}`"
      v-click-outside="closeContextMenu"
      :show="contextMenuOpen && !isAddNew"
      :pos-x="contextPos.posX"
      :pos-y="contextPos.posY"
      :disable-edit="true"
      @launchItem="launchItem"
    />
  </div>
</template>

<script>
import Icon from '@/components/LinkItems/ItemIcon.vue';
import ContextMenu from '@/components/LinkItems/ItemContextMenu';
import ItemMixin from '@/mixins/ItemMixin';
// import { targetValidator } from '@/utils/ConfigHelpers';

export default {
  name: 'Item',
  components: {
    Icon,
    ContextMenu,
  },
  mixins: [ItemMixin],
  props: {
    id: String, // The unique ID of a tile (e.g. 001)
    item: Object,
  },
  data() {
    return {};
  },
  computed: {
    subItemTooltip() {
      return this.title;
    },
  },
  methods: {},
};
</script>

<style lang="scss">
.sub-item-wrapper {
  flex-grow: 1;
  flex-basis: 6rem;
  display: flex;
  a.sub-item-link {
    margin: 0.2rem;
    .sub-icon-img {
      margin: 0;
    }
  }
  &.wrap-size-large {
    flex-basis: 12rem;
  }
}
</style>
