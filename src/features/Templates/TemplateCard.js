import React from "react";

const TemplateCard = ({ name, description, link }) => {
  return (
    <div className="card">
      <div className="body">
        <h5 className="head-text"> {name} </h5>
        <h6 className="body-text"> {description} </h6>
      </div>
      <div className="footer">
        <span className="foot-text">{link}</span>
      </div>
    </div>
  );
};

export default TemplateCard;
