/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';

export const useConfirmSkipStore = defineStore(
  'confirm-skip',
  () => {
    const skips: Ref<{ [key: string]: boolean }> = ref({});

    const hasSkip = (id: string): boolean => {
      return skips.value[id] === true;
    };

    const setSkip = (id: string, value = true): void => {
      skips.value[id] = value;
    };

    return { skips, hasSkip, setSkip };
  },
  {
    persist: false,
  }
);
