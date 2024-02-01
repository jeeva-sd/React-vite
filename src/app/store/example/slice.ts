// exampleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleState {
    data: unknown;
    loading: boolean;
    error: string | null;
}

const initialState: ExampleState = {
    data: null,
    loading: false,
    error: null,
};

const exampleSlice = createSlice({
    name: 'example',
    initialState,
    reducers: {
        exampleAction: (state) => {
            state.loading = true;
            state.error = null;
        },
        exampleSuccessAction: (state, action: PayloadAction<unknown>) => {
            state.loading = false;
            state.data = action.payload;
        },
        exampleErrorAction: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { exampleAction, exampleSuccessAction, exampleErrorAction } = exampleSlice.actions;
export default exampleSlice.reducer;
