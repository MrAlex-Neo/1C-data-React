import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
})

export const fetchAuthMe = createAsyncThunk('admin/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
})


const initialState = {
    data: null,
    status: 'loading'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'loading';
                state.data = null
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = 'error';
                state.data = null
            })

            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
                state.data = null
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = 'error';
                state.data = null
            })
    },
});
export const selectIsAuth = (state) => Boolean(state.data)
// export const selectIsAuth = (state) => Boolean(state.auth.data);


export const { reducer: authReducer } = authSlice;
export const { logout } = authSlice.actions;