import { configureStore } from "@reduxjs/toolkit";
import TemplateReducer from "./TemplateSlice";

export const store = configureStore({
  reducer: {
    templates: TemplateReducer,
  },
});
