import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Place {
  id: number;
  name: string;
}

interface MapState {
  places: Place[];
  isLoading: boolean;
  error: string | null;
  isSearchWhenMapMoving: boolean;
}

interface RootState {
  map: MapState;
}

export const fetchPlaces = createAsyncThunk<
  Place[],
  void,
  { state: RootState }
>("map/fetchPlaces", async (_, { getState, rejectWithValue }) => {
  const { places } = getState().map;

  if (places.length > 0) {
    return places;
  }

  try {
    const response = await fetch("/api/places", { method: "GET" });
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const mapSlice = createSlice({
  name: "map",
  initialState: {
    places: [],
    visiblePlaces: [],
    isLoading: false,
    isSidebarOpen: true,
    isSearchWhenMapMoving: true,
    error: null,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setIsSidebarOpen: (state, action: PayloadAction<any>) => {
      state.isSidebarOpen = action.payload;
    },
    toggleSearchWhenMapMoving: (state) => {
      state.isSearchWhenMapMoving = !state.isSearchWhenMapMoving;
    },
    setVisiblePlaces: (state, action: PayloadAction<any[]>) => {
      state.visiblePlaces = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        const placesData = action.payload;

        state.isLoading = false;
        state.places = placesData;
        state.visiblePlaces = placesData;
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setIsLoading,
  toggleSidebar,
  setIsSidebarOpen,
  toggleSearchWhenMapMoving,
  setVisiblePlaces,
} = mapSlice.actions;
export default mapSlice.reducer;
