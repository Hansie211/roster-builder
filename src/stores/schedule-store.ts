/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export class Day {
  name: string;
  tracks: { [key: string]: Track };

  constructor(name: string, tracks: { [key: string]: Track } = {}) {
    this.name = name;
    this.tracks = tracks;
  }

  public slotsIntersect = (slotA: Slot, slotB: Slot): boolean => {
    if (slotA.start.isBefore(slotB.start) && slotA.end.isAfter(slotB.end)) return true;

    if (slotA.start.isAfter(slotB.start) && slotA.end.isBefore(slotB.end)) return true;

    if (slotA.start.isBefore(slotB.start) && slotA.end.isAfter(slotB.start)) return true;

    if (slotA.start.isBefore(slotB.end) && slotA.end.isAfter(slotB.start)) return true;

    return false;
  };

  public slotFits = (slot: Slot, track: Track): boolean => {
    return Object.values(track.slots).find((s) => this.slotsIntersect(s, slot)) === undefined;
  };

  public findTrackForSlot = (slot: Slot): Track | undefined => {
    return this.getTracks().find((track) => this.slotFits(slot, track));
  };

  public addTrack(): Track {
    const id = uuidv4();
    const track = new Track(id);
    this.tracks[id] = track;

    return track;
  }

  public findTrackOrCreate = (slot: Slot): Track => {
    return this.findTrackForSlot(slot) || this.addTrack();
  };

  public addSlot = (slot: Slot) => {
    const track = this.findTrackOrCreate(slot);
    track.slots[slot.id] = slot;
  };

  public getTracks(): Track[] {
    return Object.values(this.tracks);
  }
}

export class Track {
  id: string;
  slots: { [key: string]: Slot };

  constructor(id: string, slots: { [key: string]: Slot } = {}) {
    this.id = id;
    this.slots = slots;
  }

  public getSlots(): Slot[] {
    return Object.values(this.slots);
  }
}

export class Slot {
  id: string;
  eventName: string;
  location: string;
  persons: string;
  start: Time;
  end: Time;

  constructor(id: string, eventName: string, location: string, persons: string, start: Time, end: Time) {
    this.id = id;
    this.eventName = eventName;
    this.location = location;
    this.persons = persons;
    this.start = start;
    this.end = end;
  }
}

export class Time {
  minute = 0;
  hour = 0;

  constructor(hour = 0, minute = 0) {
    this.hour = hour ?? 8;
    this.minute = minute ?? 30;
  }

  static parse(str: string): Time {
    const splits = str.split(':');

    if (splits.length !== 2) throw Error('Invalid time format');

    const hour = parseInt(splits[0]);
    const minute = parseInt(splits[1]);

    if (Number.isNaN(hour) || Number.isNaN(minute)) throw Error('Invalid time value');

    if (hour < 0 || hour > 23) throw new Error('Invalid hour value');
    if (minute < 0 || minute > 59) throw new Error('Invalid minute value');

    return new Time(hour, minute);
  }

  public addMinutes = (minutes: number): void => {
    this.hour += Math.floor((this.minute + minutes) / 60);
    this.minute = (this.minute + minutes) % 60;
  };

  public toString = (): string => {
    return `${this.hour}:${this.minute.toString().padStart(2, '0')}`;
  };

  public toKey = (): string => {
    return `${this.hour.toString().padStart(2, '0')}${this.minute.toString().padStart(2, '0')}`;
  };

  public isBefore = (timeB: Time): boolean => {
    return this.hour < timeB.hour || (this.hour === timeB.hour && this.minute < timeB.minute);
  };

  public isAfter = (timeB: Time): boolean => {
    return this.hour > timeB.hour || (this.hour === timeB.hour && this.minute > timeB.minute);
  };

  public equals = (timeB: Time): boolean => {
    return this.hour === timeB.hour && this.minute === timeB.minute;
  };

  public static minutesBetween(timeA: Time, timeB: Time): number {
    if (timeA.equals(timeB)) return 0;
    if (timeA.isAfter(timeB)) return this.minutesBetween(timeB, timeA);

    const hoursBetween = timeB.hour - timeA.hour;
    return hoursBetween * 60 + timeB.minute - timeA.minute;
  }

  public static fromTime(time: Time): Time {
    return new Time(time.hour, time.minute);
  }
}

export const useScheduleStore = defineStore(
  'schedule',
  () => {
    const days: Ref<Day[]> = ref([new Day('Maandag'), new Day('Dinsdag'), new Day('Woensdag'), new Day('Donderdag'), new Day('Vrijdag')]);

    const createSlot = (eventName: string, location: string, persons: string, start: Time, end: Time) => {
      return new Slot(uuidv4(), eventName, location, persons, start, end);
    };

    const getTrack = (dayIndex: number, slot: Slot): Track => {
      const track = days.value[dayIndex].findTrackForSlot(slot);
      if (track !== undefined) return track;

      return days.value[dayIndex].addTrack();
    };

    const addSlot = (dayIndex: number, trackId: string, slot: Slot) => {
      const track = days.value[dayIndex].tracks[trackId];
      track.slots[slot.id] = slot;
    };

    const findTrack = (slot: Slot): Track | undefined => {
      for (let i = 0; i < days.value.length; i++) {
        const track = days.value[i].getTracks().find((t) => t.slots[slot.id] !== undefined);
        if (track !== undefined) return track;
      }
    };

    return { days, createSlot, getTrack, addSlot, findTrack };
  },
  {
    persist: {
      afterRestore: (ctx) => {
        const rawDays: Day[] = ctx.store.days;

        const validDays = rawDays.map((rawDay) => {
          const validTracks: { [key: string]: Track } = {};

          Object.values(rawDay.tracks).forEach((rawTrack) => {
            const validSlots: { [key: string]: Slot } = {};
            Object.values(rawTrack.slots).forEach((rawSlot) => {
              const validSlot = new Slot(rawSlot.id, rawSlot.eventName, rawSlot.location, rawSlot.persons, new Time(rawSlot.start.hour, rawSlot.start.minute), new Time(rawSlot.end.hour, rawSlot.end.minute));
              validSlots[validSlot.id] = validSlot;
            });

            const validTrack = new Track(rawTrack.id, validSlots);
            validTracks[validTrack.id] = validTrack;
          });

          return new Day(rawDay.name, validTracks);
        });

        ctx.store.days = validDays;
      },
    },
  }
);
