<template>
  <q-dialog id="dialog" ref="dialog" @hide="() => $emit('hide')" persistent>
    <q-card style="width: 50%; min-width: 500px; max-width: unset">
      <q-card-section id="title-section">
        <div class="text-h4" style="overflow: hidden">Nieuw event</div>
      </q-card-section>
      <q-form @submit.prevent="onSave">
        <q-card-section class="q-gutter-y-sm">
          <q-input filled v-model="eventName" label="Wat *" lazy-rules :rules="[(val) => (val && val.length > 0) || 'Veld is verplicht']" />
          <q-input filled v-model="location" label="Waar *" lazy-rules :rules="[(val) => (val && val.length > 0) || 'Veld is verplicht']" />
          <q-input filled v-model="name" label="Door wie *" lazy-rules :rules="[(val) => (val && val.length > 0) || 'Veld is verplicht']" />

          <q-select v-model="day" :options="schedule.days.map((_, index) => index)" :option-label="(item) => (item === null ? '' : schedule.days[item].name)" filled />
          <div class="row items-center justify-between no-wrap q-gutter-x-md">
            <q-input prefix="Begint om" v-model="timeStart" dense :rules="[validateTime, () => validateBefore(timeStart, timeEnd), () => validateAfter(timeEnd, timeStart), validateDuration]" reactive-rules>
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="timeStart" :hour-options="[8, 9, 10, 11, 12, 13, 14, 15, 16, 17]">
                      <div class="row items-center">
                        <span>Begintijd</span>
                        <q-space />
                        <q-btn v-close-popup label="Ok" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input prefix="Eindigt om" v-model="timeEnd" dense :rules="['time', validateTime]">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="timeEnd" :hour-options="[8, 9, 10, 11, 12, 13, 14, 15, 16, 17]">
                      <div class="row items-center">
                        <span>Eindtijd</span>
                        <q-space />
                        <q-btn v-close-popup label="Ok" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
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
      location: ref(''),
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
      const slot = this.schedule.createSlot(this.eventName.trim(), this.location.trim(), this.name.trim(), Time.parse(this.timeStart), Time.parse(this.timeEnd));

      const track = this.schedule.getTrack(this.day, slot);
      this.schedule.addSlot(this.day, track.id, slot);

      this.$emit('ok', slot);
      this.hide();
    },
    validateTime(value: string): boolean | string {
      try {
        const time = Time.parse(value);
        if (time.hour < 8 || time.hour > 17) return 'Kies een tijd tussen 08:00 en 17:59';

        return true;
      } catch {
        return 'Ongeldig formaat, HH:MM';
      }
    },
    validateBefore(value: string, endTime: string): boolean | string {
      try {
        const timeA = Time.parse(value);
        const timeB = Time.parse(endTime);

        return timeA.isBefore(timeB) ? true : 'Beginttijd is voor eindtijd';
      } catch {
        return false;
      }
    },
    validateAfter(value: string, startTime: string): boolean | string {
      try {
        const timeA = Time.parse(value);
        const timeB = Time.parse(startTime);

        return timeA.isAfter(timeB); // ? true : 'Eindtijd is na begintijd';
      } catch {
        return false;
      }
    },
    validateDuration() {
      try {
        const timeA = Time.parse(this.timeStart);
        const timeB = Time.parse(this.timeEnd);

        return Time.minutesBetween(timeA, timeB) < 30 ? 'Minimum tijd is 30 minuten' : true;
      } catch {
        return false;
      }
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
