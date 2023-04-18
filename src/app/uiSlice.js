import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  mode: localStorage.getItem("mode")??"dark",
};

const uiSlice = createSlice({
    name: "movies",
    initialState: initialUiState,
    reducers: {
      changeTheme(state, actions) {
        localStorage.setItem('mode',actions.payload.mode);
        state.mode=actions.payload.mode;
      },
    },
  });
  
  export default uiSlice;