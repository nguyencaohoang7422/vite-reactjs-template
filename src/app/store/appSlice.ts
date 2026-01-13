import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


const initialState : {
  path: string | null;
} = {
    path : null
};

const authSlice = createSlice({
name: 'app',
  initialState,
  reducers: {
    navigate: (state, action : PayloadAction<string> )=>{
        state.path = action.payload
    },
    clearPath: (state) =>{
      state.path = null;
    }
  },
});

export const { navigate, clearPath } = authSlice.actions;
export default authSlice.reducer;