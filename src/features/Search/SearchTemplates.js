import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryName,
  getSearchValue,
  searchCategories,
  selectCategory,
  sortByAlphabetOrder,
  sortByDateOrder,
} from "../../app/TemplateSlice";

import "../../scss/search.scss";

const SearchTemplates = ({ loadingStatus }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(getCategoryName);
  const searchedCategory = useSelector(getSearchValue);

  const searchTemplates = (value) => {
    dispatch(searchCategories(value));
  };

  const selectSpecificCategory = (value) => {
    dispatch(selectCategory(value));
    if (searchedCategory.length > 0) {
      searchTemplates(searchedCategory)
    }
  };

  const sortTemplates = (event, type) => {
    if (event === "default") {
      if (selectedCategory.length > 0) {
        selectSpecificCategory(selectedCategory)
      }
    } else {
      if (type === "order") {
        dispatch(sortByAlphabetOrder(event));
      } else if (type === "date") {
        dispatch(sortByDateOrder(event));
      }
    }
  };
  return (
    <div className="search" id="search" >
      <div className="search-holder">
        <input
          disabled={loadingStatus === "loading"}
          type="search"
          onInput={(e) => searchTemplates(e.target.value)}
          placeholder="Search Templates"
        />

        <div className="sort-section">
          <span className="sort-text">Sort By</span>

          <div className="sort-parent">
            <select
              disabled={loadingStatus === "loading"}
              onChange={(e) => selectSpecificCategory(e.target.value)}
            >
              <option value="all">All</option>
              <option value="education">Education</option>
              <option value="e-commerce">E-commerce</option>
              <option value="health">Health</option>
            </select>
            <label htmlFor="category">Category</label>
          </div>
          <div className="sort-parent">
            <select
              disabled={loadingStatus === "loading"}
              onChange={(e) => sortTemplates(e.target.value, "order")}
            >
              <option value="default">Default</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <label htmlFor="Order">Order</label>
          </div>

          <div className="sort-parent">
            <select
              disabled={loadingStatus === "loading"}
              onChange={(e) => sortTemplates(e.target.value, "date")}
            >
              <option value="default">Default</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <label htmlFor="Date">Date</label>
          </div>
        </div>
      </div>
      <div className="notify">
        {loadingStatus === "succeeded" ? (
          <span>
            Tada! Get started with a free template. Can’t find what you are
            looking for? Search from the 1000+ available templates
          </span>
        ) : (
          <span> Loading templates... hold on </span>
        )}
      </div>
    </div>
  );
};

export default SearchTemplates;
