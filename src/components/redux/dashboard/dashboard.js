import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const GET_DETAILS = "met-gallery/dashboard/GET_DETAILS";

const initialState = {
  loading: false,
  details: null,
};

const fetchDetails = createAsyncThunk(GET_DETAILS, async () => {
  const session = JSON.parse(localStorage.getItem("session"));
  const token = session?.accessToken;
  const DETAILS_API = "https://the-met-gallery-backend.onrender.com/dashboard";
  const response = await fetch(DETAILS_API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
});

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchDetails.rejected, (state) => {
        state.loading = false;
        state.details = null;
      });
  },
});

export default detailsSlice.reducer;
export { fetchDetails };
