import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InputState {
  userInput: string;
  messages: any;
}

const initialState: InputState = {
  userInput: "",
  messages: [],
};

const searchSlice = createSlice({
  name: "search-input",
  initialState,
  reducers: {
    updateSearchValue(state, action: PayloadAction<string>) {
      //action: PayloadAction<string> --- to tell typescript what the payload is (here it's a "string")
      return { ...state, userInput: action.payload };
    },
    clearSearchValue(state) {
      return { ...state, search: "" };
    },
    updateMessages(state, action: PayloadAction<string>) {
      return { ...state, messages: [...state.messages, action.payload] };
    },
  },
});

export const { updateSearchValue, updateMessages, clearSearchValue } =
  searchSlice.actions;
export default searchSlice.reducer;
