import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const GET_DETAILS = "met-gallery/dashboard/GET_DETAILS";

const initialState = {
    loading: false,
    details: null,
};

const fetchDetails = createAsyncThunk(GET_DETAILS, async () => {
    const DETAILS_API = "http://127.0.0.1:5000/dashboard/";
    const response = await fetch(DETAILS_API);
    const data = await response.json();
    return data
});

const detailsSlice = createSlice({
    name: "details",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDetails.fulfilled, (state, action) => ({
            loading: false,
            details: { ...action.payload },
        }));

        builder.addCase(fetchDetails.pending, (state, action) => ({
            loading: true,
            details: { ...action.payload },
        }));

        builder.addCase(fetchDetails.rejected, (state, action) => ({
            loading: false,
            details: null,
        }));
    },
});

export default detailsSlice.reducer;
export { fetchDetails };