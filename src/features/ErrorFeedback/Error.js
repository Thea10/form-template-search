import React from "react";
import { useDispatch } from "react-redux";
import { fetchTemplates } from "../../app/TemplateSlice";
import "../../scss/search.scss";

const Error = () => {
  const dispatch = useDispatch();
  const tryAgain = () => {
    dispatch(fetchTemplates());
  };
  return (
    <div className="search">
      <div className="notify">
        <span>
          Yikes!.. could not load templates..{" "}
          <button onClick={tryAgain}> try again? </button>
        </span>
      </div>
    </div>
  );
};

export default Error;
