import React from "react";
import Loader from "./Loader";
import "../../scss/template.scss";
import "../../scss/loaders.scss";

const Loaders = () => {
  return (
    <div className="cards">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Loader key={i} />
      ))}
    </div>
  );
};

export default Loaders;
