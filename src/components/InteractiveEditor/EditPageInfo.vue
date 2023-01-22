<template>
  <modal
    :name="modalName"
    :resizable="true"
    width="50%"
    height="80%"
    classes="dashy-modal edit-page-info"
    @closed="modalClosed"
  >
    <div v-if="allowViewConfig" class="edit-page-info-inner">
      <h3>{{ $t('interactive-editor.menu.edit-page-info-btn') }}</h3>
      <FormSchema
        v-model="formData"
        :schema="schema"
        class="page-info-form"
        name="pageInfoForm"
        @submit.prevent="saveToState"
      >
        <Button type="submit">
          {{ $t('interactive-editor.menu.save-stage-btn') }}
          <SaveIcon />
        </Button>
      </FormSchema>
    </div>
    <AccessError v-else />
  </modal>
</template>

<script>
import FormSchema from '@formschema/native';
import DashySchema from '@/utils/ConfigSchema';
import StoreKeys from '@/utils/StoreMutations';
import { modalNames } from '@/utils/defaults';
import Button from '@/components/FormElements/Button';
import SaveIcon from '@/assets/interface-icons/save-config.svg';
import AccessError from '@/components/Configuration/AccessError';

export default {
  name: 'EditPageInfo',
  components: {
    FormSchema,
    Button,
    SaveIcon,
    AccessError,
  },
  data() {
    return {
      formData: {},
      schema: DashySchema.properties.pageInfo,
      modalName: modalNames.EDIT_PAGE_INFO,
    };
  },
  computed: {
    pageInfo() {
      return this.$store.getters.pageInfo;
    },
    allowViewConfig() {
      return this.$store.getters.permissions.allowViewConfig;
    },
  },
  mounted() {
    this.formData = this.pageInfo;
  },
  methods: {
    /* When form submitted, update VueX store with new pageInfo, and close modal */
    saveToState() {
      this.$store.commit(StoreKeys.SET_PAGE_INFO, this.formData);
      this.$modal.hide(this.modalName);
      this.$store.commit(StoreKeys.SET_MODAL_OPEN, false);
      this.$store.commit(StoreKeys.SET_EDIT_MODE, true);
    },
    /* Called when modal manually closed, updates state to allow searching again */
    modalClosed() {
      this.$store.commit(StoreKeys.SET_MODAL_OPEN, false);
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/style-helpers';
@import '@/styles/media-queries';
@import '@/styles/schema-editor';

.edit-page-info-inner {
  padding: 1rem;
  background: var(--interactive-editor-background);
  color: var(--interactive-editor-color);
  height: 100%;
  overflow-y: auto;
  @extend .scroll-bar;

  h3 {
    font-size: 1.4rem;
    margin: 0.5rem;
  }

  .page-info-form {
    @extend .schema-form;

    margin-bottom: 2.5rem;
  }
}
</style>
