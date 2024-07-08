import React from "react";
import "./ExploreTarget.css";
import { target_pest } from "../../assets/assets";

const ExploreTarget = ({ category, setCategory }) => {
  return (
    <div className="explore-target" id="explore-target">
      <h1>Types of pests</h1>
      <p className="explore-target-text">Select the type of pest...</p>
      <div className="explore-target-list">
        {target_pest.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.pest_target ? "All" : item.pest_target
                )
              }
              key={index}
              className="explore-target-list-item"
            >
              <img
                className={category === item.pest_target ? "active" : ""}
                src={item.pest_img}
                alt=""
              />
              <p>{item.pest_target}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreTarget;
