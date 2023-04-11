<template>
  <q-dialog id="dialog" ref="dialog" @hide="() => $emit('hide')" persistent>
    <q-card style="width: 50%; min-width: 500px; max-width: unset">
      <q-card-section id="title-section">
        <div class="text-h4" style="overflow: hidden">Nieuw event</div>
      </q-card-section>
      <q-form @submit.prevent="onSave">
        <q-card-section class="q-gutter-y-sm">
          <q-input filled v-model="eventName" label="Wat *" lazy-rules :rules="[(val) => (val && val.length > 0) || 'Veld is verplicht']" />
          <q-input filled v-model="name" label="Door wie *" lazy-rules :rules="[(val) => (val && val.length > 0) || 'Veld is verplicht']" />

          <q-select v-model="day" :options="schedule.days.map((_, index) => index)" :option-label="(item) => (item === null ? '' : schedule.days[item].name)" filled />
          <div class="row items-center justify-between">
            <div class="cursor-pointer">
              Begint om {{ timeStart }}
              <q-icon name="access_time" />
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="timeStart" :hour-options="[8, 9, 10, 11, 12, 13, 14, 15, 16, 17]" :minute-options="[0, 30]">
                  <div class="row items-center">
                    <span>Begintijd</span>
                    <q-space />
                    <q-btn v-close-popup label="Ok" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </div>
            <div class="cursor-pointer">
              Eindigt om {{ timeEnd }}
              <q-icon name="access_time" />
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="timeEnd" :hour-options="[8, 9, 10, 11, 12, 13, 14, 15, 16, 17]" :minute-options="[0, 30]">
                  <div class="row items-center">
                    <span>Eindtijd</span>
                    <q-space />
                    <q-btn v-close-popup label="Ok" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </div>
          </div>
        </q-card-section>
        <q-card-section id="action-section" class="row q-gutter-x-sm q-pt-xl">
          <q-btn outline icon="close" label="Sluiten" @click="hide" />
          <q-space />
          <q-btn icon="add" color="primary" label="Toevoegen" type="submit" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Time, useScheduleStore } from 'src/stores/schedule-store';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AddSlotDialog',
  emits: ['ok', 'hide'],
  setup() {
    const schedule = useScheduleStore();
    return {
      schedule,
      name: ref(''),
      eventName: ref(''),
      timeStart: ref('08:00'),
      timeEnd: ref('17:00'),
      day: ref(0),
    };
  },
  methods: {
    show() {
      this.dialogComponent.show();
    },
    hide() {
      this.dialogComponent.hide();
    },
    onSave() {
      const slot = this.schedule.createSlot(this.eventName.trim(), this.name.trim(), Time.parse(this.timeStart), Time.parse(this.timeEnd));

      const track = this.schedule.getTrack(this.day, slot);
      this.schedule.addSlot(this.day, track.id, slot);

      this.$emit('ok', slot);
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
<style scoped>
#box {
  margin: 5px;
}

#dialog-title {
  font-size: 1.8em;
  font-weight: bold;
}
</style>
