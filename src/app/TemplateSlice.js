import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

export const fetchTemplates = createAsyncThunk(
  "templates/getTemplates",
  async () => {
    let url =
      "https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates";
    const response = await axios.get(`${url}`);
    if (response.data.Error) {
      return response.data.Error;
    }
    return response.data;
  }
);

export const TemplateSlice = createSlice({
  name: "templates",
  initialState: {
    templateList: [],
    sortedList: [],
    selectedCategory: "all",
    searchValue: "",
    status: "none",
    sorted: false,
    sortAlphabetically: "default",
    sortByDate: "default",
    error: null,
  },
  reducers: {
    storeUsers: (state, { payload }) => {
      state.templateList.push(payload);
      state.sortedList = state.templateList;
    },
    clearFilters: (state) => {
      state.sorted = false;
    },
    sortByAlphabetOrder: (state, { payload }) => {
      console.log(payload);
      state.sortAlphabetically = payload;
      state.sortedList = _.orderBy(
        state.sortedList,
        [(template) => template.name.toLowerCase()],
        payload
      );
    },
    sortByDateOrder: (state, { payload }) => {
      console.log(payload);
      state.sortByDate = payload;
      state.sortedList = _.orderBy(
        state.sortedList,
        [(template) => template.created],
        payload
      );
    },
    searchCategories: (state, { payload }) => {
      state.searchValue = payload;
      if (state.searchValue.length === 0) {
        state.sortedList = state.templateList;
      } else {
        state.sortedList = _.filter(state.templateList, (template) =>
          template.name.toLowerCase().includes(state.searchValue.toLowerCase())
        );
      }
    },
    selectCategory: (state, { payload }) => {
      state.selectedCategory = payload;
      if (state.selectedCategory.toLowerCase() === "all") {
        state.sortedList = state.templateList;
      } else {
        state.sortedList = _.filter(
          state.templateList,
          (template) =>
            template.category[0].toLowerCase() ===
            state.selectedCategory.toLowerCase()
        );
      }
    },
  },
  extraReducers: {
    [fetchTemplates.pending]: (state) => {
      state.status = "loading";
    },
    [fetchTemplates.fulfilled]: (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.status = "succeeded";
        state.templateList = payload.slice(0, 999);
        state.sortedList = state.templateList;
      } else {
        state.status = "failed";
        state.error = payload;
      }
    },
    [fetchTemplates.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error.message;
    },
  },
});

export const {
  setFilterBy,
  sortByAlphabetOrder,
  sortByDateOrder,
  searchCategories,
  selectCategory,
  clearFilters,
} = TemplateSlice.actions;

export const getError = (state) => state.templates.error;
export const getStatus = (state) => state.templates.status;
export const getTemplates = (state) => state.templates.templateList;
export const getsortedList = (state) => state.templates.sortedList;
export const getCategoryName = (state) => state.templates.selectedCategory;
export const getSearchValue = (state) => state.templates.searchValue;
export default TemplateSlice.reducer;
