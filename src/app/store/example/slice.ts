import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleState {
    data: unknown;
    loading: boolean;
    error: string | null;
    number: number;
}

const initialState: ExampleState = {
    data: null,
    loading: false,
    error: null,
    number: 0
};

const exampleSlice = createSlice({
    name: 'example',
    initialState,
    reducers: {
        exampleAction: (state, _action: PayloadAction<number>) => {
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
        updateNumber: (state, action: PayloadAction<number>) => {
            state.number = action.payload;
        },
    },
});

export const examplePersistConfig = {
    key: 'example',
    storage,
    keyPrefix: '',
    whitelist: ['number'],
};

export const { exampleAction, exampleSuccessAction, exampleErrorAction, updateNumber } = exampleSlice.actions;
export default persistReducer(examplePersistConfig, exampleSlice.reducer);
