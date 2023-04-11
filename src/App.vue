<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import APP_VERSION from './data/version';

declare global {
  interface Window {
    getVersion: () => string;
  }
}

export default defineComponent({
  name: 'App',
  setup() {
    window['getVersion'] = () => APP_VERSION.toString();
  },
});
</script>
