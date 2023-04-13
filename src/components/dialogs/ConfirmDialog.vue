<template>
  <q-dialog id="dialog" ref="dialog" @hide="() => $emit('hide')">
    <q-card style="width: 40%; min-width: 400px; max-width: unset">
      <q-card-section>
        <q-form autofocus @submit.prevent="ok">
          <div class="text-h5 text-bold q-pt-md">{{ title }}</div>
          <div class="text-body1 q-pt-md">{{ text }}</div>
          <div class="flex row q-gutter-x-sm q-pt-lg">
            <q-checkbox v-if="skipId" v-model="noSkip" label="Niet meer vragen" dense />
            <q-space />
            <q-btn flat label="Nee" @click="hide" />
            <q-btn color="primary" label="Ja" type="submit" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useConfirmSkipStore } from 'src/stores/confirm-skip-store';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'ConfirmDialog',
  emits: ['ok', 'hide'],
  props: {
    title: {
      type: String,
      default: 'Let op!',
    },
    text: {
      type: String,
      default: 'Weet je het zeker?',
    },
    skipId: {
      type: Object as PropType<string | undefined>,
      default: undefined,
    },
  },
  setup() {
    const skipStore = useConfirmSkipStore();
    return {
      skipStore,
      noSkip: ref(false),
    };
  },
  methods: {
    show() {
      this.dialogComponent.show();
    },
    hide() {
      this.dialogComponent.hide();
    },
    ok() {
      if (this.noSkip === true && this.skipId) this.skipStore.setSkip(this.skipId, true);

      this.$emit('ok');
      this.hide();
    },
  },
  computed: {
    dialogComponent() {
      return this.$refs['dialog'] as { hide: () => void; show: () => void };
    },
  },
});
</script>
