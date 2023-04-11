<template>
  <q-page>
    <q-btn icon="add" @click="onAdd" class="q-mt-sm print-hide" round color="primary" />
    <div class="schedule track">
      <div class="time-slots track full-track">
        <div v-for="block in timeBlocks" :key="block.toKey()" class="time-slot" :style="{ 'grid-row': 'time-' + block.toKey() }">
          <div v-if="block.minute === 0" class="line"></div>
          {{ block }}
        </div>
      </div>

      <div class="day-track full-track" v-for="day in schedule.days" :key="day.name">
        <div class="title text-h5 q-pt-sm">{{ day.name }}</div>
        <div class="tracks">
          <div class="track" v-for="track in day.getTracks()" :key="track.id">
            <div v-for="slot in track.getSlots()" :key="slot.id" class="slot" :style="{ 'grid-row': `time-${slot.start.toKey()} / time-${slot.end.toKey()}` }">
              <div class="slot-header flex row justify-end">
                <q-btn icon="delete" size="sm" round flat @click="() => removeSlot(day, track, slot)" />
              </div>
              <div class="slot-content">
                <div>{{ slot.eventName }}</div>
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
import AddSlotDialog from 'src/components/dialogs/AddSlotDialog.vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const schedule = useScheduleStore();

    return {
      schedule,
    };
  },
  methods: {
    onAdd() {
      this.$q.dialog({
        component: AddSlotDialog,
      });
    },
    removeSlot(day: Day, track: Track, slot: Slot) {
      delete track.slots[slot.id];
      if (Object.values(track.slots).length === 0) delete day.tracks[track.id];
    },
  },
  computed: {
    timeBlocks() {
      const blockSize = 30;
      const time = new Time(8, 0);

      const result = [];
      while (time.hour <= 17) {
        result.push(new Time(time.hour, time.minute));
        time.addMinutes(blockSize);
      }

      return result;
    },
  },
});
</script>

<style scoped>
@media print {
  @page {
    size: A4 landscape;
  }

  body {
    zoom: 50%;
  }
}
.schedule {
  height: 100%;
  grid-template-columns: min-content;
  width: fit-content;
}

.track {
  display: grid;
  grid-template-rows:
    [time-0800] 1fr
    [time-0830] 1fr
    [time-0900] 1fr
    [time-0930] 1fr
    [time-1000] 1fr
    [time-1030] 1fr
    [time-1100] 1fr
    [time-1130] 1fr
    [time-1200] 1fr
    [time-1230] 1fr
    [time-1300] 1fr
    [time-1330] 1fr
    [time-1400] 1fr
    [time-1430] 1fr
    [time-1500] 1fr
    [time-1530] 1fr
    [time-1600] 1fr
    [time-1630] 1fr
    [time-1700] 1fr
    [time-1730] 1fr;
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
  width: 130px;
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
  grid-row: 1 / 100;
}

.time-slot {
  position: relative;
}
.line {
  height: 1px;
  width: calc(100px + 400px * 5);
  border-top: 1px dotted rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: -1;
  top: 0px;
}
</style>
