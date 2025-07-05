import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { createCounterSlice, CounterSlice } from './counterSlice';

// Combined store type
export type Store = CounterSlice;

// Create the main store combining all slices
export const useStore = create<Store>()(
    devtools(
        persist(
            (...a) => ({
                ...createCounterSlice(...a),
            }),
            {
                name: 'app-store',
                partialize: (state) => ({
                    // Only persist certain values
                    count: state.count,
                }),
            }
        ),
        {
            name: 'combined-store',
        }
    )
);
