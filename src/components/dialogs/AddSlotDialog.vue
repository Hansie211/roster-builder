<template>
  <q-dialog id="dialog" ref="dialog" @hide="() => $emit('hide')" persistent>
    <q-card style="width: 50%; min-width: 500px; max-width: unset">
      <q-card-section id="title-section">
        <div class="text-h4" style="overflow: hidden">{{ existingEvent ? 'Event bewerken' : 'Nieuw event' }}</div>
      </q-card-section>
      <q-form @submit.prevent="onSave">
        <q-card-section class="q-gutter-y-sm">
          <q-input autofocus filled v-model="formEvent.name" :placeholder="existingEvent?.name" label="Wat *" stack-label lazy-rules :rules="[(val) => !!existingEvent?.name || (val && val.length > 0) || 'Veld is verplicht']" />
          <q-input filled v-model="formEvent.location" :placeholder="existingEvent?.location" label="Waar *" stack-label lazy-rules :rules="[(val) => !!existingEvent?.location || (val && val.length > 0) || 'Veld is verplicht']" />
          <q-input filled v-model="formEvent.host" :placeholder="existingEvent?.host" label="Door wie *" stack-label lazy-rules :rules="[(val) => !!existingEvent?.host || (val && val.length > 0) || 'Veld is verplicht']" />

          <q-tabs v-model="formEvent.dayIndex" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
            <q-tab v-for="(day, dayIndex) in schedule.days" :key="dayIndex" :name="dayIndex" :label="day.name" />
          </q-tabs>

          <div class="row items-center justify-between no-wrap q-gutter-x-md">
            <q-input prefix="Begint om" v-model="formEvent.timeStart" dense :rules="[validateTime, () => validateBefore(formEvent.timeStart, formEvent.timeEnd), () => validateAfter(formEvent.timeEnd, formEvent.timeStart), validateDuration]" reactive-rules>
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="formEvent.timeStart" :hour-options="[8, 9, 10, 11, 12, 13, 14, 15, 16, 17]">
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

            <q-input prefix="Eindigt om" v-model="formEvent.timeEnd" dense :rules="['time', validateTime]">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="formEvent.timeEnd" :hour-options="[8, 9, 10, 11, 12, 13, 14, 15, 16, 17]">
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
          <q-btn v-if="existingEvent" icon="save" color="primary" label="Opslaan" type="submit" />
          <q-btn v-else icon="add" color="primary" label="Toevoegen" type="submit" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Slot, Time, useScheduleStore } from 'src/stores/schedule-store';
import { defineComponent, PropType, ref } from 'vue';

export class Event {
  name: string;
  location: string;
  host: string;

  timeStart: string;
  timeEnd: string;

  dayIndex: number;

  constructor(name: string, location: string, host: string, timeStart: string, timeEnd: string, dayIndex: number) {
    this.name = name;
    this.location = location;
    this.host = host;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.dayIndex = dayIndex;
  }

  public static fromSlot = (slot: Slot, dayIndex: number): Event => {
    return new Event(slot.eventName, slot.location, slot.persons, slot.start.toString(), slot.end.toString(), dayIndex);
  };

  public static fromEvent = (event: Event): Event => {
    return new Event(event.name, event.location, event.host, event.timeStart, event.timeEnd, event.dayIndex);
  };
}

export default defineComponent({
  name: 'AddSlotDialog',
  emits: ['ok', 'hide'],
  props: {
    existingEvent: {
      type: Object as PropType<Event | null>,
      required: false,
    },
  },
  setup(props) {
    const schedule = useScheduleStore();

    return {
      schedule,
      formEvent: ref(new Event(props.existingEvent?.name ?? '', props.existingEvent?.location ?? '', props.existingEvent?.host ?? '', props.existingEvent?.timeStart ?? '08:00', props.existingEvent?.timeEnd ?? '17:00', props.existingEvent?.dayIndex ?? 0)),
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
      if (this.existingEvent) {
        this.formEvent.name = !!this.formEvent.name ? this.formEvent.name : this.existingEvent.name;
        this.formEvent.location = !!this.formEvent.location ? this.formEvent.location : this.existingEvent.location;
        this.formEvent.host = !!this.formEvent.host ? this.formEvent.host : this.existingEvent.host;
      }

      this.$emit('ok', Event.fromEvent(this.formEvent));
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

        return timeA.isAfter(timeB) ? true : 'Eindtijd is na begintijd';
      } catch {
        return false;
      }
    },
    validateDuration() {
      try {
        const timeA = Time.parse(this.formEvent.timeStart);
        const timeB = Time.parse(this.formEvent.timeEnd);

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
