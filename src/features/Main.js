import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTemplates,
  getStatus,
  getsortedList,
  getCategoryName,
} from "../app/TemplateSlice";
import Error from "./ErrorFeedback/Error";
import Loaders from "./Loaders/Loaders";
import SearchTemplates from "./Search/SearchTemplates";
import TemplateList from "./Templates/TemplateList";

const Main = () => {
  let mainContent;
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const sortedItems = useSelector(getsortedList);
  const selectedCategory = useSelector(getCategoryName);

  useEffect(() => {
    if (status === "none") {
      dispatch(fetchTemplates());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    mainContent = <Loaders />;
  } else if (status === "succeeded") {
    mainContent = (
      <div>
        <span className="main-head-text"> {selectedCategory} </span>
        <TemplateList items={sortedItems} />
      </div>
    );
  } else if (status === "failed") {
    mainContent = <Error />;
  }

  return (
    <div>
      <SearchTemplates loadingStatus={status} />
      {mainContent}
    </div>
  );
};

export default Main;
