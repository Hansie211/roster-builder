<template>
  <q-page>
    <div class="q-gutter-x-sm print-hide">
      <q-btn icon="add" @click="onAdd" class="q-mt-sm" round color="primary" />
      <q-btn icon="print" @click="doPrint" class="q-mt-sm" round color="primary" />
    </div>
    <div class="schedule track" id="schedule">
      <div class="time-slots track full-track">
        <div v-for="block in timeBlocks.filter((block) => block.minute === 0 || block.minute === 30)" :key="block.toKey()" class="time-slot" :style="{ 'grid-row': `time-${block.toKey()} / time-${nextBlock(block).toKey()}` }">
          <div class="line"></div>
          {{ block }}
        </div>
      </div>

      <div class="day-track full-track" v-for="(day, dayIndex) in schedule.days" :key="day.name">
        <div class="title text-h5 q-pt-sm">{{ day.name }}</div>
        <div class="tracks">
          <div class="track" v-for="track in day.getTracks()" :key="track.id">
            <div v-for="slot in track.getSlots()" :key="slot.id" class="slot" :style="{ 'grid-row': `time-${slot.start.toKey()} / time-${slot.end.toKey()}` }">
              <div class="slot-header flex row justify-end print-hide">
                <q-btn icon="edit" size="sm" round flat @click="() => onEdit(slot, dayIndex)" />
                <q-btn icon="delete" size="sm" round flat @click="() => removeSlot(day, track, slot)" />
              </div>
              <div class="slot-content">
                <div>{{ slot.eventName }}</div>
                <div>{{ slot.location }}</div>
                <div>{{ slot.persons }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Day, Slot, Time, Track, useScheduleStore } from 'src/stores/schedule-store';
import AddSlotDialog, { Event } from 'src/components/dialogs/AddSlotDialog.vue';
import { useMeta } from 'quasar';
import ConfirmDialog from 'src/components/dialogs/ConfirmDialog.vue';
import { useConfirmSkipStore } from 'src/stores/confirm-skip-store';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const schedule = useScheduleStore();
    const skipStore = useConfirmSkipStore();

    useMeta(() => {
      return {
        title: 'Rooster LIV',
      };
    });

    return {
      schedule,
      skipStore,
    };
  },
  methods: {
    doPrint() {
      window.print();
    },
    onAdd() {
      this.$q
        .dialog({
          component: AddSlotDialog,
        })
        .onOk((event: Event) => {
          const slot = this.schedule.createSlot(event.name.trim(), event.location.trim(), event.host.trim(), Time.parse(event.timeStart), Time.parse(event.timeEnd));
          const track = this.schedule.getTrack(event.dayIndex, slot);
          this.schedule.addSlot(event.dayIndex, track.id, slot);
        });
    },
    onEdit(slot: Slot, dayIndex: number) {
      this.$q
        .dialog({
          component: AddSlotDialog,
          componentProps: {
            existingEvent: Event.fromSlot(slot, dayIndex),
          },
        })
        .onOk(async (event: Event) => {
          const track = this.schedule.findTrack(slot);
          if (track === undefined) {
            console.error(`Cannot find track for '${slot.id}'.`);
            return;
          }

          await this.removeSlot(this.schedule.days[dayIndex], track, slot, true);

          const newSlot = this.schedule.createSlot(event.name.trim(), event.location.trim(), event.host.trim(), Time.parse(event.timeStart), Time.parse(event.timeEnd));
          const newTrack = this.schedule.getTrack(event.dayIndex, newSlot);
          this.schedule.addSlot(event.dayIndex, newTrack.id, newSlot);
        });
    },
    async removeSlot(day: Day, track: Track, slot: Slot, skipConfirm = false): Promise<void> {
      const skipId = 'CONFIRM_REMOVE_SLOT';

      if (!skipConfirm && !this.skipStore.hasSkip(skipId)) {
        await new Promise((resolve, reject) =>
          this.$q
            .dialog({
              component: ConfirmDialog,
              componentProps: {
                text: `Weet je zeker dat je '${slot.eventName}' op ${day.name.toLocaleLowerCase()} wilt verwijderen?`,
                skipId,
              },
            })
            .onOk(resolve)
            .onCancel(reject)
        );
      }

      delete track.slots[slot.id];
      if (Object.values(track.slots).length === 0) delete day.tracks[track.id];
    },

    nextBlock(block: Time): Time {
      const result = new Time(block.hour, block.minute);
      result.addMinutes(30);
      return result;
    },
  },
  computed: {
    timeBlocks(): Time[] {
      const blockSize = 1;
      const time = new Time(8, 0);

      const result = [];
      while (time.hour <= 17) {
        result.push(new Time(time.hour, time.minute));
        time.addMinutes(blockSize);
      }

      return result;
    },

    cssData() {
      const trackWidth = 140;
      const element = document.getElementById('schedule');

      return {
        templateRows: this.timeBlocks.map((block) => `[time-${block.toKey()}] 1fr`).join(' '),
        trackWidth: `${trackWidth}px`,
        lineSize: (80 + this.schedule.days.map((d) => Math.max(150, d.getTracks().length * trackWidth)).reduce((state, value) => state + value, 0)).toString() + 'px',
        pageSize: `${element?.offsetWidth}px ${element?.offsetHeight}px landscape`,
      };
    },
  },
});
</script>

<style scoped>
@media print {
  @page {
    size: v-bind('cssData.pageSize');
  }

  /* body {
    zoom: 50%;
  } */
}
.schedule {
  min-height: 100%;
  grid-template-columns: min-content;
  width: max-content;
}

.track {
  display: grid;
  grid-template-rows: v-bind('cssData.templateRows');
}

.day-track {
  display: flex;
  flex-direction: column;
  min-width: 150px;
  border-left: 1px solid black;
  padding-left: 3px;
  width: fit-content;
}

.day-track .title {
  height: 50px;
  text-align: center;
  flex-shrink: 0;
  flex-grow: 0;
}

.time-slots {
  padding-top: 50px;
  width: 50px;
}

.tracks {
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
}

.tracks .track {
  width: v-bind('cssData.trackWidth');
  overflow: hidden;
}

.slot-content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 100%;

  text-align: center;
  line-height: 1.1em;
  word-break: break-word;
}

.slot {
  display: flex;
  flex-direction: column;

  position: relative;

  height: calc(100% - 2px);
  padding: 2px;
  margin-left: 1px;
  margin-right: 3px;
  overflow: hidden;

  border: 1px solid black;
  background-color: white;
  border-radius: 5px;
}

.slot-header {
  display: none;

  position: absolute;
  left: 0;
  top: 0;
  right: 0;
}

.slot:hover .slot-header {
  display: flex;
}

.full-track {
  grid-row: 1 / 100000;
  min-height: 100%;
}

.time-slot {
  position: relative;
}
.line {
  height: 1px;
  width: v-bind('cssData.lineSize');
  border-top: 1px dotted rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: -1;
  top: 0px;
}
</style>
