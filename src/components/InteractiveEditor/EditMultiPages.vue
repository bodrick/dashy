<template>
  <modal
    :name="modalName"
    :resizable="true"
    width="50%"
    classes="dashy-modal edit-multi-pages"
    height="80%"
    @closed="modalClosed"
  >
    <div v-if="allowViewConfig" class="edit-multi-pages-inner">
      <h3>{{ $t('interactive-editor.menu.edit-page-info-btn') }}</h3>
      <FormSchema
        v-model="formData"
        :schema="schema"
        class="multi-page-form"
        name="multiPageForm"
        @submit.prevent="saveToState"
      >
        <SaveCancelButtons :save-click="saveToState" :cancel-click="cancelEditing" />
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
import SaveCancelButtons from '@/components/InteractiveEditor/SaveCancelButtons';
import AccessError from '@/components/Configuration/AccessError';

export default {
  name: 'EditPageInfo',
  components: {
    FormSchema,
    SaveCancelButtons,
    AccessError,
  },
  data() {
    return {
      formData: {},
      schema: DashySchema.properties.pages,
      modalName: modalNames.EDIT_MULTI_PAGES,
    };
  },
  computed: {
    pages() {
      return this.$store.getters.pages;
    },
    allowViewConfig() {
      return this.$store.getters.permissions.allowViewConfig;
    },
  },
  mounted() {
    this.formData = this.pages;
  },
  methods: {
    /* When form submitted, update VueX store with new pageInfo, and close modal */
    saveToState() {
      this.$store.commit(StoreKeys.SET_PAGES, this.formData);
      this.$modal.hide(this.modalName);
      this.$store.commit(StoreKeys.SET_MODAL_OPEN, false);
      this.$store.commit(StoreKeys.SET_EDIT_MODE, true);
    },
    /* Called when modal manually closed, updates state to allow searching again */
    modalClosed() {
      this.$store.commit(StoreKeys.SET_MODAL_OPEN, false);
    },
    cancelEditing() {
      this.$modal.hide(this.modalName);
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/style-helpers';
@import '@/styles/media-queries';
@import '@/styles/schema-editor';

.edit-multi-pages-inner {
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

  .multi-page-form {
    @extend .schema-form;

    margin-bottom: 2.5rem;

    fieldset div[data-fs-wrapper],
    fieldset div[data-fs-kind='object'] {
      flex-direction: row;
    }

    [name='multiPageForm'] button {
      width: 8rem;
      margin: 0 0.5rem 0.5rem;
      padding: 0.25rem 0.5rem;

      &[data-fs-button='push']::after {
        content: ' Add New';
      }

      &[data-fs-button='moveUp']::after {
        content: ' Move Up';
      }

      &[data-fs-button='moveDown']::after {
        content: ' Move Down';
      }

      &[data-fs-button='delete']::after {
        content: ' Delete';
      }
    }

    div[data-fs-type='object'] div[data-fs-type='object'] {
      div[data-fs-input='object'] {
        border: none;
      }

      label {
        display: none;
      }

      div[data-fs-input='object'] label {
        display: block;
      }
    }

    fieldset div[data-fs-kind='object'] span {
      text-align: right;
    }

    fieldset button[data-fs-button='push'] {
      min-width: 15rem;
      padding: 0.5rem 0.75rem;
      margin: 0.5rem 0;
      font-size: 1rem;
      color: var(--interactive-editor-color);
      background: var(--interactive-editor-background);
      border: 1px solid var(--interactive-editor-color);
      border-radius: var(--curve-factor);

      &:hover {
        color: var(--interactive-editor-background);
        background: var(--interactive-editor-color);
      }
    }
  }
}
</style>
