import React from "react";
import { APP_URL } from "utils/template";

const StarIcon = ({ width }) => {
  return (
    <img
      style={{ width, height: width }}
      src={APP_URL + "/resources/ui/rarity-icon.png"}
    />
  );
};

export default StarIcon;
