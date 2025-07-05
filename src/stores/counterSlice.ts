import { StateCreator } from 'zustand';

export interface CounterSlice {
    count: number;
    increment: () => void;
}

export const createCounterSlice: StateCreator<CounterSlice, [], [], CounterSlice> = (set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
});

