import React from "react";
import TemplateCard from "./TemplateCard";
import "../../scss/template.scss";


const TemplateList = ({ items }) => {
  return (
    <div className="cards">
      {
        items.length > 0 ? items.map((item, index) => (
          <TemplateCard
            key={index}
            name={item.name}
            description={item.description}
            link={item.link}
          />
        ))

        :
        <span className="main-head-text">No templates available</span>

      }
    </div>
  );
};

export default TemplateList;
