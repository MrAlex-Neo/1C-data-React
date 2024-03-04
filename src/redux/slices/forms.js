import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchForms = createAsyncThunk('collect/fetchForms', async () => {
    const { data } = await axios.get('collect');
    return data;
})
export const fetchForm = createAsyncThunk('collect/fetchForm', async (id) => {
    const { data } = await axios.get(`collect/${id}`);
    return data;
})

export const fetchCreateForm = createAsyncThunk('collect/fetchFormCreate', async (params) => {
    const { data } = await axios.post('collect', params);
    return data;
})
export const fetchRemoveForm = createAsyncThunk('collect/delete', async (id) =>
    axios.delete(`/collect/${id}`)
)


const initialState = {
    forms: {
        items: [],
        status: 'loading',
    },
    form: {
        item: [],
        status: 'loading',
    },
    createform: {
        item: [],
        status: 'loading',
    },
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Получение всех коллекций
            .addCase(fetchForms.pending, (state) => {
                state.forms.items = [];
                state.forms.status = 'loading';
            })
            .addCase(fetchForms.fulfilled, (state, action) => {
                state.forms.items = action.payload;
                state.forms.status = 'loaded';
            })
            .addCase(fetchForms.rejected, (state) => {
                state.forms.items = [];
                state.forms.status = 'error';
            })
            //Получение одной коллекции
            .addCase(fetchForm.pending, (state) => {
                state.form.item = [];
                state.form.status = 'loading';
            })
            .addCase(fetchForm.fulfilled, (state, action) => {
                state.form.item = action.payload;
                state.form.status = 'loaded';
            })
            .addCase(fetchForm.rejected, (state) => {
                state.form.item = [];
                state.form.status = 'error';
            })
            //Создание коллекции
            .addCase(fetchCreateForm.pending, (state) => {
                state.createform.item = [];
                state.createform.status = 'loading';
            })
            .addCase(fetchCreateForm.fulfilled, (state, action) => {
                state.createform.item = action.payload;
                state.createform.status = 'loaded';
            })
            .addCase(fetchCreateForm.rejected, (state) => {
                state.createform.item = [];
                state.createform.status = 'error';
            })
            // //Удаление коллекции
            .addCase(fetchRemoveForm.pending, (state, action) => {
                state.forms.items = state.forms.items.filter(obj => obj._id !== action.meta.arg)
            })
    },
});

export const { reducer: productsReducer } = productsSlice; // Export the postsReducer
