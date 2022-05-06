import clsx from "clsx";
import React from "react";
import StarIcon from "./StarIcon";

const Rarity = ({ rarity, className = "", width = 11 }) => {
  return (
    <div className={clsx("flex", className)} style={{ marginLeft: ".2rem" }}>
      {[...new Array(rarity > 5 ? 5 : rarity)].map((_, index) => (
        <div key={index} className="-ml-1">
          <StarIcon width={width} />
        </div>
      ))}
    </div>
  );
};

export default Rarity;
